import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')
    const location = searchParams.get('location')
    const type = searchParams.get('type') || 'car_repair'

    if (!query && !location) {
      return NextResponse.json(
        { error: 'Query or location is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Places API key not configured' },
        { status: 500 }
      )
    }

    // Build the search query
    let searchQuery = query || ''
    if (location) {
      searchQuery += ` ${location}`
    }

    const placesUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    placesUrl.searchParams.set('query', searchQuery)
    placesUrl.searchParams.set('type', type)
    placesUrl.searchParams.set('key', apiKey)

    const response = await fetch(placesUrl.toString())
    
    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform the data to match our expected format
    const places = data.results?.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      price_level: place.price_level,
      opening_hours: place.opening_hours,
      photos: place.photos,
      geometry: place.geometry,
      types: place.types,
      business_status: place.business_status
    })) || []

    return NextResponse.json({
      places,
      status: data.status,
      next_page_token: data.next_page_token
    })
  } catch (error) {
    console.error('Places search error:', error)
    return NextResponse.json(
      { error: 'Failed to search places' },
      { status: 500 }
    )
  }
}