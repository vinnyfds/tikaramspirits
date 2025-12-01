'use client'

import { useState, useEffect } from 'react'

// Type declaration for window lock property
declare global {
  interface Window {
    tikaram_tracking_active?: boolean
  }
}

export function useLocationTracker() {
  const [zip_code, setZipCode] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)

  useEffect(() => {
    // Check if already logged in this session OR if a request is currently active
    const hasLogged = sessionStorage.getItem('tikaram_session_logged')
    
    // If already logged OR a request is currently flying (lock), stop
    if (hasLogged || window.tikaram_tracking_active) {
      return
    }

    // 1. SET THE LOCK immediately
    window.tikaram_tracking_active = true

    // 2. Run the Async Logic
    const track = async () => {
      try {
        const response = await fetch('/api/track-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.zip_code) {
            setZipCode(data.zip_code)
          }
          if (data.city) {
            setCity(data.city)
          }
          // Mark as logged in session storage
          sessionStorage.setItem('tikaram_session_logged', 'true')
        }
      } catch (error) {
        // If failed, release lock so we can try again later
        window.tikaram_tracking_active = false
        // Silently fail - don't break user experience
        console.error('Error tracking location:', error)
      } finally {
        // Cleanup global variable if needed, though session storage flag is now the source of truth
        delete window.tikaram_tracking_active
      }
    }

    track()
  }, [])

  return { zip_code, city }
}

