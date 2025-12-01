'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ReviewSubmissionModal } from '@/components/features/spirits/ReviewSubmissionModal'
import { AuthModal } from '@/components/features/auth/AuthModal'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

type SubmitReviewButtonProps = {
  productSlug?: string
  productName?: string
  className?: string
}

export function SubmitReviewButton({ 
  productSlug, 
  productName = 'this product',
  className = ''
}: SubmitReviewButtonProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
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
      // If user just logged in, close auth modal and open review modal
      if (session?.user && isAuthModalOpen) {
        setIsAuthModalOpen(false)
        if (productSlug) {
          setIsReviewModalOpen(true)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [isAuthModalOpen, productSlug])

  const handleClick = () => {
    if (user) {
      if (productSlug) {
        setIsReviewModalOpen(true)
      } else {
        // If no product slug, redirect to spirits page to select a product
        router.push('/spirits')
      }
    } else {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleClick}
        className={`uppercase tracking-widest ${className}`}
      >
        SUBMIT YOUR REVIEW
      </Button>
      
      {/* Review Submission Modal - only show if productSlug is provided */}
      {productSlug && (
        <ReviewSubmissionModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          productName={productName}
          productSlug={productSlug}
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

