'use client'

import { useRef, useEffect } from 'react'
import { useGSAP, gsap } from '@/lib/gsap-config'
import { usePageTransition } from './PageTransitionProvider'
import { usePathname, useRouter } from 'next/navigation'

// Navigation order map - defines the conceptual order of main navigation links
const NAV_ORDER = [
  '/spirits',
  '/about', // Note: '/story' redirects to '/about'
  '/cocktail-recipes',
  '/events',
  '/testimonials',
  '/find-us',
]

// Helper function to get route index (handles aliases and home page)
function getRouteIndex(path: string): number | null {
  // Handle home page
  if (path === '/') return -1
  
  // Handle '/story' alias
  if (path === '/story') return NAV_ORDER.indexOf('/about')
  
  const index = NAV_ORDER.indexOf(path)
  return index >= 0 ? index : null
}

export function PageTransition() {
  const coverRef = useRef<HTMLDivElement>(null)
  const { isTransitioning, startTransition, completeTransition } = usePageTransition()
  const pathname = usePathname()
  const router = useRouter()
  const previousPathnameRef = useRef<string>(pathname)
  const currentRouteIndexRef = useRef<number | null>(getRouteIndex(pathname))
  const transitionDirectionRef = useRef<number>(1) // 1 = backward (left to right), -1 = forward (right to left)
  const isInitialMount = useRef(true)
  const pendingNavigationRef = useRef<string | null>(null)

  // Initialize route index on mount
  useEffect(() => {
    currentRouteIndexRef.current = getRouteIndex(pathname)
  }, [])

  useGSAP(() => {
    if (!coverRef.current) return

    // Set initial state: off-screen to the left
    gsap.set(coverRef.current, {
      xPercent: -100,
      pointerEvents: 'none',
    })
  }, [])

  // Handle animation based on transition state and direction
  useEffect(() => {
    if (!coverRef.current || isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const direction = transitionDirectionRef.current

    if (isTransitioning) {
      // Slide IN: cover slides in based on direction
      // Forward (dir = -1): from right (100%) to center (0%)
      // Backward (dir = 1): from left (-100%) to center (0%)
      gsap.fromTo(
        coverRef.current,
        {
          xPercent: direction * 100, // Start position based on direction
          pointerEvents: 'none',
        },
        {
          xPercent: 0, // Center position
          duration: 0.6,
          ease: 'power2.inOut',
          pointerEvents: 'auto',
        }
      )
    } else {
      // Slide OUT: cover slides out based on direction
      // Forward (dir = -1): from center (0%) to left (-100%)
      // Backward (dir = 1): from center (0%) to right (100%)
      gsap.to(coverRef.current, {
        xPercent: direction * -100, // End position based on direction
        duration: 0.6,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      })
    }
  }, [isTransitioning])

  // Detect pathname changes to complete transition (routeChangeComplete equivalent)
  useEffect(() => {
    if (pathname !== previousPathnameRef.current) {
      // Update current route index whenever pathname changes
      const newIndex = getRouteIndex(pathname)
      currentRouteIndexRef.current = newIndex

      // Pathname has changed - this is our "routeChangeComplete" event
      if (isTransitioning) {
        // Wait a bit for page to render, then slide out
        const timer = setTimeout(() => {
          completeTransition()
          pendingNavigationRef.current = null
        }, 100)
        previousPathnameRef.current = pathname
        return () => clearTimeout(timer)
      }
      previousPathnameRef.current = pathname
    }
  }, [pathname, isTransitioning, completeTransition])

  // Global link click interception (routeChangeStart equivalent)
  useEffect(() => {
    const handleLinkClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Find the closest anchor tag (Next.js Link renders as <a>)
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null
      
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Skip external links, hash links, and links marked to skip transition
      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        anchor.hasAttribute('data-no-transition') ||
        anchor.getAttribute('target') === '_blank'
      ) {
        return
      }

      // Check if it's an internal Next.js link
      const isInternalLink = href.startsWith('/')
      if (!isInternalLink) return

      // Check if it's a different route
      const currentPath = pathname
      const targetPath = href
      
      if (currentPath === targetPath) {
        return // Same page, no transition needed
      }

      // Prevent default to intercept navigation
      e.preventDefault()
      e.stopPropagation()

      // Determine transition direction based on navigation order
      const currentIndex = currentRouteIndexRef.current
      const nextIndex = getRouteIndex(targetPath)

      // Calculate direction:
      // - If nextIndex > currentIndex: Forward navigation (dir = -1, cover comes from right, goes to left)
      // - If nextIndex < currentIndex: Backward navigation (dir = 1, cover comes from left, goes to right)
      // - If either is null (not in NAV_ORDER): default to backward (dir = 1)
      let direction = 1 // Default: backward (left to right)
      
      if (currentIndex !== null && nextIndex !== null) {
        if (nextIndex > currentIndex) {
          direction = -1 // Forward: right to left
        } else if (nextIndex < currentIndex) {
          direction = 1 // Backward: left to right
        }
        // If equal, keep default direction
      } else if (currentIndex === null && nextIndex !== null) {
        // Coming from home or unknown route to known route: treat as forward
        direction = -1
      } else if (currentIndex !== null && nextIndex === null) {
        // Going from known route to home or unknown route: treat as backward
        direction = 1
      }

      // Store direction for animation
      transitionDirectionRef.current = direction

      // Store pending navigation
      pendingNavigationRef.current = targetPath

      // Start transition animation (routeChangeStart equivalent)
      await startTransition()

      // Navigate to new page using Next.js router
      router.push(targetPath)
    }

    // Use capture phase to intercept before Next.js Link handler
    document.addEventListener('click', handleLinkClick, true)

    return () => {
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [pathname, router, startTransition])

  return (
    <div
      ref={coverRef}
      className="fixed inset-0 bg-tikaram-deep-forest z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  )
}

