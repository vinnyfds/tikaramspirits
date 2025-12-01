import Image from 'next/image'
import { type EventData } from '@/types'

type EventCardProps = {
  event: EventData
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="group bg-white flex flex-col overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-level-2 rounded-soft h-[450px]">
      {/* Image on top - Fixed height portion */}
      <div className="relative w-full h-[200px] bg-[#004225] overflow-hidden flex-shrink-0">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content below - Flexible but constrained */}
      <div className="p-6 flex flex-col gap-3 flex-1 min-h-0">
        {/* Date (Gold) */}
        <span className="font-sans text-sm uppercase tracking-widest text-[#D4AF37] flex-shrink-0">
          {event.date}
        </span>

        {/* Name (Serif) - Optimized to fit on one line, max 2 lines with truncation */}
        {/* Using smaller base size (text-lg) to encourage single-line display */}
        <h3 className="font-serif text-lg lg:text-xl font-semibold text-[#36454F] line-clamp-2 flex-shrink-0 leading-tight">
          {event.name}
        </h3>

        {/* Location - Single line truncate */}
        <p className="font-sans text-sm text-[#36454F]/70 truncate flex-shrink-0">
          {event.location}
        </p>

        {/* Spacer to push button to bottom */}
        <div className="flex-1" />

        {/* RSVP/Book Tickets button - Fixed at bottom */}
        <div className="pt-2 flex-shrink-0">
          <a
            href={event.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-sans text-sm uppercase tracking-widest font-semibold px-6 py-3 rounded transition-all duration-300 w-full bg-transparent text-[#004225] border-2 border-[#004225] hover:bg-[#004225] hover:text-[#D4AF37] hover:translate-y-[-2px] hover:shadow-level-2 active:scale-95 text-center"
          >
            RSVP
          </a>
        </div>
      </div>
    </div>
  )
}

