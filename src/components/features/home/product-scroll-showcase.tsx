'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'
import { Button } from '@/components/ui/Button'

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

const PRODUCT_SLIDES: ProductSlide[] = [
  {
    id: 'paan-liqueur',
    name: 'Tikaram Paan Liqueur',
    tagline: 'Exotic Blend • 15% ABV',
    description:
      'A tribute to heritage. Sweet, aromatic, and unlike anything else. Infused with betel leaf, rose petal, and fennel. This unique liqueur bridges cultures and flavors, creating an unforgettable experience.',
    ctaLabel: 'Discover Paan Liqueur',
    ctaHref: '/spirits/paan-liqueur',
    bottleImageSrc: '/assets/products/bottle-paan-liqueur.png',
    backgroundImageSrc: '/assets/home/home-product-bg-paan-plain-1920x1080.jpg',
    backgroundColor: '#1a5f3f',
  },
  {
    id: 'florida-bourbon',
    name: 'Florida Bourbon Whiskey',
    tagline: 'Small Batch • 110 Proof',
    description:
      'Bold as the Florida heat. Aged in charred American oak, delivering a rich, spicy profile with a smooth caramel finish. This small-batch bourbon captures the essence of Florida craftsmanship.',
    ctaLabel: 'Explore Florida Bourbon',
    ctaHref: '/spirits/florida-bourbon',
    bottleImageSrc: '/assets/products/bottle-florida-bourbon.png',
    backgroundImageSrc: '/assets/home/home-product-bg-bourbon-plain-1920x1080.jpg',
    backgroundColor: '#8b4513',
  },
  {
    id: 'tikaram-tequila',
    name: 'Tikaram Tequila',
    tagline: '100% De Agave • 80 Proof',
    description:
      'Artisan inspired. Harvested from the highlands and distilled for purity. Crisp, clean, and perfect for a Florida sunset. This premium tequila embodies the spirit of craftsmanship.',
    ctaLabel: 'Discover Tequila',
    ctaHref: '/spirits/tikaram-tequila',
    bottleImageSrc: '/assets/products/bottle-tequila.png',
    backgroundImageSrc: '/assets/home/home-product-bg-tequila-plain-1920x1080.jpg',
    backgroundColor: '#d4af37',
  },
  {
    id: 'tikaram-keylime-tequila',
    name: 'Tikaram Key Lime Tequila',
    tagline: 'Key Lime Infused • 70 Proof',
    description:
      'A Florida classic meets Mexican tradition. Smooth agave tequila infused with the tart, zesty kick of authentic Florida Key Limes. This unique fusion celebrates both cultures.',
    ctaLabel: 'Try Key Lime Tequila',
    ctaHref: '/spirits/tikaram-keylime-tequila',
    bottleImageSrc: '/assets/products/bottle-keylime.png',
    backgroundImageSrc: '/assets/home/home-product-bg-keylime-plain-1920x1080.jpg',
    backgroundColor: '#90ee90',
  },
  {
    id: 'ponce-de-leon-rum',
    name: 'Ponce De Leon Rum',
    tagline: '80 proof • 40% ABV',
    description:
      'Named after the explorer who sought the Fountain of Youth, this rum might be the closest thing to it. Aged for 12 long years in American Oak, it absorbs the humid Florida air to create a profile that is deep, complex, and impossibly smooth.',
    ctaLabel: 'Explore Ponce De Leon Rum',
    ctaHref: '/spirits/ponce-de-leon-rum',
    bottleImageSrc: '/assets/products/bottle-ponce-rum.png',
    backgroundImageSrc: '/assets/home/home-product-bg-ponce-plain-1920x1080.jpg',
    backgroundColor: '#3d2817',
  },
]

// Slide asset mapping confirmation:
// paan-liqueur → bg: /assets/home/home-product-bg-paan-plain-1920x1080.jpg, bottle: /assets/products/bottle-paan-liqueur.png
// florida-bourbon → bg: /assets/home/home-product-bg-bourbon-plain-1920x1080.jpg, bottle: /assets/products/bottle-florida-bourbon.png
// tikaram-tequila → bg: /assets/home/home-product-bg-tequila-plain-1920x1080.jpg, bottle: /assets/products/bottle-tequila.png
// tikaram-keylime-tequila → bg: /assets/home/home-product-bg-keylime-plain-1920x1080.jpg, bottle: /assets/products/bottle-keylime.png
// ponce-de-leon-rum → bg: /assets/home/home-product-bg-ponce-plain-1920x1080.jpg, bottle: /assets/products/bottle-ponce-rum.png

export function ProductScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return

    // Responsive guard: only initialize on desktop/tablet (>= 768px)
    if (window.innerWidth < 768) return

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
        className="relative h-screen overflow-hidden bg-tikaram-off-white"
      >
        <div className="h-full w-full flex items-center">
          {/* Product Slides Track */}
          <div ref={trackRef} className="flex flex-col md:flex-row h-full w-full">
            {PRODUCT_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                data-slide={slide.id}
                className="w-full md:min-w-full h-full relative overflow-hidden flex flex-col lg:flex-row items-center justify-center"
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

