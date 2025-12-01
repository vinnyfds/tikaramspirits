import { Star } from 'lucide-react'

type StarRatingProps = {
  rating: number
  size?: number
  className?: string
}

export function StarRating({ rating, size = 20, className = '' }: StarRatingProps) {
  const clampedRating = Math.max(0, Math.min(5, rating))
  const fullStars = Math.floor(clampedRating)
  const hasHalfStar = clampedRating % 1 >= 0.5 && clampedRating > 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Filled stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`filled-${i}`}
          className="fill-[#D4AF37] text-[#D4AF37]"
          size={size}
        />
      ))}
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="text-neutral-300" size={size} />
          <Star
            className="absolute left-0 top-0 fill-[#D4AF37] text-[#D4AF37] overflow-hidden"
            size={size}
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      )}
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="text-neutral-300" size={size} />
      ))}
    </div>
  )
}

