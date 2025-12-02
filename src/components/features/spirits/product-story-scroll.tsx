'use client'

import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { Button } from '@/components/ui/Button'
import { StarRating } from '@/components/ui/StarRating'
import { CocktailCarousel } from '@/components/ui/CocktailCarousel'
import { ReviewSubmissionModal } from './ReviewSubmissionModal'
import { AuthModal } from '@/components/features/auth/AuthModal'
import { SensoryChart } from './SensoryChart'
import { StoreLocatorModal } from '@/components/features/store-locator/StoreLocatorModal'
import { SocialShareBar } from '@/components/ui/SocialShareBar'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Review } from '@/lib/reviews'
import { MapPin, Sparkles, UtensilsCrossed, Clock } from 'lucide-react'

type ProductStoryScrollProps = {
  product: {
    slug: string
    headline: string
    subhead: string
    description: string
    price: string
    image: string
    imagePng?: string
    tastingNotes: {
      nose: string
      palate?: string
      finish?: string
      sweet?: number
      oak?: number
      spice?: number
      fruit?: number
    }
    process?: string
    ingredients?: string
  }
  cocktails?: Array<{
    name: string
    slug: string
    image: string
  }>
  reviews?: Review[]
}

export default function ProductStoryScroll({
  product,
  cocktails = [],
  reviews = [],
}: ProductStoryScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)
  const bottleRef = useRef<HTMLDivElement | null>(null)
  const gridContainerRef = useRef<HTMLDivElement | null>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const router = useRouter()

  // Check user auth status
  useEffect(() => {
    const supabase = createClient()
    
    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Debug logging
  useEffect(() => {
    console.log('[ProductStoryScroll] Reviews prop received:', reviews)
    console.log('[ProductStoryScroll] Reviews type:', typeof reviews)
    console.log('[ProductStoryScroll] Is array:', Array.isArray(reviews))
    console.log('[ProductStoryScroll] Reviews count:', reviews?.length || 0)
    if (reviews && reviews.length > 0) {
      console.log('[ProductStoryScroll] First review sample:', reviews[0])
      console.log('[ProductStoryScroll] Review keys:', Object.keys(reviews[0]))
      console.log('[ProductStoryScroll] Review has author_name:', 'author_name' in reviews[0])
      console.log('[ProductStoryScroll] Review has review_text:', 'review_text' in reviews[0])
      console.log('[ProductStoryScroll] Review has rating:', 'rating' in reviews[0])
    }
  }, [reviews])

  // Ensure reviews is an array (safety check)
  const safeReviews = Array.isArray(reviews) ? reviews : []

  // Calculate average rating
  const averageRating = safeReviews.length > 0
    ? safeReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / safeReviews.length
    : 0

  // Get latest 4 reviews (already sorted by created_at descending from API)
  const latestReviews = safeReviews.slice(0, 4)
  
  console.log('[ProductStoryScroll] Safe reviews count:', safeReviews.length)
  console.log('[ProductStoryScroll] Average rating:', averageRating)
  console.log('[ProductStoryScroll] Latest reviews count:', latestReviews.length)

  // CRITICAL: Ensure first card is interactive immediately on mount
  // This runs synchronously during render, before GSAP useLayoutEffect
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready, but run ASAP
    const enableInteractivity = () => {
      const firstCard = document.querySelector('[data-card="overview"]') as HTMLElement
      if (firstCard) {
        // Set card to be interactive
        firstCard.style.pointerEvents = 'auto'
        firstCard.style.opacity = '1'
        firstCard.style.visibility = 'visible'
        firstCard.style.zIndex = '10'
        
        // Force enable all interactive elements with explicit styles
        const interactiveElements = firstCard.querySelectorAll('button, a, [role="button"], [href]')
        interactiveElements.forEach((el) => {
          const htmlEl = el as HTMLElement
          htmlEl.style.pointerEvents = 'auto'
          htmlEl.style.cursor = 'pointer'
          htmlEl.style.position = 'relative'
          htmlEl.style.zIndex = '20'
        })

        // Also ensure pin-spacer divs don't block interaction
        const pinSpacers = document.querySelectorAll('.pin-spacer')
        pinSpacers.forEach((spacer) => {
          ;(spacer as HTMLElement).style.pointerEvents = 'none'
        })
      }
    }

    // Run immediately and also after delays to catch any late DOM updates
    requestAnimationFrame(enableInteractivity)
    const timer = setTimeout(enableInteractivity, 100)
    const timer2 = setTimeout(enableInteractivity, 500)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  // Handle submit review button click
  const handleSubmitReviewClick = () => {
    if (user) {
      setIsReviewModalOpen(true)
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const storyCards = [
    {
      id: 'overview',
      eyebrow: 'Featured Spirit',
      title: product.headline,
      body: product.description,
      price: product.price,
      subhead: product.subhead,
      ctas: true,
    },
    {
      id: 'sensory',
      eyebrow: 'The Sensory Profile',
      title: 'See it. Smell it. Taste it.',
      type: 'sensory',
    },
    {
      id: 'process',
      eyebrow: 'Crafted in Florida',
      title: 'Process & Ingredients',
      type: 'process',
    },
    {
      id: 'serve-it-up',
      eyebrow: 'Serve It Up',
      title: 'Discover your next favorite pour.',
      type: 'cocktails',
    },
    {
      id: 'reviews',
      eyebrow: 'Customer Reviews',
      title: 'What people are saying.',
      type: 'reviews',
    },
  ]

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    // Only run GSAP animations on desktop (>= 1024px)
    // On mobile, cards will be displayed in normal document flow
    const isDesktop = window.innerWidth >= 1024

    if (!isDesktop) {
      // On mobile: Ensure all cards are visible and interactive
      const cards = document.querySelectorAll('[data-card]') as NodeListOf<HTMLElement>
      cards.forEach((card) => {
        card.style.pointerEvents = 'auto'
        card.style.opacity = '1'
        card.style.visibility = 'visible'
        card.style.position = 'relative'
        card.style.transform = 'none'
        card.style.left = 'auto'
        card.style.top = 'auto'
        // Ensure all interactive elements inside are also enabled
        const interactiveElements = card.querySelectorAll('button, a, [role="button"]')
        interactiveElements.forEach((el) => {
          ;(el as HTMLElement).style.pointerEvents = 'auto'
        })
      })
      // Show sensory notes on mobile
      const sensoryNotes = document.querySelectorAll('[data-sensory-note]') as NodeListOf<HTMLElement>
      sensoryNotes.forEach((note) => {
        note.style.opacity = '1'
        note.style.visibility = 'visible'
        note.style.transform = 'none'
      })
      return
    }

    // Desktop: GSAP parallax animations
    // CRITICAL: Ensure first card and its buttons are ALWAYS interactive
    // Set this immediately, before any GSAP initialization
    const firstCard = document.querySelector('[data-card="overview"]') as HTMLElement
    if (firstCard) {
      firstCard.style.pointerEvents = 'auto'
      firstCard.style.opacity = '1'
      firstCard.style.visibility = 'visible'
      // Ensure all interactive elements inside are also enabled
      const interactiveElements = firstCard.querySelectorAll('button, a, [role="button"]')
      interactiveElements.forEach((el) => {
        ;(el as HTMLElement).style.pointerEvents = 'auto'
      })
    }

    if (!sectionRef.current || !gridContainerRef.current) return

    let tl: gsap.core.Timeline | null = null

    const ctx = gsap.context(() => {
      // Only target cards within the desktop grid container
      const desktopContainer = gridContainerRef.current
      if (!desktopContainer) return
      const cards = gsap.utils.toArray<HTMLElement>(desktopContainer.querySelectorAll('[data-card]'))
      if (!cards.length) return

      const total = cards.length

      // Calculate card heights and cumulative positions for vertical stacking
      // Use a reasonable estimate for card height (cards are typically 500-700px tall)
      const estimatedCardHeight = 650
      const cardSpacing = 32
      
      // Calculate total height needed for all cards stacked
      const totalStackHeight = estimatedCardHeight * cards.length + cardSpacing * (cards.length - 1)

      // CRITICAL: Set first card to be visible and interactive FIRST, before setting others
      // Position first card at top (y: 0)
      if (cards[0]) {
        gsap.set(cards[0], { autoAlpha: 1, y: 0, pointerEvents: 'auto', immediateRender: true })
        // Explicit DOM fallback - set directly on element to ensure it's interactive
        cards[0].style.pointerEvents = 'auto'
        cards[0].style.opacity = '1'
        cards[0].style.visibility = 'visible'
        // Force enable all buttons and links inside the first card
        const buttons = cards[0].querySelectorAll('button, a, [role="button"]')
        buttons.forEach((btn) => {
          ;(btn as HTMLElement).style.pointerEvents = 'auto'
        })
      }

      // Position other cards below the first one, stacked vertically
      if (cards.length > 1) {
        cards.slice(1).forEach((card, index) => {
          // Position each card below the previous ones
          const yOffset = estimatedCardHeight * (index + 1) + cardSpacing * (index + 1)
          gsap.set(card, { autoAlpha: 0, y: yOffset, pointerEvents: 'none', immediateRender: true })
        })
      }

      // Initial state for sensory notes (hidden and offset) - only in desktop container
      const sensoryNotes = desktopContainer.querySelectorAll('[data-sensory-note]')
      gsap.set(sensoryNotes, { autoAlpha: 0, x: -5 })

      // Create master timeline with ScrollTrigger
      // Calculate end based on total stacked height
      const scrollDistance = totalStackHeight * 0.8 // Adjust multiplier for scroll speed
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          pinType: 'fixed', // Use fixed pinning to avoid pointer-events issues
          onEnter: () => {
            // Ensure first card is interactive when ScrollTrigger activates
            const firstCard = cards[0]
            if (firstCard) {
              firstCard.style.pointerEvents = 'auto'
              const buttons = firstCard.querySelectorAll('button, a, [role="button"]')
              buttons.forEach((btn) => {
                ;(btn as HTMLElement).style.pointerEvents = 'auto'
              })
            }
          },
        },
      })

      // Store reference for cleanup
      tl = masterTimeline

      // Sequential cross-fade transitions with vertical scroll parallax
      cards.forEach((card, index) => {
        if (index === 0) return

        const prev = cards[index - 1]
        const position = index - 1 // Position 0, 1, 2, 3 for transitions
        
        // Calculate target positions: each card moves to top (y: 0) as it becomes active
        const prevInitialY = gsap.getProperty(prev, 'y') as number
        const cardInitialY = gsap.getProperty(card, 'y') as number

        // Simultaneous fade out previous (move up and fade) and fade in current (move to top)
        masterTimeline.to(
          prev,
          {
            autoAlpha: 0,
            pointerEvents: 'none',
            y: prevInitialY - 40, // Move up as it disappears
            duration: 1,
          },
          position === 0 ? 0 : `+=1` // First at 0, then +=1 for each subsequent
        ).fromTo(
          card,
          {
            autoAlpha: 0,
            y: cardInitialY, // Start from stacked position below
            pointerEvents: 'none',
          },
          {
            autoAlpha: 1,
            y: 0, // Move to top position
            pointerEvents: 'auto',
            duration: 1,
            ease: 'power2.out', // Smooth parallax movement
          },
          `<` // Start at the same time as previous fade out
        )

        // Add staggered reveal for sensory notes when sensory card (index 1) becomes active
        if (index === 1) {
          // Sensory card becomes active at position 0
          const sensoryNotes = desktopContainer.querySelectorAll('[data-sensory-note]')
          masterTimeline.fromTo(
            sensoryNotes,
            {
              autoAlpha: 0,
              x: -5,
            },
            {
              autoAlpha: 1,
              x: 0,
              stagger: 0.15,
              ease: 'power1.out',
              duration: 0.6,
            },
            '<0.2' // Start slightly after the main card cross-fade begins
          )
        }
      })

      // Phase 1.3: Bottle animation - integrated into main timeline
      // Scale and rotate bottle when scrolling past overview card, reset after process card
      if (bottleRef.current) {
        // Start animation after first card transition (at position 1)
        masterTimeline.to(
          bottleRef.current,
          {
            scale: 1.1,
            rotation: 5,
            duration: 1,
            ease: 'power2.out',
          },
          1 // Start after first transition
        ).to(
          bottleRef.current,
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'power2.in',
          },
          3 // Reset after process card (around position 3)
        )
      }
    }, sectionRef)

    return () => {
      // CRITICAL: Explicit cleanup - kill timeline and all ScrollTriggers
      if (tl) {
        tl.kill()
      }
      // Kill all ScrollTriggers associated with this section
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) {
          st.kill()
        }
      })
      // Revert GSAP context (cleans up any remaining animations)
      ctx.revert()
    }
  }, [])

  const bottleImageSrc = product.imagePng || product.image

  // Helper function to render card content
  const renderCardContent = (card: typeof storyCards[0]): JSX.Element => {
    return (
      <>
        {/* Overview Card */}
        {card.id === 'overview' && (
          <>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-tikaram-charcoal/60 mb-2">
              {card.eyebrow}
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-tikaram-charcoal mb-2">
              {card.title}
            </h1>
            <p className="font-sans text-sm text-tikaram-charcoal/70 uppercase tracking-widest mb-4">
              {card.subhead}
            </p>
            <p className="font-sans text-base lg:text-lg text-tikaram-charcoal/80 leading-relaxed mb-4">
              {card.body}
            </p>
            <div className="flex items-baseline gap-4 mb-0">
              <span className="font-serif text-3xl lg:text-4xl font-semibold text-tikaram-gold">
                {card.price}
              </span>
            </div>
            {/* CTA Buttons */}
            <div className="mt-16 flex flex-col gap-4">
              <Link 
                href="/find-us" 
                className="inline-block w-full sm:w-auto"
                style={{ pointerEvents: 'auto' }}
              >
                <Button 
                  variant="primary" 
                  className="w-full sm:w-auto"
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  BUY NOW
                </Button>
              </Link>
              {card.ctas && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsStoreLocatorOpen(true)}
                    className="bg-[#D4AF37] text-white px-8 py-3 uppercase tracking-widest hover:bg-[#b5952f] transition-colors font-sans text-xs md:text-sm font-semibold rounded flex items-center gap-2 w-full justify-center"
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    <MapPin className="w-5 h-5" />
                    FIND IN STORE
                  </button>
                  <Button 
                    variant="primary" 
                    className="w-full sm:w-auto"
                    style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    Add to Cart
                  </Button>
                </div>
              )}
            </div>
            {/* Social Share Bar */}
            <div className="mt-6">
              <SocialShareBar
                url={`https://tikaramspirits.com/spirits/${product.slug}`}
                title={product.headline}
              />
            </div>
          </>
        )}

        {/* Sensory Card */}
        {card.type === 'sensory' && (
          <>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-tikaram-charcoal/60 mb-2">
              {card.eyebrow}
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl text-tikaram-charcoal mb-4">
              {card.title}
            </h2>
            <p className="font-sans text-sm text-tikaram-charcoal/80 mb-4">
              Deep, complex, and respectfully smooth. Explore how nose, palate, and finish
              come together.
            </p>
            {/* Notes and Chart Side-by-Side Layout */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
              {/* Tasting Notes - Left Side */}
              <div className="flex flex-col gap-4 flex-1">
                {product.tastingNotes.nose && (
                  <div data-sensory-note="nose" className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-tikaram-gold mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-tikaram-charcoal mb-1">
                        Nose
                      </h3>
                      <p className="font-sans text-sm text-tikaram-charcoal/80 leading-relaxed">
                        {product.tastingNotes.nose}
                      </p>
                    </div>
                  </div>
                )}
                {product.tastingNotes.palate && (
                  <div data-sensory-note="palate" className="flex items-start gap-3">
                    <UtensilsCrossed className="w-5 h-5 text-tikaram-gold mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-tikaram-charcoal mb-1">
                        Palate
                      </h3>
                      <p className="font-sans text-sm text-tikaram-charcoal/80 leading-relaxed">
                        {product.tastingNotes.palate}
                      </p>
                    </div>
                  </div>
                )}
                {product.tastingNotes.finish && (
                  <div data-sensory-note="finish" className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-tikaram-gold mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-semibold text-tikaram-charcoal mb-1">
                        Finish
                      </h3>
                      <p className="font-sans text-sm text-tikaram-charcoal/80 leading-relaxed">
                        {product.tastingNotes.finish}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* Sensory Chart - Right Side */}
              {(product.tastingNotes.sweet !== undefined ||
                product.tastingNotes.oak !== undefined ||
                product.tastingNotes.spice !== undefined ||
                product.tastingNotes.fruit !== undefined) && (
                <div className="flex-shrink-0 overflow-hidden lg:w-auto w-full flex justify-center lg:justify-end">
                  <SensoryChart
                    data={[
                      {
                        category: 'Sweet',
                        intensity: (product.tastingNotes.sweet || 0) / 2,
                      },
                      {
                        category: 'Oak',
                        intensity: (product.tastingNotes.oak || 0) / 2,
                      },
                      {
                        category: 'Spice',
                        intensity: (product.tastingNotes.spice || 0) / 2,
                      },
                      {
                        category: 'Fruit',
                        intensity: (product.tastingNotes.fruit || 0) / 2,
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Process Card */}
        {card.type === 'process' && (
          <>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-tikaram-charcoal/60 mb-2">
              {card.eyebrow}
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl text-tikaram-charcoal mb-4">
              {card.title}
            </h2>
            {product.process && (
              <div className="mb-6">
                <h3 className="font-serif text-lg font-semibold text-tikaram-charcoal mb-2">
                  Process
                </h3>
                <p className="font-sans text-base text-tikaram-charcoal/80 leading-relaxed">
                  {product.process}
                </p>
              </div>
            )}
            {product.ingredients && (
              <div>
                <h3 className="font-serif text-lg font-semibold text-tikaram-charcoal mb-2">
                  Ingredients
                </h3>
                <p className="font-sans text-base text-tikaram-charcoal/80 leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            )}
          </>
        )}

        {/* Serve It Up Card */}
        {card.type === 'cocktails' && (
          <>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-tikaram-charcoal/60 mb-1">
              {card.eyebrow}
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl text-tikaram-charcoal mb-2">
              {card.title}
            </h2>
            {/* Cocktail Carousel */}
            {cocktails.length > 0 && (
              <div className="[&>div]:!mb-2">
                <CocktailCarousel cocktails={cocktails.slice(0, 5)} />
              </div>
            )}
            <p className="font-sans text-sm text-tikaram-charcoal/80 leading-relaxed mb-3">
              From timeless classics to modern riffs, pair this spirit with cocktails that
              showcase its character.
            </p>
            <Link href="/cocktail-recipes">
              <Button variant="primary" className="w-full sm:w-auto">
                View All Recipes
              </Button>
            </Link>
          </>
        )}

        {/* Reviews Card */}
        {card.type === 'reviews' && (
          <>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-tikaram-charcoal/60 mb-2">
              {card.eyebrow}
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl text-tikaram-charcoal mb-4">
              {card.title}
            </h2>
            
            {/* Average Rating */}
            {safeReviews.length > 0 && (
              <div className="mb-6 pb-6 border-b border-neutral-200/70">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-serif text-3xl font-semibold text-tikaram-charcoal">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="font-sans text-lg text-tikaram-charcoal/60">
                    / 5
                  </span>
                  <StarRating rating={averageRating} size={24} />
                </div>
                <p className="font-sans text-sm text-tikaram-charcoal/70">
                  Based on {safeReviews.length} {safeReviews.length === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            )}

            {/* Latest Reviews */}
            <div className="space-y-6 mb-6">
              {latestReviews.length > 0 ? (
                latestReviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-sans text-base font-semibold text-tikaram-charcoal">
                        {review.author_name}
                      </span>
                      <StarRating rating={review.rating} size={16} />
                    </div>
                    <p className="font-sans text-sm text-tikaram-charcoal/80 mb-4">
                      {review.review_text}
                    </p>
                    {index < latestReviews.length - 1 && (
                      <hr className="border-t border-neutral-200/70" />
                    )}
                  </div>
                ))
              ) : (
                <p className="font-sans text-sm text-tikaram-charcoal/70 italic">
                  No reviews yet. Be the first to review this product!
                </p>
              )}
            </div>
            
            {/* Submit Review Button */}
            <Button
              variant="outline"
              onClick={handleSubmitReviewClick}
              className="w-full sm:w-auto mt-6 !text-tikaram-charcoal !border-tikaram-gold hover:!border-tikaram-gold hover:!bg-tikaram-gold/10"
            >
              SUBMIT YOUR REVIEW
            </Button>
          </>
        )}
      </>
    )
  }

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Mobile Layout: Vertical Stack */}
      <div className="lg:hidden max-w-[1440px] mx-auto">
        {/* Bottle at Top */}
        <div className="relative flex items-center justify-center py-12 px-4">
          <div
            ref={bottleRef}
            data-pdp-bottle
            className="relative h-[50vh] w-full max-w-[280px] mx-auto"
          >
            <Image
              src={bottleImageSrc}
              alt={product.headline}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 30vw"
              priority
            />
          </div>
        </div>

        {/* Cards Stacked Vertically */}
        <div ref={cardsRef} className="px-4 pb-16 space-y-8">
          {storyCards.map((card, index) => (
            <article
              key={card.id}
              data-card={card.id}
              className="relative w-full"
            >
                <div className="bg-white shadow-level-1 rounded-soft px-8 py-10 lg:px-10 lg:py-12">
                  {renderCardContent(card)}
                </div>
              </article>
            ))}
        </div>
      </div>

      {/* Desktop Layout: Two Column with Parallax */}
      <div
        ref={gridContainerRef}
        className="hidden lg:grid max-w-[1440px] mx-auto min-h-screen grid-cols-[minmax(0,0.75fr)_1px_minmax(0,1.25fr)] items-center"
      >
        {/* Left Column - Bottle Container */}
        <div className="relative flex items-center justify-center py-24">
          <div
            ref={bottleRef}
            data-pdp-bottle
            className="relative h-[70vh] w-full max-w-[360px] mx-auto"
          >
            <Image
              src={bottleImageSrc}
              alt={product.headline}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 40vw, 30vw"
              priority
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-l border-neutral-200/70" />

        {/* Right Column - Story Cards Container */}
        <div className="relative flex items-center justify-center pt-0 pb-8">
          <div ref={cardsRef} className="relative w-full max-w-xl mx-auto min-h-[600px]">
            {storyCards.map((card, index) => (
              <article
                key={card.id}
                data-card={card.id}
                className={`absolute left-1/2 w-full -translate-x-1/2 ${
                  index === 0
                    ? 'opacity-100 pointer-events-auto top-0'
                    : 'opacity-0 pointer-events-none top-0'
                }`}
              >
                <div className="bg-white shadow-level-1 rounded-soft px-8 py-8 lg:px-10 lg:py-10">
                  {renderCardContent(card)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      {/* Review Submission Modal */}
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productName={product.headline}
        productSlug={product.slug}
      />
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      {/* Store Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
        productSlug={product.slug}
      />
    </section>
  )
}
