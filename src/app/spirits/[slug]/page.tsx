import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/data'
import { getRecipesByProductCategory } from '@/lib/recipes'
import { getReviewsByProductSlug } from '@/lib/reviews'
import ProductStoryScroll from '@/components/features/spirits/product-story-scroll'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Fetch recipes for this product category
  const recipes = getRecipesByProductCategory(product.category)
  const cocktails = recipes.slice(0, 5).map((recipe) => ({
    name: recipe.name,
    slug: recipe.slug,
    image: recipe.image,
  }))

  // Fetch approved reviews for this product
  const reviews = await getReviewsByProductSlug(product.slug)
  
  // Debug logging
  console.log('[Product Page] Product slug:', product.slug)
  console.log('[Product Page] Reviews fetched:', reviews)
  console.log('[Product Page] Reviews count:', reviews.length)
  if (reviews.length > 0) {
    console.log('[Product Page] First review sample:', reviews[0])
  }

  return (
    <main className="bg-white">
      <ProductStoryScroll
        product={{
          slug: product.slug,
          headline: product.headline,
          subhead: product.subhead,
          description: product.description,
          price: product.price,
          image: product.image,
          imagePng: product.imagePng,
          tastingNotes: product.tastingNotes,
          process: product.process,
          ingredients: product.ingredients,
        }}
        cocktails={cocktails}
        reviews={reviews}
      />
    </main>
  )
}
