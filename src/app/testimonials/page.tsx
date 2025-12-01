import { getAllProducts } from '@/lib/data'
import { getReviewsByProductSlug } from '@/lib/reviews'
import { TestimonialsPageContent } from '@/components/features/testimonials/TestimonialsPageContent'

export default async function TestimonialsPage() {
  // Fetch products server-side
  const products = getAllProducts()
  
  // Fetch initial reviews for the default product (ponce-de-leon-rum)
  const initialReviews = await getReviewsByProductSlug('ponce-de-leon-rum')

  return (
    <main className="bg-white">
      <TestimonialsPageContent products={products} initialReviews={initialReviews} />
    </main>
  )
}

