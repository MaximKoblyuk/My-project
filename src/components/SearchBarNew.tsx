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
  'Kolín',
  'Písek',
  'Prachatice',
  'Pelhřimov',
  'Příbram',
  'Poděbrady',
  'Polička',
  'Přelouč',
  'Pacov',
  'Palacký',
  'Přimda',
  'Pavlíkov',
  'Podbořany',
  'Pobežovice',
  'Pečky',
  'Přešťovice',
  'Petřvald',
  'Podivín',
  'Pohořelice',
  'Pustiměř',
  'Bystřice pod Hostýnem',
  'Čáslav',
  'Dvůr Králové nad Labem',
  'Horažďovice',
  'Humpolec',
  'Chrudim',
  'Jindřichův Hradec',
  'Klatovy',
  'Kroměříž',
  'Kutná Hora',
  'Litomerice',
  'Louny',
  'Mělník',
  'Náchod',
  'Nymburk',
  'Nový Jičín',
  'Orlová',
  'Otrokovice',
  'Rakovník',
  'Rychnov nad Kněžnou',
  'Strakonice',
  'Šumperk',
  'Tábor',
  'Trutnov',
  'Turnov',
  'Vsetín',
  'Vyškov',
  'Žďár nad Sázavou'
]

const DISTANCE_OPTIONS = [
  { value: 0, label: '+0 km' },
  { value: 5, label: '+5 km' },
  { value: 10, label: '+10 km' },
  { value: 20, label: '+20 km' },
  { value: 50, label: '+50 km' },
  { value: 100, label: '+100 km' }
]

export function SearchBar() {
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [distance, setDistance] = useState(5)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showDistanceDropdown, setShowDistanceDropdown] = useState(false)
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  const locationRef = useRef<HTMLDivElement>(null)
  const distanceRef = useRef<HTMLDivElement>(null)

  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)
    
    console.log('📍 Location input changed:', value)
    
    if (value.length > 0) {
      // Sort by relevance: exact matches first, then starts with, then contains
      const filtered = CZECH_CITIES
        .filter(city => city.toLowerCase().includes(value.toLowerCase()))
        .sort((a, b) => {
          const aLower = a.toLowerCase()
          const bLower = b.toLowerCase()
          const searchLower = value.toLowerCase()
          
          // Exact match comes first
          if (aLower === searchLower) return -1
          if (bLower === searchLower) return 1
          
          // Starts with comes second
          if (aLower.startsWith(searchLower) && !bLower.startsWith(searchLower)) return -1
          if (bLower.startsWith(searchLower) && !aLower.startsWith(searchLower)) return 1
          
          // Then alphabetical order
          return a.localeCompare(b)
        })
        .slice(0, 10) // Show up to 10 cities instead of 5
      
      setFilteredCities(filtered)
      console.log('🏙️ Filtered cities:', filtered)
    } else {
      setFilteredCities([])
    }
    setShowLocationDropdown(true)
  }

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Debug logging
    console.log('🔍 Search Form Submitted:')
    console.log('- Query:', query || '(empty)')
    console.log('- Location:', location || '(empty)')
    console.log('- Distance:', distance, 'km')
    console.log('- Language:', language)
    
    // Validation
    if (!query.trim()) {
      alert(language === 'en' ? 'Please enter a service type' : 'Prosím zadejte typ služby')
      return
    }
    
    if (!location.trim()) {
      alert(language === 'en' ? 'Please enter a location' : 'Prosím zadejte lokalitu')
      return
    }
    
    setIsSearching(true)
    
    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would typically navigate to search results
      // For now, just show an alert with the search parameters
      const searchInfo = language === 'en' 
        ? `Searching for "${query}" in ${location} within ${distance} km`
        : `Hledání "${query}" v ${location} v okruhu ${distance} km`
      
      alert(searchInfo)
      
      // TODO: Navigate to search results page
      // router.push(`/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&distance=${distance}`)
      
    } catch (error) {
      console.error('Search error:', error)
      alert(language === 'en' ? 'Search failed. Please try again.' : 'Vyhledávání selhalo. Zkuste to prosím znovu.')
    } finally {
      setIsSearching(false)
    }
  }

  const selectCity = (city: string) => {
    setLocation(city)
    setShowLocationDropdown(false)
  }

  const selectDistance = (distanceValue: number, label: string) => {
    console.log('📏 Distance selected:', distanceValue, 'km -', label)
    setDistance(distanceValue)
    setShowDistanceDropdown(false)
  }

  const clearLocation = () => {
    setLocation('')
    setShowLocationDropdown(false)
  }

  const getCurrentDistanceLabel = () => {
    const option = DISTANCE_OPTIONS.find(opt => opt.value === distance)
    return option?.label || `+${distance} km`
  }

  return (
    <form onSubmit={handleSearch} className="max-w-6xl mx-auto">
      {/* Main Search Container - Carvago Style */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl overflow-visible">
        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          
          {/* Service Search Input */}
          <div className="relative p-6 flex-1 lg:flex-[2]">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'en' ? 'Service Type' : 'Typ služby'}
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'What service do you need?' : 'Jakou službu potřebujete?'}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  console.log('🔧 Service query changed:', e.target.value)
                }}
                className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 bg-transparent"
                aria-label={language === 'en' ? 'Service type' : 'Typ služby'}
              />
            </div>
          </div>
          
          {/* Location Selector */}
          <div className="relative p-6 flex-1 lg:flex-[1.5]" ref={locationRef}>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'en' ? 'Location' : 'Lokalita'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Enter city' : 'Město'}
                value={location}
                onChange={handleLocationInputChange}
                onFocus={() => setShowLocationDropdown(true)}
                className="w-full pl-12 pr-10 py-4 text-lg border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 bg-transparent min-w-0"
              />
              {location && (
                <button
                  type="button"
                  onClick={clearLocation}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* Location Dropdown */}
            {showLocationDropdown && location && (
              <div className="absolute top-full left-0 right-0 mt-3 mx-2 bg-white border border-gray-300 rounded-xl shadow-2xl z-[100] max-h-80 overflow-y-auto">
                {filteredCities.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                      {filteredCities.length} {filteredCities.length === 1 ? 'město' : 'měst'} nalezeno
                    </div>
                    {filteredCities.map((city, index) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => selectCity(city)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-gray-900 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="font-medium">{city}</span>
                          </div>
                          {index < 3 && (
                            <span className="text-xs text-blue-600 font-medium">
                              {index === 0 ? 'Nejlepší' : 'Doporučeno'}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : location && (
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                      Žádná města nenalezena pro "{location}"
                    </div>
                    <button
                      type="button"
                      onClick={() => selectCity(location)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Search className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-blue-600">
                            {language === 'en' ? `Use "${location}"` : `Použít "${location}"`}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Hledat v této lokalitě
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Distance Selector */}
          <div className="relative p-6 flex-1 lg:flex-[1]" ref={distanceRef}>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'en' ? 'Distance' : 'Vzdálenost'}
            </label>
            <button
              type="button"
              onClick={() => setShowDistanceDropdown(!showDistanceDropdown)}
              className="w-full py-4 px-4 text-lg text-left text-gray-900 hover:bg-gray-50 focus:outline-none flex items-center justify-between rounded-lg border-0 bg-transparent"
            >
              <span className="font-medium">{getCurrentDistanceLabel()}</span>
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showDistanceDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Distance Dropdown */}
            {showDistanceDropdown && (
              <div className="absolute top-full left-0 right-0 mt-3 mx-2 bg-white border border-gray-300 rounded-xl shadow-2xl z-[100]">
                <div className="py-2">
                  {DISTANCE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => selectDistance(option.value, option.label)}
                      className={`w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-0 ${
                        distance === option.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-900'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Search Button */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSearching}
            className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl ${
              isSearching 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSearching ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{language === 'en' ? 'Searching...' : 'Hledání...'}</span>
              </div>
            ) : (
              language === 'en' ? 'Find Services' : 'Najít služby'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}