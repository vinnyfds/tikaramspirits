'use client'

import { useState, useEffect } from 'react'

const AGE_GATE_COOKIE_NAME = 'tikaram-age-verified'
const COOKIE_EXPIRY_DAYS = 30
const LEGAL_AGE = 21

/**
 * Calculate age from a birth date
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

/**
 * Validate if the provided date of birth indicates the user is 21 or older
 */
export function validateAge(month: number, day: number, year: number): boolean {
  if (!month || !day || !year) return false
  
  const birthDate = new Date(year, month - 1, day)
  
  // Check if date is valid
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return false
  }
  
  const age = calculateAge(birthDate)
  return age >= LEGAL_AGE
}

export function useAgeGate() {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if age gate cookie exists
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${AGE_GATE_COOKIE_NAME}=`))

    if (cookie) {
      setIsVerified(true)
    }
    setIsLoading(false)
  }, [])

  const verifyAge = () => {
    const expiryDate = new Date()
    expiryDate.setTime(expiryDate.getTime() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
    
    document.cookie = `${AGE_GATE_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/`
    setIsVerified(true)
  }

  return {
    isVerified,
    isLoading,
    isOpen: !isVerified && !isLoading,
    verifyAge,
  }
}

