'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ReviewSubmissionModal } from '@/components/features/spirits/ReviewSubmissionModal'
import { AuthModal } from '@/components/features/auth/AuthModal'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { getProductBySlug, type Product } from '@/lib/data'
import { type Review } from '@/lib/reviews'
import { TestimonialsSection } from './TestimonialsSection'

type TestimonialsPageContentProps = {
  products: Product[]
  initialReviews: Review[]
}

export function TestimonialsPageContent({ products, initialReviews }: TestimonialsPageContentProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('ponce-de-leon-rum')

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
      // If user just logged in, close auth modal and open review modal
      if (session?.user && isAuthModalOpen) {
        setIsAuthModalOpen(false)
        setIsReviewModalOpen(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [isAuthModalOpen])

  // Get selected product data
  const selectedProduct = getProductBySlug(selectedProductSlug)

  const handleSubmitReviewClick = () => {
    if (user) {
      setIsReviewModalOpen(true)
    } else {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <>
      {/* Hero Banner Section */}
      <section className="pt-20 md:pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="relative h-[60vh] min-h-[400px] w-full rounded-3xl overflow-hidden shadow-xl">
            {/* Background Image */}
            <Image
              src="/assets/global/hero-testimonials.jpg"
              alt="Testimonials"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#D4AF37] leading-tight mb-8">
                What Our Customers Say
              </h1>
            </div>

            {/* Social Icons Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
              <a
                href="#"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="/assets/global/social-instagram.svg"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="/assets/global/social-facebook.svg"
                  alt="Facebook"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="/assets/global/social-tiktok.svg"
                  alt="TikTok"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Review CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-[1440px] mx-auto flex justify-center">
          <Button
            variant="primary"
            onClick={handleSubmitReviewClick}
            className="uppercase tracking-widest text-base md:text-lg px-8 py-4"
          >
            SUBMIT YOUR REVIEW
          </Button>
        </div>
      </section>

      {/* Interactive Testimonials Section */}
      <TestimonialsSection 
        products={products} 
        initialReviews={initialReviews}
        onProductChange={setSelectedProductSlug}
      />

      {/* Review Submission Modal */}
      {selectedProduct && (
        <ReviewSubmissionModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          productName={selectedProduct.headline}
          productSlug={selectedProductSlug}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  )
}

