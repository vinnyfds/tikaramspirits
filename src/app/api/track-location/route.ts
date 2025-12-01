import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // We use the Service Role Key to bypass RLS
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

    // Fetch geo data from ipapi.co with mock fallback
    let finalData
    try {
      const geoResponse = await fetch('https://ipapi.co/json/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      })
      
      if (!geoResponse.ok) {
        throw new Error('ipapi.co returned non-OK response')
      }

      const data = await geoResponse.json()
      
      // Map the response data
      finalData = {
        city: data.city,
        postal: data.postal,
        region_code: data.region_code,
        country_code: data.country_code,
      }
    } catch (error) {
      console.error('Failed to fetch geo data from ipapi.co, using fallback data:', error)
      // Fallback data (Tampa, FL)
      finalData = {
        city: 'Tampa',
        postal: '33606',
        region_code: 'FL',
        country_code: 'US',
      }
    }

    // Extract path from request URL
    const url = new URL(request.url)
    const path = url.pathname

    // Get User-Agent and determine device type
    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    const deviceType = isMobile ? 'mobile' : 'desktop'

    // Extract required fields from finalData (real or fallback)
    const city = finalData.city || null
    const country = finalData.country_code || null
    const zip_code = finalData.postal || null

    // Insert into traffic_logs table
    const { error: dbError } = await supabase
      .from('traffic_logs')
      .insert({
        city,
        country,
        zip_code,
        path,
        device_type: deviceType,
      })

    // Log error but don't fail the request (graceful degradation)
    if (dbError) {
      console.error('Error inserting into traffic_logs:', dbError)
      // Still return the geo data even if DB insert fails
    }

    // Return zip_code and city for frontend use (always 200 OK)
    return NextResponse.json({
      zip_code: finalData.postal || null,
      city: finalData.city || null,
    })
  } catch (error) {
    console.error('Error in track-location API:', error)
    // Return fallback data even on unexpected errors to prevent frontend breakage
    return NextResponse.json({
      zip_code: '33606',
      city: 'Tampa',
    })
  }
}

