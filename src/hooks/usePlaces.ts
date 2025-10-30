import { useState, useEffect, useCallback } from 'react'

export interface PlaceService {
  id: string
  name: string
  address: string
  rating: number
  reviewCount: number
  openNow: boolean
  location: {
    lat: number
    lng: number
  }
  types: string[]
  priceLevel?: number
  photoReference?: string
  category: string
}

interface PlacesResponse {
  services: PlaceService[]
  total: number
  location: string
  category: string
}

export function usePlaces(category: string, location: string = 'Praha, Czech Republic') {
  const [data, setData] = useState<PlacesResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPlaces = useCallback(async () => {
    if (!category) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        category,
        location,
        radius: '15000'
      })

      const response = await fetch(`/api/places?${params}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch places')
      }

      const result: PlacesResponse = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching places:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [category, location])

  useEffect(() => {
    let isMounted = true
    
    const performFetch = async () => {
      if (isMounted) {
        await fetchPlaces()
      }
    }
    
    performFetch()
    
    return () => {
      isMounted = false
    }
  }, [category, location])

  const refetch = useCallback(() => {
    fetchPlaces()
  }, [fetchPlaces])

  return {
    data,
    loading,
    error,
    refetch
  }
}

// Helper function to get Google Photos URL
export function getGooglePhotoUrl(photoReference: string, maxWidth: number = 400): string {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
  if (!photoReference || !API_KEY) {
    return '/services/default-service.svg' // fallback image
  }

  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${API_KEY}`
}

// Helper to calculate distance between two points
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}