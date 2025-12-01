import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'

export type Review = {
  id: string
  product_slug: string
  author_name: string
  rating: number
  review_text: string
  status: 'Approved' | 'Pending' | 'Rejected'
  created_at: string
  email?: string | null
}

export type ReviewSubmissionData = {
  productSlug: string
  authorName: string
  rating: number
  reviewText: string
}

/**
 * Fetches all approved reviews for a specific product by slug
 * Server-side function - can be called from server components or API routes
 */
export async function getReviewsByProductSlug(slug: string): Promise<Review[]> {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_slug', slug)
      .eq('status', 'Approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reviews by product slug:', error)
      return []
    }

    return (data || []) as Review[]
  } catch (error) {
    console.error('Exception fetching reviews by product slug:', error)
    return []
  }
}

/**
 * Fetches all approved reviews for a specific product by slug
 * Client-side function - can be called from client components
 */
export async function getReviewsByProductSlugClient(slug: string): Promise<Review[]> {
  try {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_slug', slug)
      .eq('status', 'Approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reviews by product slug (client):', error)
      return []
    }

    return (data || []) as Review[]
  } catch (error) {
    console.error('Exception fetching reviews by product slug (client):', error)
    return []
  }
}

/**
 * Submits a new review to the database
 * Server-side function - can be called from server components or API routes
 * Status defaults to 'Approved' via database default
 */
export async function submitNewReview(data: ReviewSubmissionData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient()
    const { error } = await supabase.from('reviews').insert({
      product_slug: data.productSlug,
      author_name: data.authorName,
      rating: data.rating,
      review_text: data.reviewText,
      // Status will use database default ('Approved')
    })

    if (error) {
      console.error('Error submitting review:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Exception submitting review:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit review'
    return { success: false, error: errorMessage }
  }
}

