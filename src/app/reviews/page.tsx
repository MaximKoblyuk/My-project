'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  Calendar,
  MapPin,
  Check,
  Plus,
  X,
  User,
  Camera
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock review data
const mockReviews = [
  {
    id: 1,
    customerName: 'David J.',
    rating: 5,
    date: '2024-10-20',
    serviceName: 'Premium Auto Care',
    serviceType: 'Autoopravna',
    location: 'Praha',
    verified: true,
    content: 'Skvělý servis! Auto mi přivezli až domů a kvalita práce byla naprosto v pořádku. Mechanik byl velmi profesionální a vysvětlil mi všechny opravy, které byly potřeba. Určitě doporučuji!',
    carMake: 'BMW',
    carModel: 'X3',
    images: ['/reviews/review-1.jpg']
  },
  {
    id: 2,
    customerName: 'Kateřina K.',
    rating: 5,
    date: '2024-10-18',
    serviceName: 'Quick Lube Express',
    serviceType: 'Výměna oleje',
    location: 'Brno',
    verified: true,
    content: 'Nákup služby na FixPoints byla prostě radost. Vše šlapalo jak na drátkách, vždy jsem věděla, v jaké fázi objednávka je. Výborná komunikace, rychlé vyřízení a auto je jako nové.',
    carMake: 'Škoda',
    carModel: 'Fabia',
    images: []
  },
  {
    id: 3,
    customerName: 'Jiří H.',
    rating: 4,
    date: '2024-10-15',
    serviceName: 'Elite Auto Detailing',
    serviceType: 'Detailing',
    location: 'Ostrava',
    verified: false,
    content: 'Auto jsem nechal očistit na FixPoints hlavně proto, že dávají záruku na práci. Výsledek je skvělý, auto vypadá jako nové. Jediné co bych vytknul je čekací doba, ale kvalita za to stojí.',
    carMake: 'Ford',
    carModel: 'Focus',
    images: ['/reviews/review-3.jpg', '/reviews/review-3b.jpg']
  },
  {
    id: 4,
    customerName: 'Jana N.',
    rating: 5,
    date: '2024-10-12',
    serviceName: 'RapidTow Emergency',
    serviceType: 'Odtahová služba',
    location: 'Praha',
    verified: true,
    content: 'Potřebovala jsem odtáhnout auto v noci a FixPoints mi našel službu, která byla dostupná 24/7. Přijeli rychle, byli velmi profesionální a cena byla férová.',
    carMake: 'Volkswagen',
    carModel: 'Golf',
    images: []
  },
  {
    id: 5,
    customerName: 'Tomáš P.',
    rating: 5,
    date: '2024-10-10',
    serviceName: 'SafeStop Brake Center',
    serviceType: 'Brzdy',
    location: 'Plzeň',
    verified: true,
    content: 'Výměna brzdových destiček proběhla zcela bez problémů. FixPoints dodržel veškeré závazky během objednávky a servis byl na nejvyšší úrovni.',
    carMake: 'Audi',
    carModel: 'A4',
    images: ['/reviews/review-5.jpg']
  }
]

export default function ReviewsPage() {
  const { language } = useLanguage()
  const [showAddReview, setShowAddReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    serviceName: '',
    serviceType: '',
    content: '',
    carMake: '',
    carModel: ''
  })

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length
  const totalReviews = mockReviews.length

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New review submitted:', newReview)
    // Here you would typically send the review to your API
    setShowAddReview(false)
    setNewReview({
      rating: 5,
      serviceName: '',
      serviceType: '',
      content: '',
      carMake: '',
      carModel: ''
    })
    alert(language === 'en' ? 'Review submitted successfully!' : 'Recenze byla úspěšně odeslána!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'What Our Customers Say' : 'Co o nás říkají zákazníci?'}
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                {renderStars(Math.round(averageRating), 'lg')}
                <span className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">{totalReviews}</span> {language === 'en' ? 'reviews' : 'recenzí'}
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? '"If you are not satisfied, neither are we!"'
                : '"Pokud nejste spokojeni vy, nejsme ani my!"'
              }
            </p>
          </div>

          {/* Add Review Button */}
          <div className="text-center">
            <button
              onClick={() => setShowAddReview(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>{language === 'en' ? 'Add Your Review' : 'Přidat recenzi'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating, 'sm')}
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>{language === 'en' ? 'Verified' : 'Ověřená recenze'}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(review.date).toLocaleDateString('cs-CZ')}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{review.content}</p>
                </div>

                {review.images.length > 0 && (
                  <div className="mb-6">
                    <div className="flex space-x-4">
                      {review.images.map((image, index) => (
                        <div key={index} className="relative w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
                          <div className="w-full h-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-blue-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-50 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-blue-700">{review.serviceType}</span>
                    </div>
                    <div className="text-sm text-gray-600">{review.serviceName}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{review.location}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {review.carMake} {review.carModel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-colors">
              {language === 'en' ? 'Load More Reviews' : 'Načíst další recenze'}
            </button>
          </div>
        </div>
      </section>

      {/* Add Review Modal */}
      {showAddReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? 'Add Your Review' : 'Přidat recenzi'}
                </h2>
                <button
                  onClick={() => setShowAddReview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitReview} className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Rating' : 'Hodnocení'}
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Service Provider Name' : 'Název poskytovatele služeb'}
                </label>
                <input
                  type="text"
                  value={newReview.serviceName}
                  onChange={(e) => setNewReview({...newReview, serviceName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'en' ? 'e.g., Premium Auto Care' : 'např. Premium Auto Care'}
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Service Type' : 'Typ služby'}
                </label>
                <select
                  value={newReview.serviceType}
                  onChange={(e) => setNewReview({...newReview, serviceType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">{language === 'en' ? 'Select service type' : 'Vyberte typ služby'}</option>
                  <option value="Autoopravna">{language === 'en' ? 'Auto Repair' : 'Autoopravna'}</option>
                  <option value="Výměna oleje">{language === 'en' ? 'Oil Change' : 'Výměna oleje'}</option>
                  <option value="Mytí auta">{language === 'en' ? 'Car Wash' : 'Mytí auta'}</option>
                  <option value="Pneumatiky">{language === 'en' ? 'Tire Service' : 'Pneumatiky'}</option>
                  <option value="Detailing">{language === 'en' ? 'Detailing' : 'Detailing'}</option>
                  <option value="Brzdy">{language === 'en' ? 'Brake Service' : 'Brzdy'}</option>
                  <option value="Diagnostika">{language === 'en' ? 'Diagnostics' : 'Diagnostika'}</option>
                  <option value="Klimatizace">{language === 'en' ? 'AC Service' : 'Klimatizace'}</option>
                  <option value="Odtahová služba">{language === 'en' ? 'Towing Service' : 'Odtahová služba'}</option>
                </select>
              </div>

              {/* Car Make and Model */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Car Make' : 'Značka auta'}
                  </label>
                  <input
                    type="text"
                    value={newReview.carMake}
                    onChange={(e) => setNewReview({...newReview, carMake: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={language === 'en' ? 'e.g., BMW' : 'např. BMW'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Car Model' : 'Model auta'}
                  </label>
                  <input
                    type="text"
                    value={newReview.carModel}
                    onChange={(e) => setNewReview({...newReview, carModel: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={language === 'en' ? 'e.g., X3' : 'např. X3'}
                  />
                </div>
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Your Review' : 'Vaše recenze'}
                </label>
                <textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'en' 
                    ? 'Tell us about your experience with this service provider...'
                    : 'Řekněte nám o své zkušenosti s tímto poskytovatelem služeb...'
                  }
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? 'Cancel' : 'Zrušit'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {language === 'en' ? 'Submit Review' : 'Odeslat recenzi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}