'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useLocationTracker } from '@/hooks/useLocationTracker'
import type { Database } from '@/types/database.types'

type Store = Database['public']['Tables']['stores']['Row']

const StoreMap = dynamic(
  () => import('@/components/features/stores/StoreMap').then((mod) => ({ default: mod.StoreMap })),
  {
    ssr: false,
  }
)

type StoreLocatorModalProps = {
  isOpen: boolean
  onClose: () => void
  productSlug: string
}

export function StoreLocatorModal({ isOpen, onClose, productSlug }: StoreLocatorModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [allStores, setAllStores] = useState<Store[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { zip_code, city } = useLocationTracker()

  // Fetch stores filtered by product slug
  useEffect(() => {
    if (!isOpen) return

    const fetchStores = async () => {
      setIsLoading(true)
      const apiUrl = `/api/stores?productSlug=${encodeURIComponent(productSlug)}`
      console.log('[StoreLocatorModal] Fetching stores for productSlug:', productSlug)
      console.log('[StoreLocatorModal] API URL:', apiUrl)
      
      try {
        const response = await fetch(apiUrl)
        console.log('[StoreLocatorModal] Response status:', response.status, response.statusText)
        
        if (!response.ok) {
          console.error('[StoreLocatorModal] Error fetching stores - Response not OK:', response.status)
          return
        }
        
        const data = await response.json()
        console.log('[StoreLocatorModal] Response data:', data)
        
        if (data.stores) {
          console.log('[StoreLocatorModal] Stores fetched successfully. Count:', data.stores.length)
          setAllStores(data.stores)
        } else {
          console.warn('[StoreLocatorModal] Response data does not contain stores property')
        }
      } catch (error) {
        console.error('[StoreLocatorModal] Error fetching stores:', error)
        if (error instanceof Error) {
          console.error('[StoreLocatorModal] Error details:', {
            message: error.message,
            stack: error.stack,
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchStores()
  }, [isOpen, productSlug])

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

  // Reset search query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
    }
  }, [isOpen])

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 h-[90vh] max-h-[90vh] bg-white z-50 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 flex-shrink-0">
              <h2 className="font-serif text-2xl lg:text-3xl text-[#36454F]">Find Your Bottle</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-soft transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-[#36454F]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3">
              {/* Left Column - Search & List */}
              <div className="bg-white border-r border-neutral-200 lg:col-span-1 flex flex-col overflow-hidden">
                {/* Search Header */}
                <div className="p-6 border-b border-neutral-200 flex-shrink-0">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

