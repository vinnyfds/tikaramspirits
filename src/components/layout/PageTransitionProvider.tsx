'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface PageTransitionContextType {
  isTransitioning: boolean
  startTransition: () => Promise<void>
  completeTransition: () => void
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback(async (): Promise<void> => {
    return new Promise((resolve) => {
      setIsTransitioning(true)
      // Wait for slide-in animation (0.6s) + brief pause (150ms) before resolving
      setTimeout(() => {
        resolve()
      }, 750)
    })
  }, [])

  const completeTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        startTransition,
        completeTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider')
  }
  return context
}

