'use client'

import Link from 'next/link'
import { Heart, ArrowLeft, Trash2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function FavoritesPage() {
  const { language } = useLanguage()
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'cs-CZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="p-2 rounded-lg hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                  <Heart className="w-8 h-8 text-red-500" />
                  <span>
                    {language === 'en' ? 'My Favorites' : 'Moje oblíbené'}
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">
                  {language === 'en' 
                    ? `${favorites.length} favorite service${favorites.length !== 1 ? 's' : ''}` 
                    : `${favorites.length} oblíben${favorites.length === 1 ? 'á služba' : favorites.length < 5 ? 'é služby' : 'ých služeb'}`
                  }
                </p>
              </div>
            </div>
            
            {favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{language === 'en' ? 'Clear All' : 'Vymazat vše'}</span>
              </button>
            )}
          </div>

          {/* Favorites List */}
          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-500 mb-2">
                {language === 'en' ? 'No favorites yet' : 'Zatím žádné oblíbené'}
              </h2>
              <p className="text-gray-400 mb-6">
                {language === 'en' 
                  ? 'Start adding services to your favorites by clicking the heart icon'
                  : 'Začněte přidávat služby do oblíbených kliknutím na ikonu srdce'
                }
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'en' ? 'Browse Services' : 'Procházet služby'}
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {favorite.name}
                      </h3>
                      <p className="text-blue-600 text-sm mb-2">
                        {favorite.category}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {language === 'en' ? 'Added on' : 'Přidáno'} {formatDate(favorite.dateAdded)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/services/${favorite.id}`}
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        {language === 'en' ? 'View Details' : 'Zobrazit detaily'}
                      </Link>
                      <button
                        onClick={() => removeFromFavorites(favorite.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title={language === 'en' ? 'Remove from favorites' : 'Odebrat z oblíbených'}
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}