import { createClient } from '@/lib/supabase/server'
import type { Store } from '@/types/index'

export type { Store }

// Legacy hardcoded stores data (kept for backward compatibility if needed)
export const stores: Store[] = [
  // Miami stores
  {
    id: 'store-001',
    name: 'Total Wine South Beach',
    address_line1: '1230 Lincoln Road',
    city: 'Miami',
    state: 'FL',
    zip_code: '33139',
    phone: '(305) 555-0123',
    lat: 25.7907,
    lng: -80.1300,
  },
  {
    id: 'store-002',
    name: 'ABC Liquors Brickell',
    address_line1: '801 Brickell Avenue',
    city: 'Miami',
    state: 'FL',
    zip_code: '33131',
    phone: '(305) 555-0456',
    lat: 25.7663,
    lng: -80.1918,
  },
  // Tampa stores
  {
    id: 'store-003',
    name: 'Tampa Fine Spirits',
    address_line1: '1500 West Kennedy Boulevard',
    city: 'Tampa',
    state: 'FL',
    zip_code: '33606',
    phone: '(813) 555-0789',
    lat: 27.9506,
    lng: -82.4572,
  },
  {
    id: 'store-004',
    name: 'Hyde Park Liquors',
    address_line1: '1801 West Swann Avenue',
    city: 'Tampa',
    state: 'FL',
    zip_code: '33606',
    phone: '(813) 555-0321',
    lat: 27.9400,
    lng: -82.4800,
  },
  // Orlando stores
  {
    id: 'store-005',
    name: 'Orlando Premium Spirits',
    address_line1: '4200 Conroy Road',
    city: 'Orlando',
    state: 'FL',
    zip_code: '32839',
    phone: '(407) 555-0654',
    lat: 28.5383,
    lng: -81.3792,
  },
  {
    id: 'store-006',
    name: 'Downtown Orlando Liquors',
    address_line1: '100 East Pine Street',
    city: 'Orlando',
    state: 'FL',
    zip_code: '32801',
    phone: '(407) 555-0987',
    lat: 28.5413,
    lng: -81.3790,
  },
]

/**
 * Fetches all stores from the Supabase database
 */
export async function getAllStores(): Promise<Store[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('stores').select('*')

    if (error) {
      console.error('Error fetching all stores:', error)
      return []
    }

    return (data || []) as Store[]
  } catch (error) {
    console.error('Error fetching all stores:', error)
    return []
  }
}

/**
 * Fetches stores that carry a specific product by product slug
 * Uses a JOIN query on the store_products junction table
 */
export async function getStoresByProductSlug(slug: string): Promise<Store[]> {
  console.log('[getStoresByProductSlug] Querying stores for product slug:', slug)
  
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('store_products')
      .select('stores(*)')
      .eq('product_slug', slug)

    console.log('[getStoresByProductSlug] Supabase query result:', { data, error })

    if (error) {
      console.error('[getStoresByProductSlug] Error fetching stores by product slug:', error)
      console.error('[getStoresByProductSlug] Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      return []
    }

    // The result will be an array of objects like { stores: { ... } }
    // We need to map it to return just the Store objects
    if (!data) {
      console.warn('[getStoresByProductSlug] No data returned from query')
      return []
    }

    console.log('[getStoresByProductSlug] Raw data count:', data.length)
    
    const mappedStores = data
      .map((row) => row.stores)
      .filter((store): store is Store => store !== null) as Store[]
    
    console.log('[getStoresByProductSlug] Mapped stores count:', mappedStores.length)
    
    if (mappedStores.length > 0) {
      console.log('[getStoresByProductSlug] Sample mapped store:', mappedStores[0])
    }

    return mappedStores
  } catch (error) {
    console.error('[getStoresByProductSlug] Exception fetching stores by product slug:', error)
    if (error instanceof Error) {
      console.error('[getStoresByProductSlug] Exception details:', {
        message: error.message,
        stack: error.stack,
      })
    }
    return []
  }
}

