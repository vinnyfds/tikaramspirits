import { NextRequest, NextResponse } from 'next/server'
import { getStoresByProductSlug, getAllStores } from '@/lib/stores'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const productSlug = searchParams.get('productSlug')

    console.log('[API /stores] Request received with params:', { lat, lng, productSlug })

    let stores

    if (productSlug) {
      console.log('[API /stores] Fetching stores by productSlug:', productSlug)
      stores = await getStoresByProductSlug(productSlug)
      console.log('[API /stores] Stores fetched by productSlug. Count:', stores.length)
      if (stores.length > 0) {
        console.log('[API /stores] Sample store:', stores[0])
      } else {
        console.warn('[API /stores] No stores found for productSlug:', productSlug)
      }
    } else {
      console.log('[API /stores] Fetching all stores')
      stores = await getAllStores()
      console.log('[API /stores] All stores fetched. Count:', stores.length)
    }

    // Store locator logic with geo-params (lat/lng) will be implemented here
    
    return NextResponse.json({ stores }, { status: 200 })
  } catch (error) {
    console.error('[API /stores] Error in stores API route:', error)
    if (error instanceof Error) {
      console.error('[API /stores] Error details:', {
        message: error.message,
        stack: error.stack,
      })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

