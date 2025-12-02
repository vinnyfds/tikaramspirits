'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getProductBySlug, type Product } from '@/lib/data'
import { type Review } from '@/lib/reviews'
import { TestimonialCard } from './TestimonialCard'

type TestimonialsSectionProps = {
  products: Product[]
  initialReviews: Review[]
  onProductChange?: (slug: string) => void
}

export function TestimonialsSection({ products, initialReviews, onProductChange }: TestimonialsSectionProps) {
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('ponce-de-leon-rum')
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Notify parent component when product changes
  useEffect(() => {
    if (onProductChange) {
      onProductChange(selectedProductSlug)
    }
  }, [selectedProductSlug, onProductChange])


  // Fetch reviews when selectedProductSlug changes (but not on initial mount)
  useEffect(() => {
    // Skip fetch if it's the initial product (already have initialReviews)
    if (selectedProductSlug === 'ponce-de-leon-rum') {
      setReviews(initialReviews)
      setIsLoading(false)
      return
    }

    async function fetchReviews() {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/reviews?slug=${encodeURIComponent(selectedProductSlug)}`)
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        const data = await response.json()
        setReviews(data.reviews || [])
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setReviews([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductSlug])

  // Get the selected product data
  const selectedProduct = getProductBySlug(selectedProductSlug)

  // Get product image (prefer PNG, fallback to JPG)
  const productImageSrc = selectedProduct?.imagePng || selectedProduct?.image || ''

  return (
    <>
      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-level-1">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-nowrap overflow-x-auto w-full px-4 justify-start md:justify-center gap-4 md:gap-8 py-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products.map((product) => (
              <button
                key={product.slug}
                onClick={() => setSelectedProductSlug(product.slug)}
                className={`font-sans text-sm uppercase tracking-widest font-semibold whitespace-nowrap transition-all duration-300 pb-2 border-b-2 flex-shrink-0 ${
                  selectedProductSlug === product.slug
                    ? 'border-[#D4AF37] text-[#004225]'
                    : 'border-transparent text-[#36454F]/60 hover:text-[#36454F] hover:border-[#36454F]/30'
                }`}
              >
                {product.headline}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-12">
            {/* Left Column - Product Image */}
            <div className="flex items-center justify-center">
              {productImageSrc && (
                <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={productImageSrc}
                    alt={selectedProduct?.headline || 'Product'}
                    fill
                    className="object-contain transition-opacity duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={selectedProductSlug === 'ponce-de-leon-rum'}
                  />
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block border-l border-neutral-200/70" />

            {/* Right Column - Testimonials */}
            <div className="flex flex-col gap-6">
              {isLoading ? (
                <div className="text-center py-16">
                  <p className="font-sans text-lg text-[#36454F]/70">
                    Loading reviews...
                  </p>
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <TestimonialCard
                    key={review.id}
                    rating={review.rating}
                    quote={review.review_text}
                    author={review.author_name}
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="font-sans text-lg text-[#36454F]/70">
                    No testimonials found for this product.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

