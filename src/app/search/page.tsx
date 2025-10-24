'use client'

import { useState, useEffect } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { Header } from '@/components/Header'
import { ServiceCard } from '@/components/ServiceCard'
import { SearchFilters } from '@/components/SearchFilters'
import { Map, List, Filter } from 'lucide-react'

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Mock data - replace with actual API call
  const mockServices = [
    {
      id: 1,
      name: 'Premium Auto Care',
      category: 'Auto Repair',
      rating: 4.8,
      reviewCount: 127,
      address: '123 Main St, City, ST 12345',
      distance: '2.1 miles',
      image: '/api/placeholder/300/200',
      openNow: true,
      priceRange: '$$',
      description: 'Full-service auto repair with certified mechanics'
    },
    {
      id: 2,
      name: 'Quick Lube Express',
      category: 'Oil Change',
      rating: 4.6,
      reviewCount: 89,
      address: '456 Oak Ave, City, ST 12345',
      distance: '1.8 miles',
      image: '/api/placeholder/300/200',
      openNow: true,
      priceRange: '$',
      description: 'Fast and reliable oil change service'
    },
    // Add more mock services as needed
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setServices(mockServices)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <SearchBar />
          
          {/* Search Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  showFilters 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'border-gray-300 text-gray-700'
                } hover:bg-gray-50`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <div className="text-sm text-gray-600">
                {services.length} services found
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded ${
                  viewMode === 'map' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <SearchFilters />
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-1">
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Searching for services...</p>
                  </div>
                ) : services.length > 0 ? (
                  services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No services found. Try adjusting your search criteria.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map view would be implemented here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}