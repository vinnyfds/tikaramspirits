'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Gauge, Clock, Citrus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { recipes, type Recipe } from '@/lib/recipes'

// Get 3 curated recipes
const curatedRecipes = recipes.filter(
  (recipe) =>
    recipe.slug === 'rum-punch' ||
    recipe.slug === 'bourbon-sour' ||
    recipe.slug === 'paan-martini'
)

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/cocktail-recipes/${recipe.slug}`}
      className="group bg-white rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
    >
      {/* Top Section: Text Content */}
      <div className="p-6 text-center flex flex-col gap-4">
        {/* Category Badge */}
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
          {recipe.category}
        </span>

        {/* Title */}
        <h3 className="font-serif text-xl lg:text-2xl font-bold uppercase text-[#004225]">
          {recipe.name}
        </h3>

        {/* Meta Grid */}
        <div className="grid grid-cols-3 gap-4 mt-2">
          {/* Difficulty */}
          <div className="flex flex-col items-center gap-1">
            <Gauge className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-sans text-xs text-neutral-600">{recipe.difficulty}</span>
          </div>

          {/* Prep Time */}
          <div className="flex flex-col items-center gap-1">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-sans text-xs text-neutral-600">{recipe.prepTime}</span>
          </div>

          {/* Taste */}
          <div className="flex flex-col items-center gap-1">
            <Citrus className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-sans text-xs text-neutral-600">{recipe.taste}</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover Overlay with SEE RECIPE text */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <span className="font-sans text-sm uppercase tracking-widest font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            SEE RECIPE &gt;
          </span>
        </div>
      </div>
    </Link>
  )
}

export function MixologySection() {
  return (
    <section className="relative py-16 lg:py-25 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
        <div className="text-center">
          <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-[#36454F] mb-4">
            Master the Pour.
          </h2>
          <p className="font-sans text-base lg:text-lg text-[#36454F]/70 max-w-2xl mx-auto">
            From classic serves to modern twists, explore how we drink Tikaram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {curatedRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/cocktail-recipes">
            <Button variant="primary">
              View All Recipes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
