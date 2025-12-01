import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function VerificationSuccessPage() {
  // Fixed barcode pattern for consistent visual display
  const barcodePattern = [3, 2, 4, 2, 5, 3, 2, 4, 3, 5, 2, 4, 3, 2, 5, 4, 2, 3, 5, 2, 4, 3, 2, 5, 3, 4, 2, 3, 5, 2, 4, 3, 2, 5, 4, 2, 3, 5, 2, 4]

  return (
    <main className="min-h-screen bg-[#004225] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Digital Coupon Card */}
        <div className="w-full bg-[#F8F8F8] rounded-lg border-2 border-[#D4AF37] p-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)]">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/global/logo-gold.svg"
              alt="Tikaram Spirits"
              width={200}
              height={60}
              className="object-contain"
              priority
            />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[clamp(2rem,3vw,2.5rem)] font-semibold text-[#004225] text-center mb-4">
            Welcome to the Family
          </h1>

          {/* Subhead */}
          <p className="font-sans text-base lg:text-lg text-[#36454F] text-center mb-8">
            Present this barcode at your local retailer.
          </p>

          {/* Barcode Visual */}
          <div className="flex items-center justify-center gap-[2px] mb-6 bg-white p-6 rounded border border-[#EEEEEE]">
            {barcodePattern.map((width, index) => (
              <div
                key={index}
                className="bg-black"
                style={{ width: `${width}px`, height: '60px' }}
              />
            ))}
          </div>

          {/* Code Display */}
          <div className="text-center mb-6">
            <p className="font-mono text-lg lg:text-xl font-semibold text-[#004225] tracking-wider">
              TIKARAM-FIRST-2025
            </p>
          </div>

          {/* Legal Text */}
          <p className="text-xs lg:text-sm text-[#36454F]/70 text-center">
            Must be 21+ to redeem. One use per customer.
          </p>
        </div>

        {/* Find a Store Button */}
        <Link href="/store-locator">
          <Button variant="primary" className="w-full md:w-auto">
            Find a Store
          </Button>
        </Link>
      </div>
    </main>
  )
}
