'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Mock data - in a real app, this would come from an API
const featuredServices = [
  {
    id: 1,
    name: 'Premium Auto Care',
    categoryKey: 'category.autoRepair',
    rating: 4.8,
    reviewCount: 127,
    address: '123 Main St, Praha',
    distance: '2.1 km',
    image: '/services/auto-repair.svg',
    openNow: true,
    description: 'Full-service auto repair with certified mechanics',
    openTime: '8 AM'
  },
  {
    id: 2,
    name: 'Quick Lube Express',
    categoryKey: 'category.oilChange',
    rating: 4.6,
    reviewCount: 89,
    address: '456 Oak Ave, Praha',
    distance: '1.8 km',
    image: '/services/oil-change.svg',
    openNow: true,
    description: 'Fast and reliable oil change service',
    openTime: '8 AM'
  },
  {
    id: 3,
    name: 'Sparkle Car Wash',
    categoryKey: 'category.carWash',
    rating: 4.7,
    reviewCount: 156,
    address: '789 Pine Rd, Praha',
    distance: '3.2 km',
    image: '/services/car-wash.svg',
    openNow: false,
    description: 'Eco-friendly car wash and detailing',
    openTime: '8 AM'
  },
  {
    id: 4,
    name: 'Elite Auto Detailing',
    categoryKey: 'category.detailing',
    rating: 4.9,
    reviewCount: 203,
    address: '321 Elm St, Praha',
    distance: '2.7 km',
    image: '/services/detailing.svg',
    openNow: true,
    description: 'Professional detailing services',
    openTime: '8 AM'
  },
  {
    id: 5,
    name: 'SafeStop Brake Center',
    categoryKey: 'category.brakeService',
    rating: 4.8,
    reviewCount: 174,
    address: '555 Brake Ave, Praha',
    distance: '1.5 km',
    image: '/services/brake-service.svg',
    openNow: true,
    description: 'Expert brake repair and maintenance',
    openTime: '7 AM'
  },
  {
    id: 6,
    name: 'ProTire Solutions',
    categoryKey: 'category.tireService',
    rating: 4.5,
    reviewCount: 92,
    address: '777 Tire Blvd, Praha',
    distance: '4.1 km',
    image: '/services/tire-service.svg',
    openNow: true,
    description: 'Complete tire sales and installation',
    openTime: '8 AM'
  },
  {
    id: 7,
    name: 'TechCheck Diagnostics',
    categoryKey: 'category.diagnostics',
    rating: 4.7,
    reviewCount: 138,
    address: '999 Tech Dr, Praha',
    distance: '2.9 km',
    image: '/services/diagnostics.svg',
    openNow: false,
    description: 'Advanced engine diagnostics and computer repair',
    openTime: '9 AM'
  },
  {
    id: 8,
    name: 'CoolAir AC Masters',
    categoryKey: 'category.acService',
    rating: 4.6,
    reviewCount: 115,
    address: '333 Cool St, Praha',
    distance: '3.7 km',
    image: '/services/ac-service.svg',
    openNow: true,
    description: 'Air conditioning repair and maintenance',
    openTime: '8 AM'
  },
  {
    id: 9,
    name: 'RapidTow Emergency',
    categoryKey: 'category.towingService',
    rating: 4.7,
    reviewCount: 89,
    address: '444 Rescue Rd, Praha',
    distance: '1.2 km',
    image: '/services/towing-service.svg',
    openNow: true,
    description: '24/7 emergency towing and roadside assistance',
    openTime: '24/7'
  }
]

export function FeaturedServices() {
  const { language } = useLanguage()

  const getCategoryName = (categoryKey: string) => {
    const categoryMap: Record<string, { en: string; cs: string }> = {
      'category.autoRepair': { en: 'Auto Repair', cs: 'Autoopravna' },
      'category.oilChange': { en: 'Oil Change', cs: 'Výměna oleje' },
      'category.carWash': { en: 'Car Wash', cs: 'Mytí auta' },
      'category.detailing': { en: 'Detailing', cs: 'Detailing' },
      'category.brakeService': { en: 'Brake Service', cs: 'Brzdy' },
      'category.tireService': { en: 'Tire Service', cs: 'Pneumatiky' },
      'category.diagnostics': { en: 'Diagnostics', cs: 'Diagnostika' },
      'category.acService': { en: 'AC Service', cs: 'Klimatizace' },
      'category.towingService': { en: 'Towing Service', cs: 'Odtahová služba' }
    }
    
    const category = categoryMap[categoryKey]
    if (!category) return categoryKey
    
    return language === 'en' ? category.en : category.cs
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredServices.map((service) => (
        <Link
          key={service.id}
          href={`/services/${service.id}`}
          className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          {/* Image */}
          <div className="h-48 bg-gray-50 relative">
            <Image
              src={service.image}
              alt={`${service.name} - ${getCategoryName(service.categoryKey)}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                service.openNow 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {service.openNow ? (language === 'en' ? 'Open Now' : 'Otevřeno') : (language === 'en' ? 'Closed' : 'Zavřeno')}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {service.name}
              </h3>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{service.rating}</span>
                <span className="text-sm text-gray-500">({service.reviewCount})</span>
              </div>
            </div>

            <p className="text-sm text-blue-600 mb-2">{getCategoryName(service.categoryKey)}</p>
            <p className="text-sm text-gray-600 mb-3">{service.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{service.distance}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{language === 'en' ? `Opens ${service.openTime}` : `Otevírá v ${service.openTime}`}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}