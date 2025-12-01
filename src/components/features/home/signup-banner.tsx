'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

// Simple Newsletter Form Component for Join Team Tikaram Banner
function NewsletterFormSimple() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !validateEmail(email)) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')

    try {
      const dob = localStorage.getItem('tikaram_user_dob')
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter',
          date_of_birth: dob,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setStatus('idle')
            }}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/80 focus:ring-white/50"
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          disabled={isSubmitting}
          className="w-full sm:w-auto whitespace-nowrap !text-white"
        >
          {isSubmitting ? 'Joining...' : 'Join'}
        </Button>
      </form>
      {status === 'success' && (
        <p className="mt-2 text-sm text-white/90 font-sans">
          Check your email to verify!
        </p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-white/80 font-sans">
          Please enter a valid email
        </p>
      )}
    </div>
  )
}

export function SignupBanner() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center">
          {/* Background Image */}
          <Image
            src="/assets/home/home-signup-banner.jpg"
            alt="Join Team Tikaram"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          
          {/* Content Grid */}
          <div className="relative z-10 w-full px-8 lg:px-16 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Text */}
              <div className="flex flex-col gap-4">
                <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-white">
                  JOIN TEAM TIKARAM
                </h2>
                <p className="font-sans text-base lg:text-lg text-white/90">
                  Unlock exclusive access, limited releases, and a welcome gift.
                </p>
              </div>

              {/* Right Side - Email Form */}
              <div className="flex flex-col sm:flex-row gap-4">
                <NewsletterFormSimple />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

