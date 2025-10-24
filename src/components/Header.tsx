'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, Heart, ShoppingCart, User } from 'lucide-react'
import { LanguageSelector } from './LanguageSelector'
import { AuthModalManager } from './AuthModalManager'
import { useLanguage } from '@/contexts/LanguageContext'

export function Header() {
  const { language } = useLanguage()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showServicesMenu, setShowServicesMenu] = useState(false)
  
  const userMenuRef = useRef<HTMLDivElement>(null)
  const servicesMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setShowServicesMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <AuthModalManager>
      {({ openLogin, openRegister, closeAuth }) => (
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo.svg"
                    alt="FixPoints Logo"
                    width={32}
                    height={32}
                    className="rounded"
                    priority
                  />
                </div>
                <span className="text-xl font-bold text-blue-600">fixpoints.</span>
              </Link>

              {/* Main Navigation - Carvago Style */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link 
                  href="/search" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {language === 'en' ? 'Find Service' : 'Najít službu'}
                </Link>
                
                <Link 
                  href="/how-it-works" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {language === 'en' ? 'How it works?' : 'Jak to funguje?'}
                </Link>
                
                <Link 
                  href="/reviews" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {language === 'en' ? 'Reviews' : 'Recenze'}
                </Link>

                {/* Services Dropdown */}
                <div className="relative" ref={servicesMenuRef}>
                  <button
                    onClick={() => setShowServicesMenu(!showServicesMenu)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    <span>{language === 'en' ? 'Services' : 'Služby'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showServicesMenu && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link href="/services/premium" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {language === 'en' ? 'Premium Services' : 'Prémiové služby'}
                        </Link>
                        <Link href="/services/mobile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {language === 'en' ? 'Mobile Service' : 'Mobilní servis'}
                        </Link>
                        <Link href="/services/warranty" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {language === 'en' ? 'Warranty' : 'Záruka'}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {language === 'en' ? 'About' : 'O nás'}
                </Link>
              </nav>

              {/* Right Side Actions - Carvago Style */}
              <div className="flex items-center space-x-4">
                {/* Favorites */}
                <Link href="/favorites" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </Link>

                {/* Cart */}
                <Link href="/cart" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </Link>

                {/* Language Selector */}
                <LanguageSelector />

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium hidden md:block">
                      {language === 'en' ? 'Sign In' : 'Přihlásit se'}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {language === 'en' ? 'My Account' : 'Můj účet'}
                          </p>
                        </div>
                        
                        <Link href="/profile/saved-searches" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {language === 'en' ? 'Saved searches' : 'Uložená hledání'}
                        </Link>
                        
                        <Link href="/profile/recent-searches" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {language === 'en' ? 'Recent searches' : 'Poslední hledání'}
                        </Link>
                        
                        <Link href="/profile/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {language === 'en' ? 'Favorite services' : 'Oblíbené služby'}
                        </Link>
                        
                        <Link href="/profile/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {language === 'en' ? 'My orders' : 'Moje objednávky'}
                        </Link>
                        
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button 
                            onClick={() => {
                              setShowUserMenu(false)
                              openLogin()
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-50"
                          >
                            {language === 'en' ? 'Sign In' : 'Přihlásit se'}
                          </button>
                          
                          <button 
                            onClick={() => {
                              setShowUserMenu(false)
                              openRegister()
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-50"
                          >
                            {language === 'en' ? 'Register' : 'Registrovat se'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </AuthModalManager>
  )
}