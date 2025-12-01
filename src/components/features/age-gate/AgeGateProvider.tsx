'use client'

import { useAgeGate } from '@/hooks/useAgeGate'
import { AgeGateModal } from './AgeGateModal'

export function AgeGateProvider() {
  const { isOpen, verifyAge } = useAgeGate()

  return <AgeGateModal isOpen={isOpen} onVerify={verifyAge} />
}

