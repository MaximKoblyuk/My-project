'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, MapPin, Clock, Phone, ExternalLink, Loader } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePlaces, getGooglePhotoUrl, type PlaceService } from '@/hooks/usePlaces'

interface GoogleServicesProps {
  category: string
  location?: string
}

export function GoogleServices({ category, location = 'Praha, Czech Republic' }: GoogleServicesProps) {
  const { language } = useLanguage()
  const { data, loading, error, refetch } = usePlaces(category, location)
  const [selectedLocation, setSelectedLocation] = useState(location)

  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, { en: string; cs: string }> = {
      'autoopravna': { en: 'Auto Repair', cs: 'Autoopravna' },
      'vymena-oleje': { en: 'Oil Change', cs: 'Výměna oleje' },
      'myti-auta': { en: 'Car Wash', cs: 'Mytí auta' },
      'pneuservis': { en: 'Tire Service', cs: 'Pneuservis' },
      'diagnostika': { en: 'Diagnostics', cs: 'Diagnostika' },
      'detailing': { en: 'Detailing', cs: 'Detailing' },
      'klimatizace': { en: 'AC Service', cs: 'Klimatizace' },
      'brzdy': { en: 'Brake Service', cs: 'Brzdy' },
      'stk': { en: 'MOT Test (STK)', cs: 'STK - Technická kontrola' },
      'ek': { en: 'Emissions Test', cs: 'EK - Měření emisí' },
      'odtah': { en: 'Towing Service', cs: 'Odtahová služba' }
    }
    
    const cat = categoryMap[category]
    return cat ? (language === 'en' ? cat.en : cat.cs) : category
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">
            {language === 'en' ? 'Loading services...' : 'Načítám služby...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-red-800 font-semibold mb-2">
            {language === 'en' ? 'Error Loading Services' : 'Chyba při načítání služeb'}
          </h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {language === 'en' ? 'Try Again' : 'Zkusit znovu'}
          </button>
        </div>
      </div>
    )
  }

  if (!data || data.services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-gray-800 font-semibold mb-2">
            {language === 'en' ? 'No Services Found' : 'Žádné služby nenalezeny'}
          </h3>
          <p className="text-gray-600 text-sm">
            {language === 'en' 
              ? `No ${getCategoryName(category)} services found in ${selectedLocation}`
              : `Nenalezeny žádné služby ${getCategoryName(category)} v ${selectedLocation}`
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {getCategoryName(category)}
        </h2>
        <p className="text-gray-600">
          {language === 'en' 
            ? `${data.total} services found in ${data.location}`
            : `Nalezeno ${data.total} služeb v ${data.location}`
          }
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.services.map((service) => (
          <ServiceCard key={service.id} service={service} language={language} />
        ))}
      </div>
    </div>
  )
}

interface ServiceCardProps {
  service: PlaceService
  language: string
}

function ServiceCard({ service, language }: ServiceCardProps) {
  const photoUrl = service.photoReference 
    ? getGooglePhotoUrl(service.photoReference, 400)
    : '/services/default-service.svg'

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/place/?q=place_id:${service.id}`
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Image */}
      <div className="h-48 bg-gray-50 relative">
        <Image
          src={photoUrl}
          alt={`${service.name}`}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/services/default-service.svg'
          }}
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {service.name}
          </h3>
          {service.rating > 0 && (
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{service.rating.toFixed(1)}</span>
              {service.reviewCount > 0 && (
                <span className="text-sm text-gray-500">({service.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-start space-x-1 mb-3">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 leading-relaxed">{service.address}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={openGoogleMaps}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{language === 'en' ? 'View on Maps' : 'Zobrazit na mapě'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}