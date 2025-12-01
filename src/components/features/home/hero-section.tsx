'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const videoSlides = [
  {
    desktop: '/assets/home/home-hero-rum.mp4',
    mobile: '/assets/home/home-hero-rum-mobile.mp4',
  },
  {
    desktop: '/assets/home/home-hero-bourbon.mp4',
    mobile: '/assets/home/home-hero-bourbon-mobile.mp4',
  },
  {
    desktop: '/assets/home/home-hero-paan-liqueur.mp4',
    mobile: '/assets/home/home-hero-paan-liqueur-mobile.mp4',
  },
  {
    desktop: '/assets/home/home-hero-tequila.mp4',
    mobile: '/assets/home/home-hero-tequila-mobile.mp4',
  },
]

const CAROUSEL_INTERVAL = 8000 // 8 seconds per video

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    // Start with a random video index
    const randomIndex = Math.floor(Math.random() * videoSlides.length)
    setCurrentIndex(randomIndex)

    // Set up carousel interval
    const interval = setInterval(() => {
      setIsTransitioning(true)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videoSlides.length)
        setIsTransitioning(false)
      }, 500) // Half second transition
    }, CAROUSEL_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Play the current video and pause others
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play().catch(() => {
            // Ignore autoplay errors
          })
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [currentIndex])

  return (
    <section className="bg-tikaram-off-white px-4 md:px-8 lg:px-12 pt-24 md:pt-28">
      <div className="max-w-[1400px] mx-auto h-[85vh] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
        {/* Video Carousel */}
        {videoSlides.map((video, index) => (
      <video
            key={index}
            ref={(el) => {
              videoRefs.current[index] = el
            }}
            autoPlay={index === currentIndex}
        loop
        muted
        playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
            }`}
      >
            <source src={video.desktop} type="video/mp4" media="(min-width: 768px)" />
            <source src={video.mobile} type="video/mp4" />
      </video>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 text-center">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white mb-6 leading-tight">
          The Spirit of Florida&apos;s Sun-Soaked Coast.
        </h1>
        <p className="font-sans text-base lg:text-lg text-white/90 max-w-2xl mb-8">
          Hand-crafted rum, bourbon, and tequila. Aged to perfection in the heat of the Sunshine State.
        </p>
        <Link href="/spirits">
          <Button variant="primary">
            Discover the Collection
          </Button>
        </Link>
        </div>
      </div>
    </section>
  )
}

