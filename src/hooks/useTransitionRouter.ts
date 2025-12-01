'use client'

import { useRouter } from 'next/navigation'
import { usePageTransition } from '@/components/layout/PageTransitionProvider'
import { useCallback } from 'react'

export function useTransitionRouter() {
  const router = useRouter()
  const { startTransition, completeTransition } = usePageTransition()

  const push = useCallback(
    async (href: string) => {
      await startTransition()
      // The provider will detect pathname change and trigger slide out
      router.push(href)
    },
    [router, startTransition]
  )

  const replace = useCallback(
    async (href: string) => {
      await startTransition()
      // The provider will detect pathname change and trigger slide out
      router.replace(href)
    },
    [router, startTransition]
  )

  const back = useCallback(async () => {
    await startTransition()
    // The provider will detect pathname change and trigger slide out
    router.back()
  }, [router, startTransition])

  return {
    push,
    replace,
    back,
    refresh: router.refresh,
    forward: router.forward,
  }
}

