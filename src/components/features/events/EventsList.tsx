'use client'

import { useState } from 'react'
import { type EventData } from '@/types'
import { EventCard } from './EventCard'

type FilterType = 'ALL' | 'UPCOMING EVENTS' | 'TASTING EVENTS' | 'MUSIC FEST' | 'SPECIAL EVENTS'

type EventsListProps = {
  events: EventData[]
}

export function EventsList({ events }: EventsListProps) {
  const [activeTab, setActiveTab] = useState<FilterType>('ALL')

  // Filter events based on active tab (client-side filtering)
  const filteredEvents =
    activeTab === 'ALL'
      ? events
      : activeTab === 'UPCOMING EVENTS'
        ? events.filter((event) => {
            // Filter for future events only using eventDatetime if available
            if (event.eventDatetime) {
              return new Date(event.eventDatetime) >= new Date()
            }
            // Fallback: try to parse the formatted date
            const datePart = event.date.split(' | ')[0]
            const eventDate = new Date(datePart)
            return !isNaN(eventDate.getTime()) && eventDate >= new Date()
          })
        : activeTab === 'TASTING EVENTS'
          ? events.filter((event) => event.category === 'TASTINGS')
          : activeTab === 'MUSIC FEST'
            ? events.filter((event) => event.category === 'MUSIC')
            : events.filter((event) => event.category === 'OTHER')

  return (
    <>
      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-level-1">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-nowrap overflow-x-auto w-full px-4 justify-start md:justify-center gap-4 md:gap-8 py-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {(['ALL', 'UPCOMING EVENTS', 'TASTING EVENTS', 'MUSIC FEST', 'SPECIAL EVENTS'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTab(filter)}
                className={`font-sans text-sm uppercase tracking-widest font-semibold whitespace-nowrap transition-all duration-300 pb-2 border-b-2 flex-shrink-0 ${
                  activeTab === filter
                    ? 'border-[#D4AF37] text-[#004225]'
                    : 'border-transparent text-[#36454F]/60 hover:text-[#36454F] hover:border-[#36454F]/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-sans text-lg text-[#36454F]/70">
                No events found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

