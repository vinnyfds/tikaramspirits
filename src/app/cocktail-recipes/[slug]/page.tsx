import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Gauge, Clock, Citrus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { IngredientsSection } from './IngredientsSection'
import { ShareButton } from './ShareButton'

type Props = {
  params: Promise<{ slug: string }>
}

type RecipeIngredient = {
  amount: number | null
  unit: string | null
  item: string
}

type DatabaseRecipe = {
  slug: string
  name: string
  description: string
  image: string
  ingredients: RecipeIngredient[]
  instructions: string[]
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  prep_time: string
  taste: string
  base_spirit: string
  flavor_notes: string | null
  occasion_note: string | null
  product_slug: string
}

type SimilarRecipe = {
  slug: string
  name: string
  image: string
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  prep_time: string
  taste: string
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: recipe } = await supabase
    .from('recipes')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!recipe) {
    return {
      title: 'Recipe Not Found | Tikaram Spirits',
    }
  }

  const imageUrl = `https://tikaramspirits.com${recipe.image}`

  return {
    title: `${recipe.name} Recipe | Tikaram Spirits`,
    description: recipe.description,
    openGraph: {
      title: `${recipe.name} Recipe | Tikaram Spirits`,
      description: recipe.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${recipe.name} Recipe | Tikaram Spirits`,
      description: recipe.description,
      images: [imageUrl],
    },
  }
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the recipe
  const { data: recipe } = await supabase
    .from('recipes')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!recipe) {
    notFound()
  }

  // Fetch similar recipes
  const { data: similarRecipes } = await supabase
    .from('recipes')
    .select('slug, name, image, difficulty, prep_time, taste')
    .eq('base_spirit', recipe.base_spirit)
    .neq('slug', recipe.slug)
    .limit(3)

  // Format ingredients for JSON-LD
  const formattedIngredients = recipe.ingredients.map((ing: RecipeIngredient) => {
    if (ing.amount === null) {
      return ing.item
    }
    const unit = ing.unit || ''
    return `${ing.amount}${unit ? ` ${unit}` : ''} ${ing.item}`
  })

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    image: `https://tikaramspirits.com${recipe.image}`,
    description: recipe.description,
    author: {
      '@type': 'Organization',
      name: 'Tikaram Spirits',
    },
    recipeIngredient: formattedIngredients,
    recipeInstructions: recipe.instructions.map((step: string) => ({
      '@type': 'HowToStep',
      text: step,
    })),
  }

  return (
    <main className="bg-white min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section - Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 py-12">
        {/* Left: Full-height Image */}
        <div className="relative h-[50vh] lg:h-screen rounded-[2.5rem] overflow-hidden shadow-xl">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right: Content Container */}
        <div className="bg-white flex flex-col justify-center p-8 lg:p-12">
          <div className="flex flex-col gap-6">
            {/* Title */}
            <h1 className="font-serif font-bold tracking-tight uppercase text-[clamp(2.5rem,5vw,4rem)] text-[#8B0000] leading-tight">
              {recipe.name}
            </h1>

            {/* Description */}
            <p className="font-serif italic text-lg text-[#36454F]">
              {recipe.description}
            </p>

            {/* Meta Row */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <Gauge className="w-6 h-6 text-[#8B0000]" />
                <span className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                  {recipe.difficulty}
                </span>
              </div>
              <div className="h-6 w-px bg-[#36454F]/20" />
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#8B0000]" />
                <span className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                  {recipe.prep_time}
                </span>
              </div>
              <div className="h-6 w-px bg-[#36454F]/20" />
              <div className="flex items-center gap-3">
                <Citrus className="w-6 h-6 text-[#8B0000]" />
                <span className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F]">
                  {recipe.taste}
                </span>
              </div>
              <div className="h-6 w-px bg-[#36454F]/20" />
              {/* Social Share */}
              <ShareButton />
            </div>
          </div>
        </div>
      </section>

      {/* Make This Cocktail Section */}
      <IngredientsSection
        ingredients={recipe.ingredients}
        productSlug={recipe.product_slug}
        instructions={recipe.instructions}
      />

      {/* Flavor Notes Section */}
      {recipe.flavor_notes && (
        <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#F9F9F7]">
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-6" />
              <h2 className="font-serif text-xl font-semibold text-[#B7410E] uppercase mb-4 tracking-wider">
                Flavor Notes
              </h2>
              <p className="font-sans text-base text-[#36454F] leading-relaxed">
                {recipe.flavor_notes}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Why It's Perfect Section */}
      {recipe.occasion_note && (
        <section className="bg-[#F9F9F7]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Left: Text */}
              <div className="bg-white flex flex-col justify-center p-12 md:p-16">
                <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-[#004225] mb-6">
                  Why {recipe.name} is Perfect...
                </h2>
                <p className="font-sans text-base text-[#36454F] leading-relaxed">
                  {recipe.occasion_note}
                </p>
              </div>

              {/* Right: Image */}
              <div className="relative min-h-[400px] h-full w-full">
                <Image
                  src="/assets/cocktails/recipe-lifestyle-party.jpg"
                  alt="Lifestyle party"
                  fill
                  className="object-cover h-full w-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Similar Cocktails Section */}
      {similarRecipes && similarRecipes.length > 0 && (
        <section className="py-16 px-4 md:px-8 lg:px-12 bg-[#F9F9F7]">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-[#004225] mb-8 text-center">
              Similar Cocktails
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarRecipes.map((similarRecipe: SimilarRecipe) => (
                <Link
                  key={similarRecipe.slug}
                  href={`/cocktail-recipes/${similarRecipe.slug}`}
                  className="group bg-white rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={similarRecipe.image}
                      alt={similarRecipe.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="font-serif text-xl font-bold uppercase text-[#004225]">
                      {similarRecipe.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex flex-col items-center gap-1">
                        <Gauge className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-sans text-xs text-neutral-600">
                          {similarRecipe.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-sans text-xs text-neutral-600">
                          {similarRecipe.prep_time}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Citrus className="w-4 h-4 text-[#D4AF37]" />
                        <span className="font-sans text-xs text-neutral-600">
                          {similarRecipe.taste}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
