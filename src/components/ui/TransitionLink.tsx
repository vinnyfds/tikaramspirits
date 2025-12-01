'use client'

import { useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import { usePageTransition } from '@/components/layout/PageTransitionProvider'
import { ReactNode, MouseEvent } from 'react'

interface TransitionLinkProps extends LinkProps {
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  [key: string]: unknown
}

// Helper function to convert UrlObject to string for router.push()
function hrefToString(href: LinkProps['href']): string {
  if (typeof href === 'string') {
    return href
  }
  
  // Handle UrlObject
  if (href && typeof href === 'object') {
    const { pathname, query } = href
    if (!pathname) {
      return '/'
    }
    
    if (query) {
      const searchParams = new URLSearchParams(
        Object.entries(query).map(([k, v]) => [k, String(v)])
      ).toString()
      return searchParams ? `${pathname}?${searchParams}` : pathname
    }
    
    return pathname
  }
  
  return '/'
}

export function TransitionLink({
  href,
  children,
  onClick,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()
  const { startTransition, completeTransition } = usePageTransition()

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    onClick?.(e)

    // Prevent default navigation
    e.preventDefault()

    // Start transition animation (slide in)
    await startTransition()

    // Navigate to new page
    // The provider will detect pathname change and trigger slide out
    // Convert href to string (router.push only accepts string in App Router)
    const stringHref = hrefToString(href)
    router.push(stringHref)
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  )
}

