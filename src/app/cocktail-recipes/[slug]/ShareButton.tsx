'use client'

import { Share2 } from 'lucide-react'

export function ShareButton() {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: document.title,
        text: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        url: window.location.href,
      })
    } else if (typeof window !== 'undefined' && navigator.clipboard) {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F] hover:text-[#8B0000] transition-colors underline decoration-1 underline-offset-4"
    >
      <Share2 className="w-5 h-5" />
      <span>Share</span>
    </button>
  )
}

