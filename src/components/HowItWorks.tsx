'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Search, CheckCircle, Truck } from 'lucide-react'

export function HowItWorks() {
  const { language } = useLanguage()

  const steps = [
    {
      icon: Search,
      titleEn: 'Find services online',
      titleCs: 'Najděte služby online',
      descriptionEn: 'Browse through our extensive network of verified automotive professionals in your area.',
      descriptionCs: 'Procházejte naší rozsáhlou sítí ověřených automobilových profesionálů ve vaší oblasti.'
    },
    {
      icon: CheckCircle,
      titleEn: 'We verify quality',
      titleCs: 'Ověříme kvalitu',
      descriptionEn: 'Our certified experts thoroughly inspect the service provider to ensure top quality.',
      descriptionCs: 'Naši certifikovaní odborníci důkladně prověří poskytovatele služeb, aby zajistili nejvyšší kvalitu.'
    },
    {
      icon: Truck,
      titleEn: 'Service delivered',
      titleCs: 'Služba doručena',
      descriptionEn: 'Get your car serviced with confidence. We handle everything from booking to completion.',
      descriptionCs: 'Nechte si opravit auto s důvěrou. Zařídíme vše od rezervace až po dokončení.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'How does FixPoints work?' : 'Jak funguje FixPoints?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Get your car serviced in three simple steps. It\'s that easy!' 
              : 'Nechte si opravit auto ve třech jednoduchých krocích. Je to tak jednoduché!'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                
                {/* Step Image Placeholder */}
                <div className="mb-8 bg-gray-100 rounded-2xl h-64 flex items-center justify-center">
                  <IconComponent className="w-16 h-16 text-blue-600" />
                </div>
                
                {/* Step Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === 'en' ? step.titleEn : step.titleCs}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {language === 'en' ? step.descriptionEn : step.descriptionCs}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
            <span>{language === 'en' ? 'Learn more about how it works' : 'Více o tom, jak to funguje'}</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}