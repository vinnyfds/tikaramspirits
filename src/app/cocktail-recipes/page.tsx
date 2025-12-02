'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Gauge, Clock, Citrus, ChevronDown } from 'lucide-react'
import { recipes, getRecipesBySpirit, type Recipe } from '@/lib/recipes'

const spiritFilters = ['All', 'Rum', 'Bourbon', 'Tequila', 'Liqueur'] as const
type SpiritFilter = (typeof spiritFilters)[number]

function capitalizeSpirit(spirit: string): string {
  return spirit.charAt(0).toUpperCase() + spirit.slice(1)
}

// Extract unique values for filters
function getUniqueValues<T>(recipes: Recipe[], key: keyof Recipe): T[] {
  const values = new Set(recipes.map((recipe) => recipe[key] as T))
  return Array.from(values).sort()
}

type FilterDropdownProps = {
  label: string
  options: string[]
  value: string | null
  onChange: (value: string | null) => void
}

function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-sans text-[10px] md:text-xs uppercase tracking-widest font-semibold text-[#36454F] hover:text-[#004225] transition-colors whitespace-nowrap"
      >
        <span>{value || label}</span>
        <ChevronDown
          className={`w-3 h-3 md:w-4 md:h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-40 min-w-[200px] max-h-[300px] overflow-y-auto">
            <button
              onClick={() => {
                onChange(null)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                value === null ? 'font-semibold text-[#004225]' : 'text-[#36454F]'
              }`}
            >
              All
            </button>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  value === option ? 'font-semibold text-[#004225]' : 'text-[#36454F]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function CocktailRecipesPage() {
  const searchParams = useSearchParams()
  const spiritParam = searchParams.get('spirit')
  
  // Initialize filter from URL parameter if present
  const initialFilter: SpiritFilter = useMemo(() => {
    if (spiritParam) {
      const capitalized = capitalizeSpirit(spiritParam)
      return spiritFilters.includes(capitalized as SpiritFilter)
        ? (capitalized as SpiritFilter)
        : 'All'
    }
    return 'All'
  }, [spiritParam])

  const [activeFilter, setActiveFilter] = useState<SpiritFilter>(initialFilter)
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null)
  const [filterTaste, setFilterTaste] = useState<string | null>(null)
  const [filterPrep, setFilterPrep] = useState<string | null>(null)

  // Update filter when URL parameter changes
  useEffect(() => {
    if (spiritParam) {
      const capitalized = capitalizeSpirit(spiritParam)
      if (spiritFilters.includes(capitalized as SpiritFilter)) {
        setActiveFilter(capitalized as SpiritFilter)
      }
    }
  }, [spiritParam])

  // Get unique values for filters
  const difficultyOptions = useMemo(
    () => getUniqueValues<'Easy' | 'Medium' | 'Advanced'>(recipes, 'difficulty'),
    []
  )
  const tasteOptions = useMemo(
    () => getUniqueValues<string>(recipes, 'taste'),
    []
  )
  const prepTimeOptions = useMemo(
    () => getUniqueValues<string>(recipes, 'prepTime'),
    []
  )

  // Filter recipes with AND logic
  const filteredRecipes = useMemo(() => {
    let result =
      activeFilter === 'All'
        ? recipes
        : getRecipesBySpirit(activeFilter.toLowerCase())

    if (filterDifficulty) {
      result = result.filter((recipe) => recipe.difficulty === filterDifficulty)
    }

    if (filterTaste) {
      result = result.filter((recipe) => recipe.taste === filterTaste)
    }

    if (filterPrep) {
      result = result.filter((recipe) => recipe.prepTime === filterPrep)
    }

    return result
  }, [activeFilter, filterDifficulty, filterTaste, filterPrep])

  return (
    <main className="bg-[#F9F9F7]">
      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="relative h-[50vh] min-h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
            {/* Background Image */}
            <Image
              src="/assets/cocktails/recipe-hero-banner.webp"
              alt="Master the Pour"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-[#D4AF37] mb-6">
                Master the Pour
              </h1>
              <p className="font-sans text-lg lg:text-xl text-[#FFFDD0]/90 max-w-2xl">
                Elevate your home bar with these signature Tikaram serves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-level-1">
        <div className="max-w-[1400px] mx-auto">
          {/* Row 1: Spirit Tabs */}
          <div className="flex flex-nowrap overflow-x-auto w-full px-4 justify-start md:justify-center gap-4 md:gap-8 py-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {spiritFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-sans text-sm uppercase tracking-widest font-semibold whitespace-nowrap transition-all duration-300 pb-2 border-b-2 flex-shrink-0 ${
                  activeFilter === filter
                    ? 'border-[#D4AF37] text-[#004225]'
                    : 'border-transparent text-[#36454F]/60 hover:text-[#36454F] hover:border-[#36454F]/30'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Row 2: Facet Filters */}
          <div className="border-t border-gray-200 py-4">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 px-4 md:px-8 lg:px-12">
              <span className="hidden md:block font-sans text-sm uppercase tracking-widest font-bold text-[#36454F] whitespace-nowrap">
                FILTER BY
              </span>
              <FilterDropdown
                label="Difficulty Level"
                options={difficultyOptions}
                value={filterDifficulty}
                onChange={setFilterDifficulty}
              />
              <FilterDropdown
                label="Preparation Time"
                options={prepTimeOptions}
                value={filterPrep}
                onChange={setFilterPrep}
              />
              <FilterDropdown
                label="Taste"
                options={tasteOptions}
                value={filterTaste}
                onChange={setFilterTaste}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <section className="py-8 lg:py-12 px-4 md:px-8 lg:px-12 bg-[#F9F9F7]">
        <div className="max-w-[1400px] mx-auto">
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-sans text-lg text-[#36454F]/70">
                No recipes found matching your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

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
