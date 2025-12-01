'use client'

import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useLocationTracker } from '@/hooks/useLocationTracker'
import { products } from '@/lib/data'
import type { Database } from '@/types/database.types'

type Store = Database['public']['Tables']['stores']['Row']

const StoreMap = dynamic(
  () => import('@/components/features/stores/StoreMap').then((mod) => ({ default: mod.StoreMap })),
  {
    ssr: false,
  }
)

// Map categories to representative product slugs
const categoryToProductSlug: Record<string, string> = {
  Rum: 'ponce-de-leon-rum',
  Bourbon: 'florida-bourbon',
  Tequila: 'tikaram-tequila',
  Liqueur: 'paan-liqueur',
}

const productFilters = ['All', 'Rum', 'Bourbon', 'Tequila', 'Liqueur'] as const
type ProductFilter = (typeof productFilters)[number]

type StoreLocatorHeroProps = {
  className?: string
}

export function StoreLocatorHero({ className = '' }: StoreLocatorHeroProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductFilter>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [allStores, setAllStores] = useState<Store[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { zip_code, city } = useLocationTracker()

  // Fetch stores based on selected category
  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true)
      
      try {
        let apiUrl = '/api/stores'
        
        // If a specific category is selected, use the representative product slug
        if (selectedCategory !== 'All') {
          const productSlug = categoryToProductSlug[selectedCategory]
          if (productSlug) {
            apiUrl = `/api/stores?productSlug=${encodeURIComponent(productSlug)}`
          }
        }
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          console.error('Error fetching stores:', response.status)
          return
        }
        
        const data = await response.json()
        
        if (data.stores) {
          setAllStores(data.stores)
        }
      } catch (error) {
        console.error('Error fetching stores:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStores()
  }, [selectedCategory])

  // Auto-populate search query from location tracker
  useEffect(() => {
    if (!searchQuery && (zip_code || city)) {
      if (zip_code) {
        setSearchQuery(zip_code)
      } else if (city) {
        setSearchQuery(city)
      }
    }
  }, [zip_code, city, searchQuery])

  const filteredStores = useMemo(() => {
    if (!searchQuery.trim()) {
      return allStores
    }

    const query = searchQuery.toLowerCase().trim()
    return allStores.filter(
      (store) =>
        store.name.toLowerCase().includes(query) ||
        store.city.toLowerCase().includes(query) ||
        store.zip_code.includes(query)
    )
  }, [searchQuery, allStores])

  const handleGetDirections = (store: Store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`
    window.open(url, '_blank')
  }

  return (
    <div className={`bg-white rounded-[2.5rem] shadow-2xl overflow-hidden ${className}`}>
      {/* Product Type Filters */}
      <div className="bg-[#004225] px-6 md:px-8 py-6 border-b border-[#D4AF37]/20">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {productFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedCategory(filter)}
              className={`font-sans text-sm md:text-base uppercase tracking-widest font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 ${
                selectedCategory === filter
                  ? 'bg-[#D4AF37] text-[#004225] shadow-lg'
                  : 'bg-[#004225] text-[#D4AF37] border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 h-[60vh] min-h-[500px]">
        {/* Left Column - Search & List */}
        <div className="bg-white border-r border-neutral-200 lg:col-span-1 flex flex-col overflow-hidden">
          {/* Search Header */}
          <div className="p-6 border-b border-neutral-200 flex-shrink-0">
            <h2 className="font-serif text-2xl lg:text-3xl text-[#36454F] mb-4">
              Find Your Bottle
            </h2>
            <input
              type="text"
              placeholder="Search by City/Zip"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white border border-neutral-300 text-[#36454F] placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base"
            />
          </div>

          {/* Store List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center text-[#36454F] font-sans">
                <p>Loading stores...</p>
              </div>
            ) : filteredStores.length === 0 ? (
              <div className="p-6 text-center text-[#36454F] font-sans">
                <p>No stores found matching your search.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-sans font-semibold text-lg text-[#36454F] mb-2">
                      {store.name}
                    </h3>
                    <p className="font-sans text-sm text-[#36454F] mb-1">
                      {store.address_line1}
                    </p>
                    <p className="font-sans text-sm text-[#36454F] mb-1">
                      {store.city}, {store.state} {store.zip_code}
                    </p>
                    {store.phone && (
                      <p className="font-sans text-sm text-[#36454F] mb-3">{store.phone}</p>
                    )}
                    <button
                      onClick={() => handleGetDirections(store)}
                      className="font-sans text-sm font-semibold text-[#D4AF37] hover:text-[#B8941F] transition-colors uppercase tracking-wider"
                    >
                      Get Directions
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Map */}
        <div className="hidden lg:flex lg:col-span-2 h-full">
          <div className="w-full h-full">
            {!isLoading && <StoreMap stores={filteredStores} />}
          </div>
        </div>
      </div>
    </div>
  )
}

