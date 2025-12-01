import { StarRating } from '@/components/ui/StarRating'

type TestimonialCardProps = {
  rating: number
  quote: string
  author: string
}

export function TestimonialCard({ rating, quote, author }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-level-1">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-sans text-base font-semibold text-[#36454F]">
          {author}
        </span>
        <StarRating rating={rating} size={16} />
      </div>
      <p className="font-sans text-sm text-[#36454F]/80 leading-relaxed">
        {quote}
      </p>
    </div>
  )
}

