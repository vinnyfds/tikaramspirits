import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    // Initialize Admin Client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )
    
    // Update Logic
    const { error } = await supabase
      .from('leads')
      .update({ is_verified: true })
      .eq('verification_token', token)
    
    // Redirect
    if (error) {
      console.error('Error updating verification:', error)
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    // Successful verification - redirect to success page
    return NextResponse.redirect(new URL('/verification-success', request.url))
  } catch (error) {
    console.error('Error in verification API:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}

