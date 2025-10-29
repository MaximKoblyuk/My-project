import { NextRequest, NextResponse } from 'next/server'

// Google Places API types
interface PlaceResult {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  rating?: number
  user_ratings_total?: number
  opening_hours?: {
    open_now: boolean
    weekday_text: string[]
  }
  photos?: Array<{
    photo_reference: string
    height: number
    width: number
  }>
  types: string[]
  business_status: string
  price_level?: number
}

interface GooglePlacesResponse {
  results: PlaceResult[]
  status: string
  next_page_token?: string
}

// Service category mappings for Google Places
const SERVICE_CATEGORIES = {
  'autoopravna': 'car_repair',
  'vymena-oleje': 'car_repair',
  'myti-auta': 'car_wash',
  'pneuservis': 'car_repair',
  'diagnostika': 'car_repair',
  'detailing': 'car_wash',
  'klimatizace': 'car_repair',
  'brzdy': 'car_repair',
  'stk': 'car_inspection',
  'ek': 'car_inspection',
  'odtah': 'car_rental'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const location = searchParams.get('location') || 'Praha, Czech Republic'
  const radius = searchParams.get('radius') || '10000'
  
  if (!category) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 })
  }

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY
  if (!API_KEY) {
    return NextResponse.json({ error: 'Google Places API key not configured' }, { status: 500 })
  }

  try {
    // Map our category to Google Places type
    const googleType = SERVICE_CATEGORIES[category as keyof typeof SERVICE_CATEGORIES] || 'car_repair'
    
    // Build search query
    const query = category === 'stk' ? 'STK technická kontrola' : 
                  category === 'ek' ? 'měření emisí' :
                  category === 'myti-auta' ? 'mytí auta car wash' :
                  category === 'pneuservis' ? 'pneuservis pneumatiky' :
                  category === 'detailing' ? 'auto detailing' :
                  `${category} autoservis`

    // Google Places Nearby Search API
    const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    url.searchParams.append('query', `${query} ${location}`)
    url.searchParams.append('type', googleType)
    url.searchParams.append('radius', radius)
    url.searchParams.append('key', API_KEY)
    url.searchParams.append('language', 'cs')
    url.searchParams.append('region', 'cz')

    console.log('Fetching from Google Places:', url.toString())

    const response = await fetch(url.toString())
    const data: GooglePlacesResponse = await response.json()

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status)
      return NextResponse.json({ error: `Google Places API error: ${data.status}` }, { status: 500 })
    }

    // Transform Google Places results to our format
    const services = data.results
      .filter(place => place.business_status === 'OPERATIONAL')
      .slice(0, 20) // Limit to 20 results
      .map(place => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        rating: place.rating || 0,
        reviewCount: place.user_ratings_total || 0,
        openNow: place.opening_hours?.open_now || false,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        },
        types: place.types,
        priceLevel: place.price_level,
        photoReference: place.photos?.[0]?.photo_reference,
        category: category
      }))

    return NextResponse.json({
      services,
      total: services.length,
      location,
      category
    })

  } catch (error) {
    console.error('Error fetching places:', error)
    return NextResponse.json(
      { error: 'Failed to fetch places data' },
      { status: 500 }
    )
  }
}