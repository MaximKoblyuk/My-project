'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  BarChart3, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  Clock,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react'

interface CategoryStats {
  category: string
  name: string
  totalServices: number
  avgRating: number
  totalReviews: number
  lastUpdated: string
  topService: string
}

export default function AdminDashboard() {
  const { language } = useLanguage()
  const [stats, setStats] = useState<CategoryStats[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState<string | null>(null)

  const categories = [
    'autoopravna',
    'vymena-oleje', 
    'myti-auta',
    'pneuservis',
    'diagnostika',
    'detailing',
    'klimatizace',
    'brzdy',
    'stk',
    'odtah'
  ]

  const fetchCategoryStats = async (category: string) => {
    try {
      const response = await fetch(`/api/places?category=${category}&location=Praha,%20Czech%20Republic`)
      const data = await response.json()
      
      if (data.services && data.services.length > 0) {
        const avgRating = data.services.reduce((sum: number, service: any) => sum + service.rating, 0) / data.services.length
        const totalReviews = data.services.reduce((sum: number, service: any) => sum + service.reviewCount, 0)
        const topService = data.services[0]?.name || 'N/A'
        
        return {
          category,
          name: getCategoryName(category),
          totalServices: data.total || 0,
          avgRating: avgRating || 0,
          totalReviews: totalReviews || 0,
          lastUpdated: new Date().toISOString(),
          topService
        }
      }
      
      return {
        category,
        name: getCategoryName(category),
        totalServices: 0,
        avgRating: 0,
        totalReviews: 0,
        lastUpdated: new Date().toISOString(),
        topService: 'N/A'
      }
    } catch (error) {
      console.error(`Error fetching stats for ${category}:`, error)
      return null
    }
  }

  const getCategoryName = (category: string) => {
    const names: Record<string, { en: string, cs: string }> = {
      'autoopravna': { en: 'Auto Repair', cs: 'Autoopravny' },
      'vymena-oleje': { en: 'Oil Change', cs: 'Výměna oleje' },
      'myti-auta': { en: 'Car Wash', cs: 'Mytí aut' },
      'pneuservis': { en: 'Tire Service', cs: 'Pneuservis' },
      'diagnostika': { en: 'Diagnostics', cs: 'Diagnostika' },
      'detailing': { en: 'Detailing', cs: 'Detailing' },
      'klimatizace': { en: 'AC Service', cs: 'Klimatizace' },
      'brzdy': { en: 'Brake Service', cs: 'Brzdy' },
      'stk': { en: 'STK', cs: 'STK' },
      'odtah': { en: 'Towing', cs: 'Odtah' }
    }
    return names[category] ? (language === 'en' ? names[category].en : names[category].cs) : category
  }

  const loadAllStats = async () => {
    setLoading(true)
    const results = await Promise.all(
      categories.map(category => fetchCategoryStats(category))
    )
    
    const validStats = results.filter(stat => stat !== null) as CategoryStats[]
    setStats(validStats)
    setLoading(false)
  }

  const refreshCategory = async (category: string) => {
    setRefreshing(category)
    const newStat = await fetchCategoryStats(category)
    if (newStat) {
      setStats(prev => prev.map(stat => 
        stat.category === category ? newStat : stat
      ))
    }
    setRefreshing(null)
  }

  useEffect(() => {
    loadAllStats()
  }, [])

  const totalServices = stats.reduce((sum, stat) => sum + stat.totalServices, 0)
  const totalReviews = stats.reduce((sum, stat) => sum + stat.totalReviews, 0)
  const avgOverallRating = stats.length > 0 
    ? stats.reduce((sum, stat) => sum + stat.avgRating, 0) / stats.length 
    : 0

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'en' ? 'FixPoints Dashboard' : 'FixPoints Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'en' 
                  ? 'Manage your service categories and monitor performance'
                  : 'Spravujte kategorie služeb a sledujte výkonnost'
                }
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={loadAllStats}
                disabled={loading}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{language === 'en' ? 'Refresh All' : 'Obnovit vše'}</span>
              </button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">
                    {language === 'en' ? 'Total Services' : 'Celkem služeb'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{totalServices.toLocaleString()}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">
                    {language === 'en' ? 'Categories' : 'Kategorií'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
                <Settings className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">
                    {language === 'en' ? 'Total Reviews' : 'Celkem recenzí'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{totalReviews.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">
                    {language === 'en' ? 'Avg Rating' : 'Průměrné hodnocení'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{avgOverallRating.toFixed(1)}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {language === 'en' ? 'Service Categories' : 'Kategorie služeb'}
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'en' ? 'Loading category data...' : 'Načítám data kategorií...'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Category' : 'Kategorie'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Services' : 'Služby'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Avg Rating' : 'Hodnocení'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Reviews' : 'Recenze'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Top Service' : 'Nejlepší služba'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Actions' : 'Akce'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.map((stat) => (
                      <tr key={stat.category} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{stat.name}</div>
                              <div className="text-sm text-gray-500">{stat.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.totalServices}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-900">{stat.avgRating.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {stat.totalReviews.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                          {stat.topService}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => refreshCategory(stat.category)}
                            disabled={refreshing === stat.category}
                            className="text-blue-600 hover:text-blue-900 mr-3 disabled:opacity-50"
                          >
                            <RefreshCw className={`w-4 h-4 ${refreshing === stat.category ? 'animate-spin' : ''}`} />
                          </button>
                          <a
                            href={`/categories/${stat.category}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {language === 'en' ? 'View' : 'Zobrazit'}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}