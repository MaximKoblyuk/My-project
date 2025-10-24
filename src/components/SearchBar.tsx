'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, MapPin, ChevronDown, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

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
  'Přerov',
  'Česká Lípa',
  'Uherské Hradiště',
  'Třebíč',
  'Znojmo',
  'Kolín'
]

export function SearchBar() {
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [distance, setDistance] = useState(5)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showDistanceDropdown, setShowDistanceDropdown] = useState(false)
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  
  const locationRef = useRef<HTMLDivElement>(null)
  const distanceRef = useRef<HTMLDivElement>(null)

  const DISTANCE_OPTIONS = [
    { 
      label: language === 'en' ? '+0 km' : '+0 km', 
      value: 0 
    },
    { 
      label: language === 'en' ? 'within 0.5 km' : 'v okolí 0,5 km', 
      value: 0.5 
    },
    { 
      label: language === 'en' ? 'within 1 km' : 'v okolí 1 km', 
      value: 1 
    },
    { 
      label: language === 'en' ? 'within 5 km' : 'v okolí 5 km', 
      value: 5 
    },
    { 
      label: language === 'en' ? 'within 10 km' : 'v okolí 10 km', 
      value: 10 
    },
    { 
      label: language === 'en' ? 'within 25 km' : 'v okolí 25 km', 
      value: 25 
    }
  ]

  useEffect(() => {
    if (location) {
      const filtered = CZECH_CITIES.filter(city => 
        city.toLowerCase().includes(location.toLowerCase())
      )
      setFilteredCities(filtered.slice(0, 8)) // Limit to 8 results
    } else {
      setFilteredCities(CZECH_CITIES.slice(0, 8))
    }
  }, [location])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false)
      }
      if (distanceRef.current && !distanceRef.current.contains(event.target as Node)) {
        setShowDistanceDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', query, 'in', location, 'within', distance, 'km')
  }

  const selectCity = (city: string) => {
    setLocation(city)
    setShowLocationDropdown(false)
  }

  const selectDistance = (distanceValue: number, label: string) => {
    setDistance(distanceValue)
    setShowDistanceDropdown(false)
  }

  const clearLocation = () => {
    setLocation('')
    setShowLocationDropdown(false)
  }

  const getCurrentDistanceLabel = () => {
    const option = DISTANCE_OPTIONS.find(opt => opt.value === distance)
    return option?.label || `v okolí ${distance} km`
  }

  return (
    <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 bg-white rounded-lg p-4 shadow-lg">
        {/* Service Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'en' ? 'What service do you need? (e.g., oil change, car wash)' : 'Jakou službu potřebujete? (např. výměna oleje, mytí auta)'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
        </div>
        
        {/* Location Selector */}
        <div className="flex-1 relative" ref={locationRef}>
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'en' ? 'Enter address' : 'Zadejte adresu'}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                setShowLocationDropdown(true)
              }}
              onFocus={() => setShowLocationDropdown(true)}
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
            {location && (
              <button
                type="button"
                onClick={clearLocation}
                className="absolute right-2 top-2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Location Dropdown */}
          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              <div className="p-2 text-sm font-medium text-black border-b">
                {location ? (language === 'en' ? 'Search nearby' : 'Hledat v okolí') : (language === 'en' ? 'Select city' : 'Vyberte město')}
              </div>
              {filteredCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => selectCity(city)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-black"
                >
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    {city}
                  </div>
                </button>
              ))}
              {location && !CZECH_CITIES.some(city => city.toLowerCase() === location.toLowerCase()) && (
                <button
                  type="button"
                  onClick={() => selectCity(location)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-t text-black"
                >
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="font-medium">{language === 'en' ? `Use "${location}"` : `Použít "${location}"`}</span>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Distance Selector */}
        <div className="relative" ref={distanceRef}>
          <button
            type="button"
            onClick={() => setShowDistanceDropdown(!showDistanceDropdown)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between min-w-[140px]"
          >
            <span className="text-sm text-black">{getCurrentDistanceLabel()}</span>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
          </button>
          
          {/* Distance Dropdown */}
          {showDistanceDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50">
              <div className="p-2 text-sm font-medium text-black border-b">
                {language === 'en' ? 'Not specified' : 'Nezadáno'}
              </div>
              {DISTANCE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectDistance(option.value, option.label)}
                  className={`w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-sm ${
                    distance === option.value ? 'bg-blue-50 text-blue-700' : 'text-black'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md font-semibold transition-colors duration-200 whitespace-nowrap"
        >
          {language === 'en' ? 'Search' : 'Hledat'}
        </button>
      </div>
    </form>
  )
}