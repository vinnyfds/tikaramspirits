'use client'

import { useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import { usePageTransition } from '@/components/layout/PageTransitionProvider'
import { ReactNode, MouseEvent } from 'react'

interface TransitionLinkProps extends LinkProps {
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  [key: string]: unknown
}

export function TransitionLink({
  href,
  children,
  onClick,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()
  const { startTransition, completeTransition } = usePageTransition()

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    onClick?.(e)

    // Prevent default navigation
    e.preventDefault()

    // Start transition animation (slide in)
    await startTransition()

    // Navigate to new page
    // The provider will detect pathname change and trigger slide out
    if (typeof href === 'string') {
      router.push(href)
    } else {
      router.push(href)
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  )
}

