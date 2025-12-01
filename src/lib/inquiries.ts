import { createClient } from '@/lib/supabase/client'

export type InquiryFormData = {
  name: string
  email: string
  inquiryType: string
  message: string
}

export type InquirySubmissionResult = {
  success: boolean
  error?: string
}

export async function submitInquiry(data: InquiryFormData): Promise<InquirySubmissionResult> {
  try {
    const supabase = createClient()

    // Map camelCase form fields to snake_case database schema
    const { error } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        inquiry_type: data.inquiryType,
        message: data.message,
      })

    if (error) {
      console.error('Error submitting inquiry:', error)
      
      // Handle specific error cases
      if (error.code === '23505') {
        return {
          success: false,
          error: 'An inquiry with this information already exists.',
        }
      }

      return {
        success: false,
        error: error.message || 'Failed to submit inquiry. Please try again.',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Unexpected error submitting inquiry:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    }
  }
}

