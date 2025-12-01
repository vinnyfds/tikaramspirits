'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CocktailCarouselProps = {
  cocktails: Array<{
    name: string
    slug: string
    image: string
  }>
}

export function CocktailCarousel({ cocktails }: CocktailCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || cocktails.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cocktails.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [isAutoPlaying, cocktails.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + cocktails.length) % cocktails.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % cocktails.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  if (cocktails.length === 0) return null

  return (
    <div className="relative mb-6">
      {/* Carousel Container */}
      <div className="relative aspect-[4/3] rounded-soft overflow-hidden bg-tikaram-deep-forest">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Link href={`/cocktail-recipes/${cocktails[currentIndex].slug}`}>
              <Image
                src={cocktails[currentIndex].image}
                alt={cocktails[currentIndex].name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {cocktails.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-tikaram-charcoal rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Previous cocktail"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-tikaram-charcoal rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Next cocktail"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Cocktail Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <Link
            href={`/cocktail-recipes/${cocktails[currentIndex].slug}`}
            className="block"
          >
            <h3 className="font-serif text-lg font-semibold text-white">
              {cocktails[currentIndex].name}
            </h3>
          </Link>
        </div>
      </div>

      {/* Dots Indicator */}
      {cocktails.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {cocktails.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-tikaram-gold'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

