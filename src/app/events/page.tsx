import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { getAllEvents } from '@/lib/events'
import { EventsList } from '@/components/features/events/EventsList'

export default async function EventsPage() {
  // Fetch all events server-side
  const events = await getAllEvents()

  return (
    <main className="bg-white">
      {/* Hero Banner Section */}
      <section className="pt-20 md:pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="relative h-[60vh] min-h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Background Image */}
            <Image
              src="/assets/events/hero-events-night.png"
              alt="Nights at Tikaram"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#D4AF37] leading-tight">
                Nights at Tikaram
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Events List with Filters (Client Component) */}
      <EventsList events={events} />

      {/* Private Events CTA Banner */}
      <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-12 bg-[#004225]">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#D4AF37] mb-6">
            Host your own private tasting.
          </h2>
          <Link href="/contact">
            <Button variant="outline" className="mt-4">
              Inquire Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

