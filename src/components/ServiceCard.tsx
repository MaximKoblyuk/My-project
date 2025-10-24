import Link from 'next/link'
import { Star, MapPin, Clock, Heart } from 'lucide-react'

interface ServiceCardProps {
  service: {
    id: number
    name: string
    category: string
    rating: number
    reviewCount: number
    address: string
    distance: string
    image: string
    openNow: boolean
    priceRange: string
    description: string
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex">
        {/* Image */}
        <div className="w-48 h-32 bg-gray-200 flex-shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              service.openNow 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {service.openNow ? 'Open Now' : 'Closed'}
            </span>
          </div>
          <button className="absolute top-3 right-3 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link 
                href={`/services/${service.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {service.name}
              </Link>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-blue-600">{service.category}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{service.priceRange}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{service.rating}</span>
              <span className="text-sm text-gray-500">({service.reviewCount})</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">{service.description}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{service.distance}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Opens 8 AM</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                Call
              </button>
              <Link
                href={`/services/${service.id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}