'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function HeritageSplit() {
  return (
    <section className="relative py-16 lg:py-25 px-4 md:px-8 lg:px-12 bg-[#F8F8F8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Events Card */}
          <Link
            href="/events"
            className="group relative rounded-[2.5rem] overflow-hidden min-h-[400px] lg:min-h-[500px] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Image
              src="/assets/home/home-explore-events.jpg"
              alt="Events"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 z-10">
              <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-white mb-4">
                Events
              </h2>
              <p className="font-sans text-base lg:text-lg text-white/90 mb-6">
                Join us for tastings, launches, and exclusive experiences.
              </p>
              <Button variant="outline" className="w-full md:w-auto">
                View Events
              </Button>
            </div>
          </Link>

          {/* Visit Card */}
          <Link
            href="/store-locator"
            className="group relative rounded-[2.5rem] overflow-hidden min-h-[400px] lg:min-h-[500px] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Image
              src="/assets/home/home-explore-visit.jpg"
              alt="Visit"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 z-10">
              <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-white mb-4">
                Visit
              </h2>
              <p className="font-sans text-base lg:text-lg text-white/90 mb-6">
                Find Tikaram Spirits at a retailer near you.
              </p>
              <Button variant="outline" className="w-full md:w-auto">
                Find a Store
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

