'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, User } from 'lucide-react'
import { MobileNav } from './MobileNav'
import { Button } from '@/components/ui/Button'
import { AuthModal } from '@/components/features/auth/AuthModal'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    
    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const navLinks = [
    { label: 'Spirits', href: '/spirits' },
    { label: 'Story', href: '/about' },
    { label: 'Recipes', href: '/cocktail-recipes' },
    { label: 'Events', href: '/events' },
    { label: 'TESTIMONIALS', href: '/testimonials' },
    { label: 'FIND US', href: '/find-us' },
  ]

  // Dynamic colors: Black when at top, Gold when scrolled
  const textColorClass = isScrolled ? 'text-[#D4AF37]' : 'text-black'
  const navLinkClass = isScrolled 
    ? 'text-[#D4AF37]/90 hover:text-[#D4AF37]' 
    : 'text-black/90 hover:text-black'
  const iconClass = isScrolled 
    ? 'text-[#D4AF37]/90 hover:text-[#D4AF37]' 
    : 'text-black/90 hover:text-black'

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#004225] backdrop-blur-md shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 flex items-center justify-center md:justify-between relative">
          {/* Logo */}
          <Link href="/" className={`font-serif text-xl md:text-2xl font-bold ${textColorClass} transition-colors duration-300`}>
            Tikaram Spirits
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm uppercase tracking-widest transition-colors duration-300 ${navLinkClass}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  aria-label="Logout"
                  className={`flex items-center gap-2 transition-colors duration-300 ${iconClass}`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-sans text-sm uppercase tracking-widest">Logout</span>
                </button>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsAuthModalOpen(true)}
              >
                JOIN US
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`absolute right-4 md:hidden transition-colors duration-300 ${textColorClass}`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
