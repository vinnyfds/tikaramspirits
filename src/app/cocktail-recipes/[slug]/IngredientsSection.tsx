'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

type RecipeIngredient = {
  amount: number | null
  unit: string | null
  item: string
}

type IngredientsSectionProps = {
  ingredients: RecipeIngredient[]
  productSlug: string
  instructions: string[]
}

const servingOptions = [
  { label: '1 Serving', multiplier: 1 },
  { label: '2 Servings', multiplier: 2 },
  { label: 'Pitcher (4x)', multiplier: 4 },
]

const productImageMap: Record<string, string> = {
  'ponce-de-leon-rum': '/assets/products/bottle-ponce-rum.jpg',
  'florida-bourbon': '/assets/products/bottle-florida-bourbon.jpg',
  'paan-liqueur': '/assets/products/bottle-paan-liqueur.jpg',
  'tequila': '/assets/products/bottle-tequila.jpg',
  'keylime': '/assets/products/bottle-keylime.jpg',
}

export function IngredientsSection({
  ingredients,
  productSlug,
  instructions,
}: IngredientsSectionProps) {
  const [multiplier, setMultiplier] = useState(1)

  const formatIngredient = (ingredient: RecipeIngredient, mult: number) => {
    if (ingredient.amount === null) {
      return ingredient.item
    }
    const adjustedAmount = ingredient.amount * mult
    const unit = ingredient.unit || ''
    return `${adjustedAmount}${unit ? ` ${unit}` : ''} ${ingredient.item}`
  }

  const bottleImage = productImageMap[productSlug] || '/assets/products/bottle-ponce-rum.jpg'

  return (
    <section className="bg-[#F9F9F7] py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-[#004225] mb-8 text-center">
          Make This Cocktail
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Ingredients */}
            <div className="md:col-span-7">
            <div className="mb-6">
              <label className="font-sans text-sm uppercase tracking-widest font-semibold text-[#36454F] mb-3 block">
                Serving Size
              </label>
              <div className="flex gap-2 flex-wrap">
                {servingOptions.map((option) => (
                  <button
                    key={option.multiplier}
                    onClick={() => setMultiplier(option.multiplier)}
                    className={`px-4 py-2 font-sans text-sm uppercase tracking-widest font-semibold transition-all duration-300 ${
                      multiplier === option.multiplier
                        ? 'bg-[#D4AF37] text-[#004225]'
                        : 'bg-white text-[#36454F] border-2 border-[#36454F]/20 hover:border-[#D4AF37]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="font-serif text-xl font-semibold text-[#004225] mb-4">Ingredients</h3>
              <ul className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="font-sans text-base text-[#36454F] flex items-start gap-2"
                  >
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>{formatIngredient(ingredient, multiplier)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#004225] mb-4">Instructions</h3>
              <ol className="space-y-4">
                {instructions.map((instruction: string, index: number) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] text-white font-serif text-lg font-semibold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <p className="font-sans text-base text-[#36454F] flex-1 text-left">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

            {/* Right: Shop Card */}
            <div className="md:col-span-5 bg-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
            <div className="relative w-32 h-48 mb-6">
              <Image
                src={bottleImage}
                alt="Product bottle"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
            <Link href={`/spirits/${productSlug}`} className="w-full">
              <Button variant="primary" className="w-full">
                Shop This Bottle
              </Button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

