export type Product = {
  slug: string
  name: string
  category?: string
  abv?: string
  tasting_notes?: {
    sweet?: number
    oak?: number
    spice?: number
    fruit?: number
  }
}

export type Store = {
  id: string
  name: string
  address_line1: string
  city: string
  state: string
  zip_code: string
  lat: number
  lng: number
  phone?: string
}

export type Lead = {
  id: string
  email: string
  first_name?: string
  is_verified: boolean
  coupon_code?: string
  created_at: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface EventData {
  id: string
  name: string
  slug: string
  image: string // URL path to event thumbnail
  date: string // Formatted date/time string (e.g., "Dec 15, 2025 | 7:00 PM")
  eventDatetime?: string // ISO datetime string for filtering (optional)
  location: string
  category: 'TASTINGS' | 'MUSIC' | 'OTHER'
  ctaLink: string // RSVP/Booking URL
}

