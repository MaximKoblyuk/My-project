'use client'

import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FixPointsServices } from '@/components/FixPointsServices'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CategoryPage() {
  const { language } = useLanguage()
  const params = useParams()
  const category = params?.category as string

  // Map URL categories to our internal category IDs
  const categoryMap: Record<string, string> = {
    'auto-repair': 'autoopravna',
    'oil-change': 'vymena-oleje',
    'car-wash': 'myti-auta',
    'tire-service': 'pneuservis',
    'detailing': 'detailing',
    'inspection': 'diagnostika',
    'stk': 'stk',
    'towing': 'odtah'
  }

  const mappedCategory = categoryMap[category] || category

  if (!mappedCategory) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Category Not Found' : 'Kategorie nenalezena'}
              </h1>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'en' ? 'Back to Home' : 'Zpět na domů'}</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'en' ? 'Back to Home' : 'Zpět na domů'}</span>
            </Link>
          </div>

          {/* FixPoints Services */}
          <FixPointsServices 
            category={mappedCategory} 
            location="Praha, Czech Republic" 
          />
        </div>
      </div>
      <Footer />
    </>
  )
}