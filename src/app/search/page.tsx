'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { AdvancedSearchBar } from '@/components/AdvancedSearchBar'
import { SearchFilters } from '@/components/SearchFilters'
import { FixPointsServices } from '@/components/FixPointsServices'
import { Pagination } from '@/components/Pagination'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePlaces } from '@/hooks/usePlaces'
import { CAR_SERVICES } from '@/data/services'
import { MapPin, Filter, Grid, List, Star, Clock, Zap } from 'lucide-react'

interface SearchFiltersType {
  category: string
  rating: number
  distance: string
  price: string
  openNow: boolean
}

function SearchResults() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  
  // Get search parameters
  const service = searchParams.get('service') || ''
  const category = searchParams.get('category') || ''
  const location = searchParams.get('location') || 'Praha'
  const query = searchParams.get('query') || ''
  
  // States
  const [filters, setFilters] = useState<SearchFiltersType>({
    category: category,
    rating: 0,
    distance: '',
    price: '',
    openNow: false
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Get places data
  const { data, loading, error, refetch } = usePlaces(service || 'autoopravna', location)

  // Get selected service info
  const selectedService = service ? CAR_SERVICES.find(s => s.id === service) : null

  // Filter places based on search criteria and filters
  const places = data?.services || []
  const filteredPlaces = places?.filter((place: any) => {
    // Filter by category if service is selected
    if (selectedService) {
      const serviceCategory = selectedService.category.toLowerCase()
      const placeTypes = place.types?.map((type: string) => type.toLowerCase()) || []
      const placeName = place.displayName?.text?.toLowerCase() || ''
      
      // Check if place matches the service category
      const categoryKeywords = selectedService.keywords?.map(k => k.toLowerCase()) || []
      const matchesCategory = categoryKeywords.some(keyword => 
        placeName.includes(keyword) || 
        placeTypes.some((type: string) => type.includes(keyword))
      )
      
      if (!matchesCategory) return false
    }

    // Filter by query if provided
    if (query) {
      const placeName = place.name?.toLowerCase() || ''
      if (!placeName.includes(query.toLowerCase())) return false
    }

    // Filter by rating
    if (filters.rating > 0) {
      const placeRating = place.rating || 0
      if (placeRating < filters.rating) return false
    }

    return true
  }) || []

  // Sort places
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'reviews':
        return (b.reviewCount || 0) - (a.reviewCount || 0)
      case 'distance':
        return 0
      default: // relevance
        return (b.rating || 0) * (b.reviewCount || 0) - (a.rating || 0) * (a.reviewCount || 0)
    }
  })

  // Pagination logic
  const totalItems = sortedPlaces.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPlaces = sortedPlaces.slice(startIndex, endIndex)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [service, category, location, query, filters, sortBy])

  // Fetch data when search parameters change (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if ((service || location) && (location !== data?.location || service !== data?.category)) {
        refetch()
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [service, location, data?.location, data?.category, refetch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <AdvancedSearchBar />
        </div>

        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'Search Results' : 'Výsledky vyhledávání'}
              </h1>
              {(selectedService || query) && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <span>{language === 'en' ? 'for' : 'pro'}:</span>
                  <span className="font-semibold text-blue-600">
                    {selectedService?.name || query}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-300">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="relevance">
                  {language === 'en' ? 'Relevance' : 'Relevance'}
                </option>
                <option value="rating">
                  {language === 'en' ? 'Rating' : 'Hodnocení'}
                </option>
                <option value="reviews">
                  {language === 'en' ? 'Most Reviews' : 'Nejvíce recenzí'}
                </option>
                <option value="distance">
                  {language === 'en' ? 'Distance' : 'Vzdálenost'}
                </option>
              </select>
            </div>
          </div>

          {/* Location and Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <div>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  <span>{language === 'en' ? 'Searching...' : 'Hledám...'}</span>
                </div>
              ) : (
                <div className="text-right">
                  <span>
                    {totalItems} {language === 'en' ? 'results found' : 'výsledků nalezeno'}
                  </span>
                  {totalPages > 1 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {language === 'en' 
                        ? `Page ${currentPage} of ${totalPages} (${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems})`
                        : `Stránka ${currentPage} z ${totalPages} (${startIndex + 1}-${Math.min(endIndex, totalItems)} z ${totalItems})`
                      }
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-gray-900">
                  {language === 'en' ? 'Filters' : 'Filtry'}
                </h3>
              </div>
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 search-results">
            {loading ? (
              <div className="space-y-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-32 h-24 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="flex gap-4">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'Search Error' : 'Chyba vyhledávání'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'Unable to load search results. Please try again.'
                    : 'Nepodařilo se načíst výsledky vyhledávání. Zkuste to znovu.'
                  }
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {language === 'en' ? 'Retry' : 'Zkusit znovu'}
                </button>
              </div>
            ) : sortedPlaces.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'No services found' : 'Žádné služby nenalezeny'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Try adjusting your search criteria or location'
                    : 'Zkuste upravit kritéria vyhledávání nebo lokalitu'
                  }
                </p>
              </div>
            ) : (
              <div>
                <FixPointsServices 
                  places={paginatedPlaces}
                  viewMode={viewMode}
                  showTitle={false}
                />

                {/* Pagination */}
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => {
                      setCurrentPage(page)
                      // Smooth scroll to top of results
                      document.querySelector('.search-results')?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                      })
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}