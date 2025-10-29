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
      </div>
    </section>
  )
}