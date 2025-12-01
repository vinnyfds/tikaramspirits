import Link from 'next/link'
import Image from 'next/image'

const timelineMilestones = [
  {
    year: '1985',
    title: 'The Rediscovery',
    description: 'A new generation rediscovers the craft, bringing innovation to tradition.',
  },
  {
    year: '2023',
    title: 'The Initiation',
    description: 'Ms. Vidita Ramcharran founded Tikaram Spirits with the goal of creating authentic, exceptional spirits rooted in Florida heritage.',
  },
]

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="relative h-[60vh] min-h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Background Image */}
            <Image
              src="https://tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com/assets/home/hero-story-landscape.jpg"
              alt="Tikaram Spirits Story"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-tikaram-pure-white mb-6 leading-tight">
                A Story Rooted in Florida.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Large Serif Text Block */}
            <div className="flex flex-col gap-6">
              <p className="font-serif text-[clamp(1.125rem,2vw,1.5rem)] lg:text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold text-[#36454F] leading-relaxed">
                Behind every bottle of Tikaram Spirits stands a visionary: Ms. Vidita Ramcharran. With unwavering dedication and an entrepreneurial spirit that defies convention, she envisioned a brand where tradition meets innovation, where quality is never compromised, and where the craft of distilling becomes an art form. Her commitment to breaking industry norms and honoring Florida's rich heritage found its perfect partner in Fat Dog Spirits—a collaboration that transformed her dream into reality. Together, they've created something extraordinary: spirits that tell a story, spirits that honor the past while boldly stepping into the future.
              </p>
            </div>

            {/* Right Column - Stacked Image Collage */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-[4/5] bg-tikaram-deep-forest">
                {/* Placeholder - will be replaced with founders.jpg when available */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-tikaram-gold/30" />

            {/* Timeline Items */}
            <div className="flex flex-col gap-16 lg:gap-24">
              {timelineMilestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start gap-8">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-tikaram-gold border-4 border-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                      <span className="font-serif text-3xl lg:text-4xl font-semibold text-tikaram-gold">
                        {milestone.year}
                      </span>
                      <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#36454F]">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="font-sans text-base lg:text-lg text-[#36454F]/80 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Cards Section */}
      <section className="py-16 lg:py-32 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Card - Explore our Spirits */}
            <Link
              href="/spirits"
              className="group relative w-full aspect-[4/3] overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-level-3"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com/assets/story/card-explore-spirits.jpg"
                  alt="Explore our Spirits"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-tikaram-pure-white mb-4">
                  Explore our Spirits
                </h2>
                <p className="font-sans text-base lg:text-lg text-tikaram-cream/90 max-w-md">
                  Discover our hand-crafted collection of rum, bourbon, tequila, and liqueurs.
                </p>
              </div>
            </Link>

            {/* Right Card - Discover Our Retailers */}
            <Link
              href="/find-us"
              className="group relative w-full aspect-[4/3] overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-level-3"
            >
              <div className="absolute inset-0">
                <Image
                  src="https://tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com/assets/story/card-find-retailers.jpg"
                  alt="Discover Our Retailers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-tikaram-pure-white mb-4">
                  Discover Our Retailers
                </h2>
                <p className="font-sans text-base lg:text-lg text-tikaram-cream/90 max-w-md">
                  Find Tikaram Spirits at a retailer near you and bring the spirit of Florida home.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
