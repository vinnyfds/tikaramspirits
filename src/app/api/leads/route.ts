import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import VerifyEmail from '@/components/emails/VerifyEmail'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // We use the Service Role Key to bypass RLS so we can SELECT the token
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
    
    // Get Data
    const body = await request.json()
    const { email, first_name, zip_code, date_of_birth } = body
    
    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Step A: Database Insert (CRITICAL)
    const { data, error: dbError } = await supabase
      .from('leads')
      .insert({ 
        email, 
        first_name, 
        zip_code,
        date_of_birth,
        coupon_code: 'TIKARAM-FIRST-2025', 
        is_verified: false 
      })
      .select() // <--- Forces return of the new row
      .single()
    
    // Debug Log
    console.log('DB Result:', { data, dbError })
    
    // Error Handling
    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      )
    }
    
    // Validate data exists
    if (!data) {
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      )
    }
    
    // Step B: Send Email
    try {
      const token = data.verification_token
      
      if (!token) {
        console.error('No verification_token found in inserted row')
        return NextResponse.json(
          { error: 'Failed to generate verification token' },
          { status: 500 }
        )
      }
      
      // Construct verification URL
      const url = new URL(request.url)
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? `${url.protocol}//${url.hostname}`
        : 'http://localhost:3000'
      const verificationUrl = `${baseUrl}/api/leads/verify?token=${token}`
      
      await resend.emails.send({
        from: 'welcome@tikaramspirits.com',
        to: email,
        subject: 'Verify your Tikaram Email',
        react: VerifyEmail({ verificationUrl }),
      })
      
      console.log('Verification email sent successfully to:', email)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the request if email fails - lead is already created
      // But log it for debugging
    }
    
    // Final Response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in leads API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
