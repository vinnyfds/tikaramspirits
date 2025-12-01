'use client'

import Image from 'next/image'
import { Share2 } from 'lucide-react'
import { useState } from 'react'

type SocialShareBarProps = {
  url: string
  title: string
  className?: string
}

export function SocialShareBar({ url, title, className }: SocialShareBarProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${title} from Tikaram Spirits`,
          url,
        })
      } catch (error) {
        // User cancelled or error occurred
        console.error('Error sharing:', error)
      }
    } else if (typeof window !== 'undefined' && navigator.clipboard) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Error copying to clipboard:', error)
      }
    }
  }

  const handleSocialClick = async (platform: string) => {
    if (platform === 'facebook') {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      window.open(shareUrl, '_blank', 'width=600,height=400')
    } else {
      // Instagram, TikTok, YouTube don't have direct share URLs
      // Fallback to copying link
      if (typeof window !== 'undefined' && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (error) {
          console.error('Error copying to clipboard:', error)
        }
      }
    }
  }

  return (
    <div className={`flex items-center gap-4 ${className || ''}`}>
      {/* Social Icons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleSocialClick('facebook')}
          aria-label="Share on Facebook"
          className="transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 rounded"
        >
          <Image
            src="/assets/global/social-facebook.svg"
            alt="Facebook"
            width={20}
            height={20}
            className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
          />
        </button>
        <button
          onClick={() => handleSocialClick('instagram')}
          aria-label="Share on Instagram"
          className="transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 rounded"
        >
          <Image
            src="/assets/global/social-instagram.svg"
            alt="Instagram"
            width={20}
            height={20}
            className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
          />
        </button>
        <button
          onClick={() => handleSocialClick('tiktok')}
          aria-label="Share on TikTok"
          className="transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 rounded"
        >
          <Image
            src="/assets/global/social-tiktok.svg"
            alt="TikTok"
            width={20}
            height={20}
            className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
          />
        </button>
        <button
          onClick={() => handleSocialClick('youtube')}
          aria-label="Share on YouTube"
          className="transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 rounded"
        >
          <Image
            src="/assets/global/social-youtube.svg"
            alt="YouTube"
            width={20}
            height={20}
            className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
          />
        </button>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2 font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F] hover:text-[#D4AF37] transition-colors underline decoration-1 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 rounded px-1"
        aria-label="Share this page"
      >
        <Share2 className="w-5 h-5" />
        <span>{copied ? 'Copied!' : 'Share'}</span>
      </button>
    </div>
  )
}

