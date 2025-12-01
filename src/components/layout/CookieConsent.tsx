'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('tikaram_cookie_consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('tikaram_cookie_consent', 'granted')
    setIsVisible(false)
    window.dispatchEvent(new Event('cookie-consent-updated'))
  }

  const handleReject = () => {
    localStorage.setItem('tikaram_cookie_consent', 'denied')
    setIsVisible(false)
    window.dispatchEvent(new Event('cookie-consent-updated'))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 text-white px-4 py-4 md:px-8 md:py-6">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm md:text-base text-white/90 text-center md:text-left">
          We use cookies to analyze traffic and enhance your experience.
        </p>
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          <Button variant="outline" onClick={handleReject} className="flex-1 md:flex-none">
            Reject
          </Button>
          <Button variant="primary" onClick={handleAccept} className="flex-1 md:flex-none">
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

