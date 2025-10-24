export interface User {
  id: string
  email: string
  name?: string
  image?: string
  provider?: string
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  name: string
  description: string
  category: Category
  categoryId: string
  address: string
  city: string
  state: string
  zipCode: string
  phone?: string
  email?: string
  website?: string
  latitude?: number
  longitude?: number
  openingHours?: OpeningHours
  priceRange?: PriceRange
  isVerified: boolean
  isActive: boolean
  owner?: User
  ownerId?: string
  createdAt: Date
  updatedAt: Date
  reviews: Review[]
  images: ServiceImage[]
  favorites: Favorite[]
  averageRating?: number
  reviewCount?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  rating: number
  title?: string
  content: string
  user: User
  userId: string
  service: Service
  serviceId: string
  isVerified: boolean
  isHidden: boolean
  helpfulCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ServiceImage {
  id: string
  url: string
  alt?: string
  order: number
  serviceId: string
  createdAt: Date
}

export interface Favorite {
  id: string
  user: User
  userId: string
  service: Service
  serviceId: string
  createdAt: Date
}

export type PriceRange = '$' | '$$' | '$$$' | '$$$$'

export interface OpeningHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  open?: string // "09:00"
  close?: string // "17:00"
  closed?: boolean
}

export interface SearchFilters {
  query?: string
  location?: string
  category?: string[]
  rating?: number
  priceRange?: PriceRange[]
  distance?: number
  openNow?: boolean
}

export interface SearchResult {
  services: Service[]
  total: number
  page: number
  limit: number
  filters: SearchFilters
}