'use client'

import Link from 'next/link'
import { Wrench, Car, Droplets, Zap, Scissors, Shield, Truck, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function ServiceCategories() {
  const { language } = useLanguage()

  const categories = [
    {
      id: 'autoopravna',
      icon: Wrench,
      name: language === 'en' ? 'Auto Repair' : 'Autoopravna',
      description: 'Engine, transmission, brake repairs',
      category: language === 'en' ? 'Automotive Services' : 'Autoservisy'
    },
    {
      id: 'vymena-oleje',
      icon: Car,
      name: language === 'en' ? 'Oil Change' : 'Výměna oleje',
      description: 'Quick oil change services',
      category: language === 'en' ? 'Maintenance' : 'Údržba'
    },
    {
      id: 'myti-auta',
      icon: Droplets,
      name: language === 'en' ? 'Car Wash' : 'Mytí auta',
      description: 'Exterior and interior cleaning',
      category: language === 'en' ? 'Cleaning' : 'Čištění'
    },
    {
      id: 'pneuservis',
      icon: Zap,
      name: language === 'en' ? 'Tire Service' : 'Pneumatiky',
      description: 'Installation, rotation, alignment',
      category: language === 'en' ? 'Tires' : 'Pneumatiky'
    },
    {
      id: 'detailing',
      icon: Scissors,
      name: language === 'en' ? 'Detailing' : 'Detailing',
      description: 'Professional car detailing',
      category: language === 'en' ? 'Cleaning' : 'Čištění'
    },
    {
      id: 'diagnostika',
      icon: Shield,
      name: language === 'en' ? 'Diagnostics' : 'Diagnostika',
      description: 'Vehicle safety inspections',
      category: language === 'en' ? 'Inspection' : 'Kontroly'
    },
    {
      id: 'odtah',
      icon: Truck,
      name: language === 'en' ? 'Towing Service' : 'Odtahová služba',
      description: language === 'en' ? '24/7 emergency towing and roadside assistance' : '24/7 odtahová služba a pomoc na silnici',
      category: language === 'en' ? 'Emergency' : 'Pohotovost'
    },
    {
      id: 'stk',
      icon: CheckCircle,
      name: language === 'en' ? 'MOT Test (STK)' : 'STK - Technická kontrola',
      description: language === 'en' ? 'Mandatory technical inspection' : 'Povinná technická kontrola vozidla',
      category: language === 'en' ? 'Inspection' : 'Kontroly'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {categories.map((category) => {
        const IconComponent = category.icon
        
        return (
          <Link
            key={category.name}
            href={`/search?service=${category.id}&category=${encodeURIComponent(category.category)}&location=Praha`}
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
                <IconComponent className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.description}</p>
            
            {/* Carvago-style hover indicator */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-blue-600 text-sm font-semibold">
                {language === 'en' ? 'View services →' : 'Zobrazit služby →'}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}