'use client'

import { StoreLocatorHero } from '@/components/features/store-locator/StoreLocatorHero'
import { GetInTouchSection } from '@/components/features/contact/GetInTouchSection'
import { FAQSection } from '@/components/features/contact/FAQSection'

export default function FindUsPage() {
  return (
    <main className="bg-[#F9F9F7]">
      {/* Hero Section with Store Locator */}
      <section className="pt-20 md:pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <StoreLocatorHero />
        </div>
      </section>

      {/* Get In Touch Section */}
      <GetInTouchSection />

      {/* FAQ Section */}
      <FAQSection />
    </main>
  )
}

