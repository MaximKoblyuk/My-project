'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { useLanguage } from '@/contexts/LanguageContext'
import { Search, MapPin, Calendar, Trash2, Star, Clock, Filter, Eye, Heart } from 'lucide-react'
import Link from 'next/link'

interface SavedSearch {
  id: string
  title: string
  service: string
  location: string
  filters: {
    category: string
    rating: number
    distance: string
    price: string
    openNow: boolean
  }
  resultsCount: number
  lastUpdated: string
  createdAt: string
  isNotificationEnabled: boolean
}

// Mock data - v reálné aplikaci by to bylo z API
const mockSavedSearches: SavedSearch[] = [
  {
    id: '1',
    title: 'Autoopravny v Praze',
    service: 'Autoopravna',
    location: 'Praha',
    filters: {
      category: 'autoopravna',
      rating: 4,
      distance: '10km',
      price: 'medium',
      openNow: true
    },
    resultsCount: 127,
    lastUpdated: '2025-10-29T10:30:00Z',
    createdAt: '2025-10-25T14:20:00Z',
    isNotificationEnabled: true
  },
  {
    id: '2',
    title: 'Pneuservisy Brno',
    service: 'Pneuservis',
    location: 'Brno',
    filters: {
      category: 'tires',
      rating: 0,
      distance: '15km',
      price: 'any',
      openNow: false
    },
    resultsCount: 43,
    lastUpdated: '2025-10-28T16:45:00Z',
    createdAt: '2025-10-20T09:15:00Z',
    isNotificationEnabled: false
  },
  {
    id: '3',
    title: 'Mytí aut Praha centrum',
    service: 'Mytí auta',
    location: 'Praha 1',
    filters: {
      category: 'car-wash',
      rating: 4.5,
      distance: '5km',
      price: 'high',
      openNow: true
    },
    resultsCount: 18,
    lastUpdated: '2025-10-29T08:20:00Z',
    createdAt: '2025-10-22T11:30:00Z',
    isNotificationEnabled: true
  }
]

// Mock data pro oblíbené servisy
const mockFavoriteServices = [
  {
    id: 1,
    name: 'Autoservis v Praze Nonstop',
    category: 'Autoopravna',
    rating: 4.3,
    reviewCount: 821,
    address: 'K Třebonicům 64, 155 00 Praha 5',
    openNow: true,
    addedAt: '2025-10-28T14:30:00Z'
  },
  {
    id: 2,
    name: 'Quick Lube Express', 
    category: 'Výměna oleje',
    rating: 4.6,
    reviewCount: 89,
    address: '456 Oak Ave, Praha',
    openNow: true,
    addedAt: '2025-10-27T10:15:00Z'
  }
]

export default function SavedSearchesPage() {
  const { language } = useLanguage()
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(mockSavedSearches)
  const [favoriteServices, setFavoriteServices] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'searches' | 'favorites'>('searches')
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'name' | 'results'>('recent')

  // Načtení oblíbených servise z localStorage
  useEffect(() => {
    const saved = localStorage.getItem('favorite-services')
    if (saved) {
      const favoriteIds = JSON.parse(saved)
      const filtered = mockFavoriteServices.filter(service => 
        favoriteIds.includes(service.id)
      )
      setFavoriteServices(filtered)
    }
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) {
      return language === 'en' ? 'Today' : 'Dnes'
    } else if (days === 1) {
      return language === 'en' ? 'Yesterday' : 'Včera'
    } else if (days < 7) {
      return language === 'en' ? `${days} days ago` : `Před ${days} dny`
    } else {
      return date.toLocaleDateString(language === 'en' ? 'en-US' : 'cs-CZ')
    }
  }

  const sortedSearches = [...savedSearches].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'name':
        return a.title.localeCompare(b.title)
      case 'results':
        return b.resultsCount - a.resultsCount
      case 'recent':
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    }
  })

  const handleDeleteSearch = (id: string) => {
    setSavedSearches(prev => prev.filter(search => search.id !== id))
  }

  const handleToggleNotifications = (id: string) => {
    setSavedSearches(prev => prev.map(search => 
      search.id === id 
        ? { ...search, isNotificationEnabled: !search.isNotificationEnabled }
        : search
    ))
  }

  const getSearchUrl = (search: SavedSearch) => {
    const params = new URLSearchParams({
      service: search.service.toLowerCase(),
      location: search.location,
      category: search.filters.category,
      rating: search.filters.rating.toString(),
      distance: search.filters.distance,
      price: search.filters.price,
      openNow: search.filters.openNow.toString()
    })
    return `/search?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'My Profile' : 'Můj profil'}
              </h1>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Manage your saved searches, favorites and get notifications'
                  : 'Spravujte svá uložená vyhledávání, oblíbené a dostávejte upozornění'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              >
                <option value="recent">
                  {language === 'en' ? 'Most Recent' : 'Nejnovější'}
                </option>
                <option value="oldest">
                  {language === 'en' ? 'Oldest First' : 'Nejstarší'}
                </option>
                <option value="name">
                  {language === 'en' ? 'Name A-Z' : 'Název A-Z'}
                </option>
                <option value="results">
                  {language === 'en' ? 'Most Results' : 'Nejvíce výsledků'}
                </option>
              </select>

              {/* Add new search button */}
              <Link 
                href="/search"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>{language === 'en' ? 'New Search' : 'Nové vyhledávání'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('searches')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'searches'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                {language === 'en' ? 'Saved Searches' : 'Uložená vyhledávání'} ({sortedSearches.length})
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'favorites'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-2" />
                {language === 'en' ? 'Favorite Services' : 'Oblíbené služby'} ({favoriteServices.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'searches' ? (
          <div>
            {sortedSearches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'en' ? 'No saved searches yet' : 'Zatím žádná uložená vyhledávání'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Save your searches to quickly access them later and get notifications about new results.'
                : 'Uložte si vyhledávání pro rychlý přístup později a dostávání upozornění na nové výsledky.'
              }
            </p>
            <Link 
              href="/search"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>{language === 'en' ? 'Start Searching' : 'Začít vyhledávat'}</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedSearches.map((search) => (
              <div key={search.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {search.title}
                      </h3>
                      {search.isNotificationEnabled && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Clock className="w-3 h-3 mr-1" />
                          {language === 'en' ? 'Notifications On' : 'Upozornění zapnuto'}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Search className="w-4 h-4" />
                        <span>{search.service}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{search.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>
                          {search.resultsCount} {language === 'en' ? 'results' : 'výsledků'}
                        </span>
                      </div>
                      {search.filters.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{search.filters.rating}+</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Filter className="w-4 h-4" />
                        <span>{search.filters.distance}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {language === 'en' ? 'Updated' : 'Aktualizováno'} {formatDate(search.lastUpdated)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {language === 'en' ? 'Created' : 'Vytvořeno'} {formatDate(search.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {/* View Results Button */}
                    <Link
                      href={getSearchUrl(search)}
                      className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      {language === 'en' ? 'View Results' : 'Zobrazit výsledky'}
                    </Link>

                    {/* Notifications Toggle */}
                    <button
                      onClick={() => handleToggleNotifications(search.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        search.isNotificationEnabled
                          ? 'text-blue-600 hover:bg-blue-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={language === 'en' 
                        ? (search.isNotificationEnabled ? 'Disable notifications' : 'Enable notifications')
                        : (search.isNotificationEnabled ? 'Vypnout upozornění' : 'Zapnout upozornění')
                      }
                    >
                      <Clock className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteSearch(search.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title={language === 'en' ? 'Delete search' : 'Smazat vyhledávání'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

            {/* Stats Summary */}
            {sortedSearches.length > 0 && (
              <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'en' ? 'Summary' : 'Souhrn'}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {sortedSearches.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Saved Searches' : 'Uložená vyhledávání'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {sortedSearches.filter(s => s.isNotificationEnabled).length}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Active Notifications' : 'Aktivní upozornění'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {sortedSearches.reduce((sum, s) => sum + s.resultsCount, 0)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Total Results' : 'Celkem výsledků'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {new Set(sortedSearches.map(s => s.location)).size}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Locations' : 'Lokalit'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Favorite Services Tab */
          <div>
            {favoriteServices.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'No favorites yet' : 'Zatím žádné oblíbené'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'en' 
                    ? 'Save your favorite car services to quickly access them later.'
                    : 'Uložte si oblíbené autoservisy pro rychlý přístup později.'
                  }
                </p>
                <Link 
                  href="/search"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>{language === 'en' ? 'Find Services' : 'Najít služby'}</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {favoriteServices.map((service: any) => (
                  <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex">
                      {/* Service Info */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link 
                              href={`/services/${service.id}`}
                              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {service.name}
                            </Link>
                            <p className="text-sm text-blue-600 font-medium">{service.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-semibold text-gray-900">{service.rating}</span>
                              <span className="text-gray-600 ml-1">({service.reviewCount})</span>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                              service.openNow 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {service.openNow 
                                ? (language === 'en' ? 'Open Now' : 'Otevřeno') 
                                : (language === 'en' ? 'Closed' : 'Zavřeno')
                              }
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{service.address}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {language === 'en' ? 'Added' : 'Přidáno'} {formatDate(service.addedAt)}
                            </span>
                            <Link
                              href={`/services/${service.id}`}
                              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {language === 'en' ? 'View Details' : 'Zobrazit detail'}
                            </Link>
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Heart className="w-4 h-4 fill-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}