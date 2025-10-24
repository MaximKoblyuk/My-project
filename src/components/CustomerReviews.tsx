'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Star } from 'lucide-react'

export function CustomerReviews() {
  const { language } = useLanguage()

  const reviews = [
    {
      id: 1,
      nameEn: 'Jakub L.',
      nameCs: 'Jakub L.',
      ratingEn: 'VERIFIED REVIEW',
      ratingCs: 'OVĚŘENÁ RECENZE',
      textEn: 'Complete satisfaction with the entire process and the service itself 👍 Professional approach and excellent communication throughout.',
      textCs: 'Naprostá spokojenost s celým procesem i samotnou službou 👍 Profesionální přístup a výborná komunikace po celou dobu.',
      service: 'Výměna oleje • 2023',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: 2,
      nameEn: 'Tomáš H.',
      nameCs: 'Tomáš H.',
      ratingEn: 'VERIFIED REVIEW',
      ratingCs: 'OVĚŘENÁ RECENZE',
      textEn: 'I was buying from FixPoints for the first time and I must say that I am extremely satisfied with both how the entire process went and the services associated with it.',
      textCs: 'Na FixPoints jsem kupoval poprvé a musím říct, že jsem nadmíru spokojený a to jak celý proces probíhal tak i služby s ním spojené.',
      service: 'Autoopravna • 2023',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: 3,
      nameEn: 'Karel V.',
      nameCs: 'Karel V.',
      ratingEn: 'VERIFIED REVIEW',
      ratingCs: 'OVĚŘENÁ RECENZE',
      textEn: 'Absolute satisfaction. Clear website with a wide range of filters, offering truly more than sufficient variety of services from across the region.',
      textCs: 'Naprostá spokojenost. Přehledný web se širokou škálou filtrů, nabízející vskutku více než dostatečné množství služeb z celého regionu.',
      service: 'Pneuservis • 2023',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: 4,
      nameEn: 'Vojtěch K.',
      nameCs: 'Vojtěch K.',
      ratingEn: 'VERIFIED REVIEW',
      ratingCs: 'OVĚŘENÁ RECENZE',
      textEn: 'Great experience with car service booking. When you choose the ideal service, they arrange everything. Perfect communication and maximum satisfaction with the car.',
      textCs: 'Super zkušenost s rezervací autoservisu. Když si člověk vybere ten ideální servis, zařídí vše. Perfektní komunikace a s autem maximální spokojenost.',
      service: 'Klimatizace • 2023',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'What do our customers say?' : 'Co na to naši zákazníci?'}
          </h2>
          
          {/* Rating Display */}
          <div className="inline-flex items-center space-x-4 mb-8">
            <span className="text-6xl font-bold text-gray-900">4.9</span>
            <div>
              <div className="flex space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">
                {language === 'en' ? '2,847 reviews' : '2 847 recenzí'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              {/* Customer Image */}
              <div className="mb-6">
                <img 
                  src={review.image} 
                  alt={language === 'en' ? review.nameEn : review.nameCs}
                  className="w-16 h-16 rounded-full object-cover mx-auto"
                />
              </div>

              {/* Verified Badge */}
              <div className="text-center mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {language === 'en' ? review.ratingEn : review.ratingCs}
                </span>
              </div>

              {/* Customer Name */}
              <h4 className="text-lg font-bold text-gray-900 text-center mb-2">
                {language === 'en' ? review.nameEn : review.nameCs}
              </h4>

              {/* Star Rating */}
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                {language === 'en' ? review.textEn : review.textCs}
              </p>

              {/* Service Info */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">F</span>
                  </div>
                  <span>{review.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to all reviews */}
        <div className="text-center mt-12">
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            {language === 'en' ? 'View all reviews →' : 'Zobrazit všechny recenze →'}
          </button>
        </div>
      </div>
    </section>
  )
}