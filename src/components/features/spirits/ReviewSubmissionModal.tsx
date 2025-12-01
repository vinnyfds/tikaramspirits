'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Star } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { clsx } from 'clsx'

const reviewSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  review: z.string().min(20, 'Review must be at least 20 characters'),
})

type ReviewFormData = z.infer<typeof reviewSchema>

type ReviewSubmissionModalProps = {
  isOpen: boolean
  onClose: () => void
  productName: string
  productSlug: string
}

export function ReviewSubmissionModal({
  isOpen,
  onClose,
  productName,
  productSlug,
}: ReviewSubmissionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [selectedRating, setSelectedRating] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  })

  const currentRating = watch('rating')

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating)
    setValue('rating', rating, { shouldValidate: true })
  }

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productSlug,
          authorName: data.name,
          rating: data.rating,
          reviewText: data.review,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        reset()
        setSelectedRating(0)
        
        // Close modal after 2 seconds on success
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
        console.error('Error submitting review:', result.error)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Review ${productName}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="review-name" className="font-sans text-sm uppercase tracking-widest font-semibold text-tikaram-charcoal">
            Your Name
          </label>
          <input
            id="review-name"
            type="text"
            {...register('name')}
            className={clsx(
              'w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-tikaram-charcoal placeholder:text-tikaram-charcoal/40 focus:outline-none focus:ring-2 focus:ring-tikaram-gold focus:border-transparent transition-all font-sans text-base',
              errors.name && 'border-tikaram-rust'
            )}
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-sm text-tikaram-rust">{errors.name.message}</p>
          )}
        </div>

        {/* Rating Field */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-sm uppercase tracking-widest font-semibold text-tikaram-charcoal">
            Rating
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingClick(rating)}
                className="focus:outline-none focus:ring-2 focus:ring-tikaram-gold rounded-soft p-1 transition-transform hover:scale-110"
                aria-label={`Rate ${rating} stars`}
              >
                <Star
                  className={selectedRating >= rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-neutral-300'}
                  size={32}
                />
              </button>
            ))}
          </div>
          <input
            type="hidden"
            {...register('rating')}
          />
          {errors.rating && (
            <p className="text-sm text-tikaram-rust">{errors.rating.message}</p>
          )}
        </div>

        {/* Review Textarea */}
        <div className="flex flex-col gap-2">
          <label htmlFor="review-text" className="font-sans text-sm uppercase tracking-widest font-semibold text-tikaram-charcoal">
            Your Review
          </label>
          <textarea
            id="review-text"
            {...register('review')}
            rows={6}
            className={clsx(
              'w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-tikaram-charcoal placeholder:text-tikaram-charcoal/40 focus:outline-none focus:ring-2 focus:ring-tikaram-gold focus:border-transparent transition-all font-sans text-base resize-y',
              errors.review && 'border-tikaram-rust'
            )}
            placeholder="Share your thoughts about this product..."
            aria-invalid={errors.review ? 'true' : 'false'}
          />
          {errors.review && (
            <p className="text-sm text-tikaram-rust">{errors.review.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <p className="text-sm text-tikaram-deep-forest font-sans">
            Thank you for your review! It will be published after moderation.
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="text-sm text-tikaram-rust font-sans">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </Modal>
  )
}

