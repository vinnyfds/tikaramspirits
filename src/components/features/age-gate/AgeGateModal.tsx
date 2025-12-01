'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { validateAge } from '@/hooks/useAgeGate'

type AgeGateModalProps = {
  isOpen: boolean
  onVerify: () => void
}

const MONTHS = [
  { value: 0, label: 'Month' },
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1899 }, (_, i) => CURRENT_YEAR - i)

export function AgeGateModal({ isOpen, onVerify }: AgeGateModalProps) {
  const [month, setMonth] = useState<number>(0)
  const [day, setDay] = useState<number>(0)
  const [year, setYear] = useState<number>(0)
  const [error, setError] = useState<string>('')

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!month || !day || !year) {
      setError('Please enter your complete date of birth.')
      return
    }

    const isValid = validateAge(month, day, year)

    if (!isValid) {
      // Redirect to Google if under 21
      window.location.href = 'https://google.com'
      return
    }

    // User is 21+, save DOB to localStorage and verify
    const dobString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    localStorage.setItem('tikaram_user_dob', dobString)
    
    // Verify and close modal (this sets the cookie)
    onVerify()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background with placeholder and overlay */}
      <div className="absolute inset-0 bg-[#004225] backdrop-blur-md">
        {/* Placeholder for age-gate-bg.jpg - will be replaced when image is available */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-[#004225]/95 backdrop-blur-md rounded-lg p-8 border border-white/10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/assets/global/logo-gold.svg"
              alt="Tikaram Spirits"
              width={200}
              height={60}
              className="object-contain"
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-white text-center mb-4">
            Are you of legal drinking age?
          </h1>

          {/* Subhead */}
          <p className="font-sans text-base lg:text-lg text-white/90 text-center mb-8">
            To enter this site, you must be 21 years or older. Please enter your date of birth.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Inputs */}
            <div className="grid grid-cols-3 gap-4">
              {/* Month Select */}
              <div>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '40px',
                  }}
                >
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value} className="bg-[#004225] text-white">
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Select */}
              <div>
                <select
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '40px',
                  }}
                >
                  <option value={0} className="bg-[#004225] text-white">
                    Day
                  </option>
                  {DAYS.map((d) => (
                    <option key={d} value={d} className="bg-[#004225] text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Input */}
              <div>
                <input
                  type="number"
                  min="1900"
                  max={CURRENT_YEAR}
                  placeholder="Year"
                  value={year || ''}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="font-sans text-sm text-[#B7410E] text-center">{error}</p>
            )}

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="w-full">
              Enter Site
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

