import { HeroSection } from '@/components/features/home/hero-section'
import { ProductScrollShowcase } from '@/components/features/home/product-scroll-showcase'
import { MixologySection } from '@/components/features/home/mixology-section'
import { HeritageSplit } from '@/components/features/home/heritage-split'
import { SignupBanner } from '@/components/features/home/signup-banner'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProductScrollShowcase />
      <MixologySection />
      <HeritageSplit />
      <SignupBanner />
    </main>
  )
}

