import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`
  }
  return `${(meters / 1000).toFixed(1)} km`
}

export function formatPrice(priceRange: string): string {
  const priceMap = {
    '$': 'Under $50',
    '$$': '$50 - $150', 
    '$$$': '$150 - $300',
    '$$$$': 'Over $300'
  }
  return priceMap[priceRange as keyof typeof priceMap] || 'Price not available'
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.length
}

export function isOpenNow(openingHours: any): boolean {
  if (!openingHours) return false
  
  const now = new Date()
  const currentDay = now.toLocaleDateString('en', { weekday: 'long' }).toLowerCase() // monday, tuesday, etc.
  const currentTime = now.toTimeString().substring(0, 5) // "14:30"
  
  const dayHours = openingHours[currentDay]
  if (!dayHours || dayHours.closed) return false
  
  return currentTime >= dayHours.open && currentTime <= dayHours.close
}