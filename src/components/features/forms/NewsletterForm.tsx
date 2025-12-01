'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  zip_code: z.string().optional(),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          zip_code: data.zip_code || null,
          source: 'newsletter',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-[#FFFDD0]/80">{errors.email.message}</p>
        )}
      </div>
      <div className="flex-1 md:flex-initial">
        <Input
          type="text"
          placeholder="Zip code (optional)"
          {...register('zip_code')}
          maxLength={10}
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Submitting...' : 'Subscribe'}
      </Button>

      {submitStatus === 'success' && (
        <p className="w-full text-center md:text-left mt-2 text-sm text-[#FFFDD0]">
          Check your email for your coupon code.
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="w-full text-center md:text-left mt-2 text-sm text-[#FFFDD0]/80">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
