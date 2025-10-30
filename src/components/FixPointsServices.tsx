'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, MapPin, Clock, Phone, ExternalLink, Loader, Badge, Verified } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePlaces, getGooglePhotoUrl, type PlaceService } from '@/hooks/usePlaces'

interface FixPointsServicesProps {
  category?: string
  location?: string
  showHeader?: boolean
  showTitle?: boolean
  places?: PlaceService[]
  viewMode?: 'grid' | 'list'
}

export function FixPointsServices({ 
  category, 
  location = 'Praha, Czech Republic',
  showHeader = true,
  showTitle = true,
  places: providedPlaces,
  viewMode = 'grid'
}: FixPointsServicesProps) {
  const { language } = useLanguage()
  const { data, loading, error, refetch } = usePlaces(category || 'autoopravna', location)
  const [selectedLocation, setSelectedLocation] = useState(location)

  // Use provided places or fetch from API
  const places = providedPlaces || data?.services || []
  const isLoading = providedPlaces ? false : loading
  const hasError = providedPlaces ? null : error

  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, { 
      en: { name: string, description: string }, 
      cs: { name: string, description: string }
    }> = {
      'autoopravna': { 
        en: { name: 'Auto Repair', description: 'Professional car repair services' },
        cs: { name: 'Autoopravny', description: 'Profesionální autoopravny' }
      },
      'vymena-oleje': { 
        en: { name: 'Oil Change', description: 'Quick oil change services' },
        cs: { name: 'Výměna oleje', description: 'Rychlá výměna motorového oleje' }
      },
      'myti-auta': { 
        en: { name: 'Car Wash', description: 'Car cleaning and detailing' },
        cs: { name: 'Mytí aut', description: 'Mytí a čištění vozidel' }
      },
      'pneuservis': { 
        en: { name: 'Tire Service', description: 'Tire installation and repair' },
        cs: { name: 'Pneuservis', description: 'Služby pro pneumatiky' }
      },
      'diagnostika': { 
        en: { name: 'Diagnostics', description: 'Vehicle diagnostics and inspection' },
        cs: { name: 'Diagnostika', description: 'Diagnostika a kontrola vozidel' }
      },
      'detailing': { 
        en: { name: 'Car Detailing', description: 'Professional car detailing' },
        cs: { name: 'Detailing', description: 'Profesionální detailing vozidel' }
      },
      'klimatizace': { 
        en: { name: 'AC Service', description: 'Air conditioning repair' },
        cs: { name: 'Klimatizace', description: 'Oprava klimatizace' }
      },
      'brzdy': { 
        en: { name: 'Brake Service', description: 'Brake repair and maintenance' },
        cs: { name: 'Brzdy', description: 'Oprava a údržba brzd' }
      },
      'stk': { 
        en: { name: 'MOT Test (STK)', description: 'Mandatory technical inspection' },
        cs: { name: 'STK', description: 'Stanice technické kontroly' }
      },
      'odtah': { 
        en: { name: 'Towing Service', description: '24/7 emergency towing' },
        cs: { name: 'Odtahová služba', description: '24/7 odtahová služba' }
      }
    }
    
    const cat = categoryMap[category]
    return cat ? (language === 'en' ? cat.en : cat.cs) : { name: category, description: '' }
  }

  const categoryInfo = getCategoryInfo(category || 'autoopravna')

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {language === 'en' ? 'Loading Services' : 'Načítáme služby'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? `Finding ${categoryInfo.name.toLowerCase()} in ${selectedLocation}...`
              : `Hledáme ${categoryInfo.name.toLowerCase()} v ${selectedLocation}...`
            }
          </p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">
              {language === 'en' ? 'Service Unavailable' : 'Služba nedostupná'}
            </h3>
            <p className="text-red-600 text-sm mb-4">{hasError}</p>
            <button 
              onClick={refetch}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              {language === 'en' ? 'Try Again' : 'Zkusit znovu'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!places || places.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-gray-800 font-semibold mb-2 text-xl">
              {language === 'en' ? 'No Services Found' : 'Služby nenalezeny'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'en' 
                ? `We couldn't find any ${categoryInfo.name.toLowerCase()} services in ${selectedLocation}`
                : `Nenašli jsme žádné služby ${categoryInfo.name.toLowerCase()} v ${selectedLocation}`
              }
            </p>
            <button 
              onClick={refetch}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'en' ? 'Search Again' : 'Hledat znovu'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* FixPoints Branded Header */}
      {showHeader && showTitle && (
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full mr-3">
              <Verified className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold">
              {categoryInfo.name}
            </h1>
          </div>
          <p className="text-blue-100 text-lg mb-2">{categoryInfo.description}</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <Badge className="w-4 h-4 mr-1" />
              <span>FixPoints Verified</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{places.length} {language === 'en' ? 'services' : 'služeb'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {places.map((service, index) => (
          <FixPointsServiceCard 
            key={service.id} 
            service={service} 
            language={language} 
            rank={index + 1}
          />
        ))}
      </div>

      {/* FixPoints Footer */}
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-sm">
          {language === 'en' 
            ? 'Services verified and curated by FixPoints. All data sourced from Google Places.'
            : 'Služby ověřené a spravované platformou FixPoints. Všechna data pocházejí z Google Places.'
          }
        </p>
      </div>
    </div>
  )
}

interface FixPointsServiceCardProps {
  service: PlaceService
  language: string
  rank: number
}

function FixPointsServiceCard({ service, language, rank }: FixPointsServiceCardProps) {
  const photoUrl = service.photoReference 
    ? getGooglePhotoUrl(service.photoReference, 400)
    : '/services/default-service.svg'

  const openInFixPoints = () => {
    // V budoucnu můžeme přesměrovat na detail stránku FixPoints
    const url = `https://www.google.com/maps/place/?q=place_id:${service.id}`
    window.open(url, '_blank')
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 4.0) return 'text-blue-600'
    if (rating >= 3.5) return 'text-yellow-600'
    return 'text-gray-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Rank Badge */}
      <div className="relative">
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            #{rank}
          </div>
        </div>
        
        {/* Image */}
        <div className="h-48 bg-gray-100 relative overflow-hidden">
          <Image
            src={photoUrl}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/services/default-service.svg'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              service.openNow 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-500 text-white'
            }`}>
              {service.openNow 
                ? (language === 'en' ? 'Open' : 'Otevřeno') 
                : (language === 'en' ? 'Closed' : 'Zavřeno')
              }
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {service.name}
          </h3>
          {service.rating > 0 && (
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className={`text-sm font-bold ${getRatingColor(service.rating)}`}>
                {service.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="flex items-start space-x-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {service.address}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          {service.reviewCount > 0 && (
            <span>{service.reviewCount} {language === 'en' ? 'reviews' : 'recenzí'}</span>
          )}
          <div className="flex items-center">
            <Verified className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-600 font-medium">FixPoints</span>
          </div>
        </div>

        {/* Actions */}
        <button 
          onClick={openInFixPoints}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span>{language === 'en' ? 'View Details' : 'Zobrazit detail'}</span>
        </button>
      </div>
    </div>
  )
}