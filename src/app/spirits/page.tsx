'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts, type Product } from '@/lib/data'
import { getRecipesByProductCategory, type Recipe } from '@/lib/recipes'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SpiritsPage() {
  const allProducts = getAllProducts()

  return (
    <main className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="relative h-[60vh] w-full md:h-[60vh] md:min-h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Mobile Image */}
            <Image
              src="/assets/products/collection-hero-paan-mobile.jpg"
              alt="The Spirit of Innovation"
              fill
              className="object-cover object-center md:hidden"
              priority
              sizes="100vw"
            />
            {/* Desktop Image */}
            <Image
              src="/assets/products/collection-hero-paan.jpg"
              alt="The Spirit of Innovation"
              fill
              className="hidden md:block object-cover object-left"
              priority
              sizes="100vw"
            />
            {/* Gradient Overlay - Stronger at bottom for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 md:bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#D4AF37] text-center drop-shadow-lg">
                The Spirit of Innovation
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Subheading */}
      <section className="px-4 md:px-8 lg:px-12 bg-white pb-4">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#36454F] text-left">
            Our collection
          </h2>
        </div>
      </section>

      {/* Staggered Grid */}
      <section className="pt-8 pb-24 px-4 md:px-8 lg:px-12 bg-white overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto">
          {allProducts.map((product, index) => {
            const isEven = index % 2 === 0
            const relatedRecipes = getRecipesByProductCategory(product.category).slice(0, 3)

            return (
              <div
                key={product.slug}
                className={`flex flex-col gap-8 mb-24 last:mb-0 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Product Card - 70% width */}
                <div className="w-full lg:w-[70%] order-1 lg:order-none">
                  <ProductCard product={product} />
                </div>

                {/* Recipe Teaser Card - 30% width */}
                <div className="w-full lg:w-[30%] order-2 lg:order-none">
                  <RecipeTeaserCard product={product} recipes={relatedRecipes} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Section 1: The Story Split (Heritage) */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-[#F9F9F7]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center">
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#B7410E] mb-4">
                A STORY AS OLD AS FLORIDA
              </p>
              <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-[#36454F] mb-6">
                Seven Generations of Craft
              </h2>
              <p className="font-sans text-base lg:text-lg text-[#36454F]/80 leading-relaxed mb-8">
                From the cane fields to the coast, our spirit is distilled from the history of the land itself...
              </p>
              <Link href="/about">
                <Button variant="primary" className="w-full md:w-auto">
                  READ OUR STORY
                </Button>
              </Link>
            </div>

            {/* Right Column - Image */}
            <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden">
              <Image
                src="/assets/spirits-story-barrel.jpeg"
                alt="Seven Generations of Craft"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Join Team Tikaram Banner */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden min-h-[400px] flex items-center">
            {/* Background Image */}
            <Image
              src="/assets/spirits-join-team-bg.jpg"
              alt="Join Team Tikaram"
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            
            {/* Content Grid */}
            <div className="relative z-10 w-full px-8 lg:px-16 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Side - Text */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-white">
                    JOIN TEAM TIKARAM
                  </h2>
                  <p className="font-sans text-base lg:text-lg text-white/90">
                    Unlock exclusive access, limited releases, and a welcome gift.
                  </p>
                </div>

                {/* Right Side - Email Form */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <NewsletterFormSimple />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Product Card Component (70% width) - Magazine Style
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-[#F9F9F7] rounded-[2.5rem] overflow-hidden shadow-level-2 hover:shadow-level-3 transition-all duration-300">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Side - Text Content */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-[#36454F] mb-4">
            {product.headline}
          </h2>

          {/* ABV/Proof Badges */}
          <div className="flex gap-3 mb-4">
            {product.subhead && (
              <span className="font-sans text-xs uppercase tracking-widest text-[#36454F]/70 bg-white/50 px-3 py-1 rounded">
                {product.subhead}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="font-serif italic text-base lg:text-lg text-[#36454F]/80 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Price */}
          <div className="mb-6">
            <span className="font-serif text-3xl lg:text-4xl font-semibold text-[#D4AF37]">
              {product.price}
            </span>
          </div>

          {/* Learn More Button */}
          <Link href={`/spirits/${product.slug}`}>
            <Button variant="primary" className="w-full md:w-auto">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Right Side - Bottle Image */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-[500px] bg-[#F9F9F7]">
          <Image
            src={product.image}
            alt={product.headline}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 35vw"
          />
        </div>
      </div>
    </div>
  )
}

// Recipe Teaser Card Component (30% width)
function RecipeTeaserCard({
  product,
  recipes,
}: {
  product: Product
  recipes: Recipe[]
}) {
  // Use capitalized category name for filter (matches cocktail-recipes page filter format)
  const spiritFilter = product.category

  if (recipes.length === 0) {
    return (
      <div className="bg-[#F9F9F7] rounded-[2rem] p-8 flex items-center justify-center min-h-[400px]">
        <p className="font-sans text-sm text-[#36454F]/60 text-center">
          Recipes coming soon
        </p>
      </div>
    )
  }

  return (
    <div className="group bg-[#F9F9F7] rounded-[2rem] overflow-hidden shadow-level-2 hover:shadow-level-3 transition-all duration-300 flex flex-col h-full">
      <div className="p-6 pb-4">
        <h3 className="font-sans text-xs uppercase tracking-widest text-[#36454F]/60 mb-2">
          {product.category} Cocktails
        </h3>
        <Link
          href={`/cocktail-recipes?spirit=${spiritFilter.toLowerCase()}`}
          className="font-serif text-lg font-semibold text-[#36454F] mb-4 block hover:text-[#D4AF37] transition-colors"
        >
          View Recipes
        </Link>
      </div>

      {/* Mobile: Horizontal Carousel */}
      <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/cocktail-recipes/${recipe.slug}`}
            className="relative aspect-[4/3] min-w-[85%] snap-center rounded overflow-hidden group/recipe flex-shrink-0 max-w-full"
          >
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover group-hover/recipe:scale-105 transition-transform duration-700 ease-in-out"
              sizes="85vw"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover/recipe:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <span className="font-sans text-xs uppercase tracking-widest font-semibold text-white opacity-0 group-hover/recipe:opacity-100 transition-opacity duration-300 text-center px-2">
                {recipe.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: Vertical Stack */}
      <div className="hidden lg:flex flex-1 flex-col gap-2 p-6 pt-0">
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/cocktail-recipes/${recipe.slug}`}
            className="relative aspect-[4/3] rounded overflow-hidden group/recipe"
          >
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              className="object-cover group-hover/recipe:scale-105 transition-transform duration-700 ease-in-out"
              sizes="15vw"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover/recipe:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <span className="font-sans text-xs uppercase tracking-widest font-semibold text-white opacity-0 group-hover/recipe:opacity-100 transition-opacity duration-300 text-center px-2">
                {recipe.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* View Recipes Footer */}
      <div className="p-6 pt-4 border-t border-[#36454F]/10">
        <Link
          href={`/cocktail-recipes?spirit=${spiritFilter.toLowerCase()}`}
          className="font-sans text-xs uppercase tracking-widest text-[#D4AF37] hover:text-[#B8941F] transition-colors block"
        >
          View All Recipes →
        </Link>
      </div>
    </div>
  )
}

// Simple Newsletter Form Component for Join Team Tikaram Banner
function NewsletterFormSimple() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !validateEmail(email)) {
      setStatus('error')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')

    try {
      const dob = localStorage.getItem('tikaram_user_dob')
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter',
          date_of_birth: dob,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setStatus('idle')
            }}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/80 focus:ring-white/50"
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          disabled={isSubmitting}
          className="w-full sm:w-auto whitespace-nowrap !text-white"
        >
          {isSubmitting ? 'Joining...' : 'Join'}
        </Button>
      </form>
      {status === 'success' && (
        <p className="mt-2 text-sm text-white/90 font-sans">
          Check your email to verify!
        </p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-white/80 font-sans">
          Please enter a valid email
        </p>
      )}
    </div>
  )
}
