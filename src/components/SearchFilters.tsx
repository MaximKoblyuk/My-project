'use client'

import { useState } from 'react'
import { Star, ChevronDown, ChevronUp } from 'lucide-react'

export function SearchFilters() {
  const [openSections, setOpenSections] = useState<string[]>(['category', 'rating', 'price'])

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const categories = [
    'Auto Repair',
    'Oil Change',
    'Car Wash',
    'Tire Service',
    'Detailing',
    'Inspection'
  ]

  const priceRanges = [
    { value: '$', label: '$ - Under $50' },
    { value: '$$', label: '$$ - $50-$150' },
    { value: '$$$', label: '$$$ - $150-$300' },
    { value: '$$$$', label: '$$$$ - Over $300' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
      
      {/* Category Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-900">Category</span>
          {openSections.includes('category') ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {openSections.includes('category') && (
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-900">Rating</span>
          {openSections.includes('rating') ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {openSections.includes('rating') && (
          <div className="mt-3 space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="ml-2 flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-700">& up</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-900">Price Range</span>
          {openSections.includes('price') ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {openSections.includes('price') && (
          <div className="mt-3 space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Distance Filter */}
      <div className="pb-4 mb-4">
        <button
          onClick={() => toggleSection('distance')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-900">Distance</span>
          {openSections.includes('distance') ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {openSections.includes('distance') && (
          <div className="mt-3 space-y-2">
            {['1 mile', '5 miles', '10 miles', '25 miles'].map((distance) => (
              <label key={distance} className="flex items-center">
                <input
                  type="radio"
                  name="distance"
                  className="border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{distance}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
        Clear all filters
      </button>
    </div>
  )
}