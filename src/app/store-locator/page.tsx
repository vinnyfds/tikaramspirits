'use client'

import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import { useLocationTracker } from '@/hooks/useLocationTracker'
import type { Database } from '@/types/database.types'

type Store = Database['public']['Tables']['stores']['Row']

const StoreMap = dynamic(() => import('@/components/features/stores/StoreMap').then((mod) => ({ default: mod.StoreMap })), {
  ssr: false,
})

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [allStores, setAllStores] = useState<Store[]>([])
  const { zip_code, city } = useLocationTracker()

  useEffect(() => {
    const fetchStores = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('stores').select('*')

      if (error) {
        console.error('Error fetching stores:', error)
        return
      }

      if (data) {
        console.log('Stores data:', data)
        setAllStores(data)
      }
    }

    fetchStores()
  }, [])

  // Auto-populate search query from location tracker
  useEffect(() => {
    if (!searchQuery && (zip_code || city)) {
      // Priority: zip_code is more precise
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
    <main className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Left Column - Search & List */}
        <div className="bg-white border-r border-neutral-200 lg:col-span-1">
          {/* Search Header */}
          <div className="p-6 border-b border-neutral-200">
            <h1 className="font-serif text-2xl lg:text-3xl text-[#36454F] mb-4">
              Find Your Bottle
            </h1>
            <input
              type="text"
              placeholder="Search by City/Zip"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white border border-neutral-300 text-[#36454F] placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all font-sans text-base"
            />
          </div>

          {/* Store List */}
          <div>
            {filteredStores.length === 0 ? (
              <div className="p-6 text-center text-[#36454F] font-sans">
                <p>No stores found matching your search.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className="p-4 border border-neutral-200 rounded hover:shadow-md transition-shadow"
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
                      <p className="font-sans text-sm text-[#36454F] mb-3">
                        {store.phone}
                      </p>
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
        <div className="hidden lg:flex lg:col-span-2 sticky top-24 h-[calc(100vh-6rem)]">
          <div className="w-full h-full">
            <StoreMap stores={filteredStores} />
          </div>
        </div>
      </div>
    </main>
  )
}
