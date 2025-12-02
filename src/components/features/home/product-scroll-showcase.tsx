'use client'

import { useLayoutEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { Button } from '@/components/ui/Button'
import { getAllProducts, type Product } from '@/lib/data'

type ProductSlide = {
  id: string
  name: string
  tagline: string
  description: string
  ctaLabel: string
  ctaHref: string
  bottleImageSrc: string
  backgroundImageSrc: string
  backgroundColor: string
}

// Presentation-specific mappings (background images and colors for homepage slides)
// These are separate from product data since they're UI-specific
const SLIDE_PRESENTATION: Record<
  string,
  { backgroundImageSrc: string; backgroundColor: string; ctaLabel: string }
> = {
  'paan-liqueur': {
    backgroundImageSrc: '/assets/home/home-product-bg-paan-plain-1920x1080.jpg',
    backgroundColor: '#1a5f3f',
    ctaLabel: 'Discover Paan Liqueur',
  },
  'florida-bourbon': {
    backgroundImageSrc: '/assets/home/home-product-bg-bourbon-plain-1920x1080.jpg',
    backgroundColor: '#8b4513',
    ctaLabel: 'Explore Florida Bourbon',
  },
  'tikaram-tequila': {
    backgroundImageSrc: '/assets/home/home-product-bg-tequila-plain-1920x1080.jpg',
    backgroundColor: '#d4af37',
    ctaLabel: 'Discover Tequila',
  },
  'tikaram-keylime-tequila': {
    backgroundImageSrc: '/assets/home/home-product-bg-keylime-plain-1920x1080.jpg',
    backgroundColor: '#90ee90',
    ctaLabel: 'Try Key Lime Tequila',
  },
  'ponce-de-leon-rum': {
    backgroundImageSrc: '/assets/home/home-product-bg-ponce-plain-1920x1080.jpg',
    backgroundColor: '#3d2817',
    ctaLabel: 'Explore Ponce De Leon Rum',
  },
}

// Convert Product from data.ts to ProductSlide format
function productToSlide(product: Product): ProductSlide | null {
  const presentation = SLIDE_PRESENTATION[product.slug]
  if (!presentation) return null

  return {
    id: product.slug,
    name: product.headline,
    tagline: product.subhead,
    description: product.description,
    ctaLabel: presentation.ctaLabel,
    ctaHref: `/spirits/${product.slug}`,
    bottleImageSrc: product.imagePng || product.image,
    backgroundImageSrc: presentation.backgroundImageSrc,
    backgroundColor: presentation.backgroundColor,
  }
}

export function ProductScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  // Get products from data.ts and convert to slides format
  const PRODUCT_SLIDES = useMemo(() => {
    const products = getAllProducts()
    return products
      .map(productToSlide)
      .filter((slide): slide is ProductSlide => slide !== null)
  }, [])

  useLayoutEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return

    if (!trackRef.current || !sectionRef.current) return

    const slides = gsap.utils.toArray<HTMLElement>('[data-slide]')
    const contents = gsap.utils.toArray<HTMLElement>('[data-slide-content]')
    const bottles = gsap.utils.toArray<HTMLElement>('[data-bottle]')
    const slidesCount = slides.length

    // Initialize slides to neutral state
    slides.forEach((slide, index) => {
      gsap.set(slide, {
        opacity: index === 0 ? 1 : 0.45,
        scale: index === 0 ? 1 : 0.96,
      })
    })

    const ctx = gsap.context(() => {
      // Horizontal scroll tween
      const horizontalTween = gsap.to(trackRef.current, {
        xPercent: -100 * (slidesCount - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + window.innerWidth * (slidesCount - 1),
          anticipatePin: 1,
          pinType: 'fixed',
          onUpdate: (self) => {
            const index = Math.round(self.progress * (slidesCount - 1))
            slides.forEach((slide, i) => {
              gsap.to(slide, {
                opacity: i === index ? 1 : 0.45,
                scale: i === index ? 1 : 0.96,
                duration: 0.35,
                ease: 'power2.out',
                overwrite: 'auto',
              })
            })
          },
        },
      })

      // Per-slide text reveal (staggered)
      contents.forEach((content, index) => {
        const slide = slides[index]
        if (!slide || !content) return

        const children = gsap.utils.toArray<HTMLElement>(content.children)

        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween,
              start: 'left center',
              end: 'center center',
              scrub: true,
            },
          }
        )
      })

      // Bottle micro-float
      bottles.forEach((bottle, index) => {
        const slide = slides[index]
        if (!slide) return

        gsap.fromTo(
          bottle,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section aria-label="Featured Tikaram Spirits" className="bg-tikaram-off-white">
      {/* Intro Section - Outside pinned region */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-16">
        <div className="text-center px-4 relative z-10">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#B7410E] uppercase tracking-wide mb-4">
            LET&apos;S GET TO KNOW EACH OTHER
          </h2>
          <p className="font-serif text-base lg:text-lg text-neutral-700 max-w-2xl mx-auto">
            We&apos;re proud to craft Florida&apos;s finest spirits, blending tradition with innovation to create exceptional flavors that honor our heritage.
          </p>
        </div>
      </div>

      {/* Pinned Region - Exactly viewport height */}
      <div
        ref={sectionRef}
        className="relative h-screen overflow-x-auto overflow-y-hidden bg-tikaram-off-white"
      >
        <div className="h-full w-full flex items-center">
          {/* Product Slides Track */}
          <div ref={trackRef} className="flex flex-row h-full w-full">
            {PRODUCT_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                data-slide={slide.id}
                className="w-full min-w-full h-full relative overflow-hidden flex flex-col lg:flex-row items-center justify-center"
              >
                {/* Background Layer */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{ backgroundColor: slide.backgroundColor }}
                >
                  <Image
                    src={slide.backgroundImageSrc}
                    alt=""
                    fill
                    priority={index === 0}
                    className="object-cover"
                    style={{ objectPosition: 'right center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F8F8F8]/95 via-[#F8F8F8]/85 to-transparent" />
                </div>

                {/* Text Column (LEFT) */}
                <div className="relative z-10 w-full lg:w-1/2 h-full flex items-center">
                  <div className="px-6 md:px-10 lg:px-16 py-12 lg:py-16 max-w-[640px]">
                    {/* Text Content */}
                    <div data-slide-content>
                      <div className="space-y-6">
                        <h2 className="text-3xl lg:text-5xl font-serif text-tikaram-rich-black">
                          {slide.name}
                        </h2>
                        <p className="text-sm lg:text-base font-semibold uppercase tracking-[0.15em] text-tikaram-charcoal/80">
                          {slide.tagline}
                        </p>
                        <p className="text-base lg:text-lg font-sans text-tikaram-charcoal leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                      <div className="mt-12">
                        <Link href={slide.ctaHref}>
                          <Button variant="primary">{slide.ctaLabel}</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottle Column (RIGHT) */}
                <div
                  className="relative z-10 w-full lg:w-1/2 h-full flex items-center justify-center px-6 md:px-10 lg:px-16 py-12 lg:py-16"
                  data-bottle
                >
                  <Image
                    src={slide.bottleImageSrc}
                    alt={slide.name}
                    width={480}
                    height={720}
                    className="w-auto h-[55vh] md:h-[60vh] lg:h-[65vh] max-h-[70vh] object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

