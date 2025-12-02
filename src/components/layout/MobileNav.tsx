'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Drawer } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'

type MobileNavProps = {
  isOpen: boolean
  onClose: () => void
  onAuthClick: () => void
}

export function MobileNav({ isOpen, onClose, onAuthClick }: MobileNavProps) {
  const router = useRouter()
  
  const navLinks = [
    { label: 'Spirits', href: '/spirits' },
    { label: 'Story', href: '/about' },
    { label: 'Recipes', href: '/cocktail-recipes' },
    { label: 'Events', href: '/events' },
    { label: 'TESTIMONIALS', href: '/testimonials' },
    { label: 'FIND US', href: '/find-us' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Prevent default navigation
    e.preventDefault()
    e.stopPropagation()
    
    // Close menu immediately when link is clicked
    onClose()
    
    // Use setTimeout to ensure state update happens before navigation
    setTimeout(() => {
      router.push(href)
    }, 100)
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="right">
      <nav className="flex flex-col gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="font-sans text-base uppercase tracking-widest text-[#D4AF37]/90 hover:text-[#D4AF37] transition-colors py-2 block"
          >
            {link.label}
          </Link>
        ))}

        <div className="pt-6 mt-6 border-t border-[#D4AF37]/20">
          <Button
            variant="primary"
            onClick={() => {
              onClose()
              onAuthClick()
            }}
            className="w-full"
          >
            JOIN US
          </Button>
        </div>
      </nav>
    </Drawer>
  )
}
