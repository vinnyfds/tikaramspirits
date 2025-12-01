'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { clsx } from 'clsx'

const contactSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  inquiry_type: z.enum(['General', 'Wholesale', 'Events', 'Press'], {
    required_error: 'Please select an inquiry type',
  }),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Connect to API endpoint when available
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })
      
      // For MVP, simulate success
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="first_name" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            {...register('first_name')}
            className={clsx(
              'w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
              errors.first_name && 'border-[#B7410E]'
            )}
            placeholder="First name"
            aria-invalid={errors.first_name ? 'true' : 'false'}
          />
          {errors.first_name && (
            <p className="text-sm text-[#B7410E]">{errors.first_name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            {...register('last_name')}
            className={clsx(
              'w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
              errors.last_name && 'border-[#B7410E]'
            )}
            placeholder="Last name"
            aria-invalid={errors.last_name ? 'true' : 'false'}
          />
          {errors.last_name && (
            <p className="text-sm text-[#B7410E]">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={clsx(
            'w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
            errors.email && 'border-[#B7410E]'
          )}
          placeholder="your.email@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="text-sm text-[#B7410E]">{errors.email.message}</p>
        )}
      </div>

      {/* Inquiry Type Dropdown */}
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry_type" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
          Inquiry Type
        </label>
        <select
          id="inquiry_type"
          {...register('inquiry_type')}
          className={clsx(
            'w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base',
            errors.inquiry_type && 'border-[#B7410E]'
          )}
          aria-invalid={errors.inquiry_type ? 'true' : 'false'}
        >
          <option value="">Select an inquiry type</option>
          <option value="General">General</option>
          <option value="Wholesale">Wholesale</option>
          <option value="Events">Events</option>
          <option value="Press">Press</option>
        </select>
        {errors.inquiry_type && (
          <p className="text-sm text-[#B7410E]">{errors.inquiry_type.message}</p>
        )}
      </div>

      {/* Message Textarea */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          className={clsx(
            'w-full px-4 py-3 rounded-soft bg-white border border-neutral-200 text-[#36454F] placeholder:text-[#36454F]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base resize-y',
            errors.message && 'border-[#B7410E]'
          )}
          placeholder="Tell us how we can help..."
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && (
          <p className="text-sm text-[#B7410E]">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <p className="text-sm text-[#004225] font-sans">
          Thank you. Your message has been received. We will raise a glass and get back to you shortly.
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="text-sm text-[#B7410E] font-sans">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

