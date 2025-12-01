'use client'

import Link from 'next/link'
import { Globe, MapPin } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'

type MobileNavProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navLinks = [
    { label: 'Spirits', href: '/spirits' },
    { label: 'Story', href: '/about' },
    { label: 'Recipes', href: '/cocktail-recipes' },
    { label: 'Events', href: '/events' },
    { label: 'TESTIMONIALS', href: '/testimonials' },
    { label: 'FIND US', href: '/find-us' },
  ]

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="right">
      <nav className="flex flex-col gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-sans text-base uppercase tracking-widest text-[#D4AF37]/90 hover:text-[#D4AF37] transition-colors py-2"
          >
            {link.label}
          </Link>
        ))}

        <div className="pt-6 mt-6 border-t border-[#D4AF37]/20 flex flex-col gap-4">
          <Link
            href="/store-locator"
            onClick={onClose}
            className="flex items-center gap-3 text-[#D4AF37]/90 hover:text-[#D4AF37] transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span className="font-sans text-sm uppercase tracking-widest">Store Locator</span>
          </Link>
          <button className="flex items-center gap-3 text-[#D4AF37]/90 hover:text-[#D4AF37] transition-colors">
            <Globe className="w-5 h-5" />
            <span className="font-sans text-sm uppercase tracking-widest">Language</span>
          </button>
        </div>
      </nav>
    </Drawer>
  )
}
