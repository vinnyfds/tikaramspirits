'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useLocationTracker } from '@/hooks/useLocationTracker'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [step, setStep] = useState<'initial' | 'details' | 'submitting' | 'success' | 'error'>('initial')
  const [formData, setFormData] = useState({ email: '', name: '', zip: '' })
  const [message, setMessage] = useState<string>('')
  const { zip_code } = useLocationTracker()

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle Next button click (initial step)
  const handleNext = () => {
    if (!formData.email || !validateEmail(formData.email)) {
      setMessage('Please enter a valid email address')
      return
    }
    setMessage('')
    setStep('details')
  }

  // Handle Get Coupon button click (details step)
  const handleSubmit = async () => {
    setStep('submitting')
    setMessage('')

    try {
      // Retrieve DOB from localStorage
      const dob = localStorage.getItem('tikaram_user_dob')
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.name,
          zip_code: formData.zip,
          date_of_birth: dob,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || 'Something went wrong. Please try again.'
        setStep('error')
        setMessage(errorMessage)
        return
      }

      // Success: Set step to success
      setStep('success')
    } catch (error) {
      setStep('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  // Auto-reset on success
  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => {
        setStep('initial')
        setFormData({ email: '', name: '', zip: '' })
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [step])

  // Pre-fill zip code from location tracker
  useEffect(() => {
    if (zip_code && !formData.zip) {
      setFormData((prev) => ({ ...prev, zip: zip_code }))
    }
  }, [zip_code, formData.zip])

  return (
    <footer className="bg-tikaram-deep-forest text-tikaram-cream">
      {/* 4-Column Grid */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/global/logo-gold.svg"
                alt="Tikaram Spirits"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="font-sans text-sm text-tikaram-cream/80">
              The Spirit of Florida's Sun-Soaked Coast.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-white mb-6">Explore</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/spirits"
                  className="font-sans text-sm text-tikaram-cream/90 hover:text-tikaram-gold transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-sans text-sm text-tikaram-cream/90 hover:text-tikaram-gold transition-colors"
                >
                  Story
                </Link>
              </li>
              <li>
                <Link
                  href="/cocktail-recipes"
                  className="font-sans text-sm text-tikaram-cream/90 hover:text-tikaram-gold transition-colors"
                >
                  Mixology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-white mb-6">Legal</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/privacy"
                  className="font-sans text-sm text-tikaram-cream/90 hover:text-tikaram-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-sans text-sm text-tikaram-cream/90 hover:text-tikaram-gold transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?inquiry=wholesale"
                  className="font-sans text-sm text-tikaram-cream/90 hover:text-tikaram-gold transition-colors"
                >
                  Wholesale Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-white mb-6">Newsletter</h3>
            
            {step === 'success' ? (
              <p className="text-sm text-tikaram-gold font-sans">
                Please check your inbox to verify your email and unlock your coupon.
              </p>
            ) : step === 'initial' ? (
              <div className="flex flex-col gap-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      setMessage('')
                    }}
                    className="w-full"
                  />
                  {message && (
                    <p className="mt-2 text-sm text-tikaram-cream/80">{message}</p>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full"
                >
                  Next
                </Button>
              </div>
            ) : step === 'details' ? (
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  disabled
                  className="w-full opacity-60 bg-white/5 cursor-not-allowed"
                />
                <Input
                  type="text"
                  placeholder="First Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    setMessage('')
                  }}
                  className="w-full"
                />
                <Input
                  type="text"
                  placeholder="Zip Code"
                  value={formData.zip}
                  onChange={(e) => {
                    setFormData({ ...formData, zip: e.target.value })
                    setMessage('')
                  }}
                  className="w-full"
                />
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Get Coupon
                </Button>
                {message && (
                  <p className="text-sm text-tikaram-rust mt-2">{message}</p>
                )}
              </div>
            ) : step === 'submitting' ? (
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  disabled
                  className="w-full opacity-60 bg-white/5 cursor-not-allowed"
                />
                <Input
                  type="text"
                  placeholder="First Name"
                  value={formData.name}
                  disabled
                  className="w-full opacity-60 bg-white/5 cursor-not-allowed"
                />
                <Input
                  type="text"
                  placeholder="Zip Code"
                  value={formData.zip}
                  disabled
                  className="w-full opacity-60 bg-white/5 cursor-not-allowed"
                />
                <Button type="button" disabled className="w-full">
                  Submitting...
                </Button>
              </div>
            ) : step === 'error' ? (
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  disabled
                  className="w-full opacity-60 bg-white/5 cursor-not-allowed"
                />
                <Input
                  type="text"
                  placeholder="First Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    setMessage('')
                  }}
                  className="w-full"
                />
                <Input
                  type="text"
                  placeholder="Zip Code"
                  value={formData.zip}
                  onChange={(e) => {
                    setFormData({ ...formData, zip: e.target.value })
                    setMessage('')
                  }}
                  className="w-full"
                />
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Get Coupon
                </Button>
                {message && (
                  <p className="text-sm text-tikaram-rust mt-2">{message}</p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Compliance Strip */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8">
          <p className="font-sans text-xs text-tikaram-cream/70 text-center">
            &copy; {currentYear} Tikaram Spirits. All rights reserved. Please Drink Responsibly. Must be 21+ to enter.
          </p>
        </div>
      </div>
    </footer>
  )
}
