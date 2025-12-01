import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { type EventData } from '@/types'

/**
 * Formats a datetime string or Date object into the display format
 * @param datetime - ISO datetime string or Date object
 * @returns Formatted date string like "Dec 15, 2025 | 7:00 PM"
 */
function formatEventDate(datetime: string | Date): string {
  const date = typeof datetime === 'string' ? new Date(datetime) : datetime

  // Format date part
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
  const dateStr = date.toLocaleDateString('en-US', dateOptions)

  // Format time part
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }
  const timeStr = date.toLocaleTimeString('en-US', timeOptions)

  return `${dateStr} | ${timeStr}`
}

/**
 * Maps database event row to EventData interface
 */
function mapEventToEventData(event: any): EventData {
  // CRITICAL CHECK: Log the image URL to verify it starts with https://
  const imageUrl = event.image_url || event.image
  console.log('[Events] Image URL from database:', imageUrl)
  
  return {
    id: event.id,
    name: event.name,
    slug: event.slug,
    image: imageUrl,
    date: formatEventDate(event.event_datetime),
    eventDatetime: event.event_datetime, // Store original ISO datetime for filtering
    location: event.location,
    category: event.category as 'TASTINGS' | 'MUSIC' | 'OTHER',
    ctaLink: event.cta_link || event.ctaLink || '#',
  }
}

/**
 * Fetches all events from the events table, ordered by event_datetime (Server-side)
 */
export async function getAllEvents(): Promise<EventData[]> {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_datetime', { ascending: true })

    if (error) {
      console.error('Error fetching all events:', error)
      return []
    }

    return (data || []).map(mapEventToEventData)
  } catch (error) {
    console.error('Error fetching all events:', error)
    return []
  }
}

/**
 * Fetches events filtered by category (Server-side)
 * @param category - Filter category: 'ALL', 'UPCOMING EVENTS', 'TASTING EVENTS', 'MUSIC FEST', 'SPECIAL EVENTS'
 */
export async function getEventsByCategory(
  category: string
): Promise<EventData[]> {
  try {
    const supabase = await createServerClient()

    // Map filter categories to database category values
    const categoryMap: Record<string, string | null> = {
      ALL: null,
      'UPCOMING EVENTS': null, // Will filter by date instead
      'TASTING EVENTS': 'TASTINGS',
      'MUSIC FEST': 'MUSIC',
      'SPECIAL EVENTS': 'OTHER',
    }

    const dbCategory = categoryMap[category]

    let query = supabase.from('events').select('*')

    if (category === 'UPCOMING EVENTS') {
      // Filter for future events only
      const now = new Date().toISOString()
      query = query.gte('event_datetime', now)
    } else if (dbCategory) {
      // Filter by category
      query = query.eq('category', dbCategory)
    }
    // If category is 'ALL', no filter is applied

    const { data, error } = await query.order('event_datetime', {
      ascending: true,
    })

    if (error) {
      console.error('Error fetching events by category:', error)
      return []
    }

    return (data || []).map(mapEventToEventData)
  } catch (error) {
    console.error('Error fetching events by category:', error)
    return []
  }
}

/**
 * Client-side function to fetch all events (for use in client components)
 */
export async function getAllEventsClient(): Promise<EventData[]> {
  try {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_datetime', { ascending: true })

    if (error) {
      console.error('Error fetching all events:', error)
      return []
    }

    return (data || []).map(mapEventToEventData)
  } catch (error) {
    console.error('Error fetching all events:', error)
    return []
  }
}

/**
 * Client-side function to fetch events filtered by category
 * @param category - Filter category: 'ALL', 'UPCOMING EVENTS', 'TASTING EVENTS', 'MUSIC FEST', 'SPECIAL EVENTS'
 */
export async function getEventsByCategoryClient(
  category: string
): Promise<EventData[]> {
  try {
    const supabase = createBrowserClient()

    // Map filter categories to database category values
    const categoryMap: Record<string, string | null> = {
      ALL: null,
      'UPCOMING EVENTS': null, // Will filter by date instead
      'TASTING EVENTS': 'TASTINGS',
      'MUSIC FEST': 'MUSIC',
      'SPECIAL EVENTS': 'OTHER',
    }

    const dbCategory = categoryMap[category]

    let query = supabase.from('events').select('*')

    if (category === 'UPCOMING EVENTS') {
      // Filter for future events only
      const now = new Date().toISOString()
      query = query.gte('event_datetime', now)
    } else if (dbCategory) {
      // Filter by category
      query = query.eq('category', dbCategory)
    }
    // If category is 'ALL', no filter is applied

    const { data, error } = await query.order('event_datetime', {
      ascending: true,
    })

    if (error) {
      console.error('Error fetching events by category:', error)
      return []
    }

    return (data || []).map(mapEventToEventData)
  } catch (error) {
    console.error('Error fetching events by category:', error)
    return []
  }
}
