import { NextRequest, NextResponse } from 'next/server'
import { getReviewsByProductSlug, submitNewReview, type ReviewSubmissionData } from '@/lib/reviews'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      )
    }

    const reviews = await getReviewsByProductSlug(slug)

    return NextResponse.json({ reviews }, { status: 200 })
  } catch (error) {
    console.error('[API /reviews] Error in reviews API route:', error)
    if (error instanceof Error) {
      console.error('[API /reviews] Error details:', {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productSlug, authorName, rating, reviewText } = body

    // Validate required fields
    if (!productSlug || !authorName || !rating || !reviewText) {
      return NextResponse.json(
        { error: 'Missing required fields: productSlug, authorName, rating, reviewText' },
        { status: 400 }
      )
    }

    // Validate rating range
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be a number between 1 and 5' },
        { status: 400 }
      )
    }

    const submissionData: ReviewSubmissionData = {
      productSlug,
      authorName,
      rating,
      reviewText,
    }

    const result = await submitNewReview(submissionData)

    if (result.success) {
      return NextResponse.json({ success: true }, { status: 201 })
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to submit review' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[API /reviews] Error in POST reviews API route:', error)
    if (error instanceof Error) {
      console.error('[API /reviews] Error details:', {
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

