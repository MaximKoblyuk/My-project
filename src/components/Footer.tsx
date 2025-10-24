'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { Facebook, Instagram, Youtube, Linkedin, Phone, Mail } from 'lucide-react'

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.svg"
                  alt="FixPoint Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <span className="text-xl font-bold">FixPoint</span>
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              {language === 'en' 
                ? 'Your trusted partner for automotive services. Find, compare, and book the best car services in your area.' 
                : 'Váš důvěryhodný partner pro automobilové služby. Najděte, porovnejte a rezervujte si nejlepší autoservisy ve vaší oblasti.'}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+420 246 034 700</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@fixpoint.cz</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {language === 'en' ? 'Services' : 'Služby'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services/auto-repair" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Auto Repair' : 'Autoopravna'}
                </Link>
              </li>
              <li>
                <Link href="/services/oil-change" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Oil Change' : 'Výměna oleje'}
                </Link>
              </li>
              <li>
                <Link href="/services/car-wash" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Car Wash' : 'Mytí auta'}
                </Link>
              </li>
              <li>
                <Link href="/services/tire-service" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Tire Service' : 'Pneuservis'}
                </Link>
              </li>
              <li>
                <Link href="/services/diagnostics" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Diagnostics' : 'Diagnostika'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {language === 'en' ? 'Company' : 'Společnost'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'About Us' : 'O nás'}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'How it works?' : 'Jak to funguje?'}
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Reviews' : 'Recenze'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Contact' : 'Kontakt'}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Careers' : 'Kariéra'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {language === 'en' ? 'Support' : 'Podpora'}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Help Center' : 'Nápověda'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Terms of Service' : 'Obchodní podmínky'}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Privacy Policy' : 'Ochrana soukromí'}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">
                  {language === 'en' ? 'Cookie Policy' : 'Zásady cookies'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2024 FixPoint s.r.o. {language === 'en' ? 'All rights reserved.' : 'Všechna práva vyhrazena.'}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <Link 
                href="https://facebook.com/fixpoint" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="https://instagram.com/fixpoint_cz" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="https://youtube.com/fixpoint" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link 
                href="https://linkedin.com/company/fixpoint" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <span>{language === 'en' ? 'Trusted by professionals' : 'Důvěřují nám profesionálové'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}