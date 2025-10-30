'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Search, MapPin, ChevronDown, X, Wrench, Filter, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { searchServices, CAR_SERVICES } from '@/data/services'
import { useRouter } from 'next/navigation'

const CZECH_CITIES = [
  'Praha',
  'Brno', 
  'Ostrava',
  'Plzeň',
  'Liberec',
  'Olomouc',
  'Ústí nad Labem',
  'České Budějovice',
  'Hradec Králové',
  'Pardubice',
  'Zlín',
  'Havířov',
  'Kladno',
  'Most',
  'Opava',
  'Frýdek-Místek',
  'Karviná',
  'Jihlava',
  'Teplice',
  'Děčín',
  'Karlovy Vary',
  'Jablonec nad Nisou',
  'Mladá Boleslav',
  'Prostějov',
  'Přerov'
]

export function AdvancedSearchBar() {
  const { language } = useLanguage()
  const router = useRouter()
  
  // States
  const [serviceQuery, setServiceQuery] = useState('')
  const [selectedService, setSelectedService] = useState<any>(null)
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showServiceDropdown, setShowServiceDropdown] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Refs
  const serviceInputRef = useRef<HTMLInputElement>(null)
  const locationInputRef = useRef<HTMLInputElement>(null)
  const serviceDropdownRef = useRef<HTMLDivElement>(null)
  const locationDropdownRef = useRef<HTMLDivElement>(null)

  // Service suggestions (memoized to prevent unnecessary recalculation)
  const serviceSuggestions = useMemo(() => 
    searchServices(serviceQuery).slice(0, 8), 
    [serviceQuery]
  )

  // Location suggestions (memoized to prevent unnecessary recalculation)
  const locationSuggestions = useMemo(() => 
    CZECH_CITIES
      .filter(city => 
        city.toLowerCase().includes(locationQuery.toLowerCase())
      )
      .slice(0, 6),
    [locationQuery]
  )

  // Handle service selection
  const handleServiceSelect = (service: any) => {
    setSelectedService(service)
    setServiceQuery(service.name)
    setShowServiceDropdown(false)
  }

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
    setLocationQuery(location)
    setShowLocationDropdown(false)
  }

  // Handle key down events  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Handle search
  const handleSearch = async () => {
    if (!selectedService && !serviceQuery) {
      serviceInputRef.current?.focus()
      return
    }

    setIsSearching(true)
    
    // Construct search URL with parameters
    const params = new URLSearchParams()
    
    if (selectedService) {
      params.set('service', selectedService.id)
      params.set('category', selectedService.category)
    } else if (serviceQuery) {
      params.set('query', serviceQuery)
    }
    
    if (selectedLocation) {
      params.set('location', selectedLocation)
    } else if (locationQuery) {
      params.set('location', locationQuery)
    } else {
      params.set('location', 'Praha')
    }

    // Navigate to search results
    router.push(`/search?${params.toString()}`)
    
    setTimeout(() => setIsSearching(false), 1000)
  }

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setShowServiceDropdown(false)
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Service Search */}
          <div className="flex-1 relative" ref={serviceDropdownRef}>
            <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200">
              <Wrench className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {language === 'en' ? 'Service Type' : 'Typ služby'}
                </label>
                <input
                  ref={serviceInputRef}
                  type="text"
                  placeholder={language === 'en' ? 'e.g., Auto repair, Oil change...' : 'např. Autoopravna, Výměna oleje...'}
                  value={serviceQuery}
                  onChange={(e) => {
                    setServiceQuery(e.target.value)
                    setSelectedService(null)
                    setShowServiceDropdown(true)
                  }}
                  onFocus={() => setShowServiceDropdown(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full text-lg font-medium text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
                />
              </div>
              {selectedService && (
                <button
                  onClick={() => {
                    setSelectedService(null)
                    setServiceQuery('')
                    serviceInputRef.current?.focus()
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Service Dropdown */}
            {showServiceDropdown && serviceSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                <div className="py-2 max-h-64 overflow-y-auto">
                  {serviceSuggestions.map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{service.name}</div>
                        <div className="text-sm text-gray-500">{service.category}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Location Search */}
          <div className="flex-1 relative" ref={locationDropdownRef}>
            <div className="flex items-center p-4 border-b md:border-b-0 border-gray-200">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {language === 'en' ? 'Location' : 'Lokalita'}
                </label>
                <input
                  ref={locationInputRef}
                  type="text"
                  placeholder={language === 'en' ? 'Prague, Brno, Ostrava...' : 'Praha, Brno, Ostrava...'}
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value)
                    setSelectedLocation('')
                    setShowLocationDropdown(true)
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full text-lg font-medium text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
                />
              </div>
              {selectedLocation && (
                <button
                  onClick={() => {
                    setSelectedLocation('')
                    setLocationQuery('')
                    locationInputRef.current?.focus()
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Dropdown */}
            {showLocationDropdown && locationSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
                <div className="py-2 max-h-64 overflow-y-auto">
                  {locationSuggestions.map((city, index) => (
                    <button
                      key={city}
                      onClick={() => handleLocationSelect(city)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between group"
                    >
                      <div className="font-medium text-gray-900">{city}</div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="md:w-auto">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full md:w-auto h-full px-8 py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <Search className={`w-5 h-5 ${isSearching ? 'animate-pulse' : ''}`} />
              <span className="hidden md:inline">
                {isSearching 
                  ? (language === 'en' ? 'Searching...' : 'Hledám...')
                  : (language === 'en' ? 'Search' : 'Hledat')
                }
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 mr-2">
          {language === 'en' ? 'Popular:' : 'Oblíbené:'}
        </span>
        {[
          { id: 'autoopravna', name: language === 'en' ? 'Auto Repair' : 'Autoopravna' },
          { id: 'myti-auta', name: language === 'en' ? 'Car Wash' : 'Mytí auta' },
          { id: 'pneuservis', name: language === 'en' ? 'Tires' : 'Pneumatiky' },
          { id: 'stk', name: 'STK' }
        ].map((service) => (
          <button
            key={service.id}
            onClick={() => {
              const selectedServiceObj = CAR_SERVICES.find(s => s.id === service.id)
              if (selectedServiceObj) {
                handleServiceSelect(selectedServiceObj)
              }
            }}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {service.name}
          </button>
        ))}
      </div>
    </div>
  )
}