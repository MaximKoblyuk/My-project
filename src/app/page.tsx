'use client'

import { SearchBar } from '@/components/SearchBarNew'
import { ServiceCategories } from '@/components/ServiceCategories'
import { FeaturedServices } from '@/components/FeaturedServices'
import { Header } from '@/components/Header'
import { HowItWorks } from '@/components/HowItWorks'
import { CustomerReviews } from '@/components/CustomerReviews'
import { Footer } from '@/components/Footer'
import { VideoBackground } from '@/components/VideoBackground'
import { useLanguage } from '@/contexts/LanguageContext'
import { CheckCircle, Shield, Clock } from 'lucide-react'

export default function HomePage() {
  const { language } = useLanguage()

  return (
    <main>
      <Header />
      
      {/* Hero Section - Video Background */}
      <VideoBackground 
        src="/watermarked_preview.mp4" 
        poster="/logo.png"
        className="h-[80vh] flex items-center text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {language === 'en' ? (
                <>
                  Find services online.<br />
                  We verify. We deliver.
                </>
              ) : (
                <>
                  Najděte služby online.<br />
                  Prověříme. Doručíme.
                </>
              )}
            </h1>
            <p className="text-lg mb-6 text-blue-100 leading-relaxed">
              {language === 'en' 
                ? 'Connect with trusted automotive professionals in your area. From oil changes to major repairs, we help you find the right service at the right price.' 
                : 'Spojte se s důvěryhodnými automobilovými profesionály ve vaší oblasti. Od výměny oleje po velké opravy, pomůžeme vám najít správný servis za správnou cenu.'}
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mb-6">
            <SearchBar />
          </div>

          {/* Quick Stats - Compact Style */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-blue-100">
                {language === 'en' ? '4.9 average rating' : '4,9 průměrné hodnocení'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-blue-100">
                {language === 'en' ? '24/7 customer support' : '24/7 zákaznická podpora'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-blue-100">
                {language === 'en' ? 'Verified professionals' : 'Ověření profesionálové'}
              </span>
            </div>
          </div>
        </div>
      </VideoBackground>

      {/* Benefits Row - Carvago Style */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? '24/7 Support' : '24/7 Podpora'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' ? 'Round-the-clock customer support for all your automotive needs' : 'Nepřetržitá zákaznická podpora pro všechny vaše automobilové potřeby'}
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Verified Services' : 'Ověřené služby'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' ? 'All service providers are thoroughly vetted and verified for quality' : 'Všichni poskytovatelé služeb jsou důkladně prověřeni a ověřeni z hlediska kvality'}
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Fast Booking' : 'Rychlé rezervace'}
              </h3>
              <p className="text-gray-600">
                {language === 'en' ? 'Book your service in minutes with instant confirmation' : 'Rezervujte si službu během několika minut s okamžitým potvrzením'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Popular on FixPoints' : 'Oblíbené na FixPoints'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' ? 'Choose from our most requested automotive services' : 'Vyberte si z našich nejžádanějších automobilových služeb'}
            </p>
          </div>
          <ServiceCategories />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Featured Services' : 'Doporučené služby'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' ? 'Discover top-rated automotive professionals in your area' : 'Objevte nejlépe hodnocené automobilové profesionály ve vaší oblasti'}
            </p>
          </div>
          <FeaturedServices />
        </div>
      </section>

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'en' ? 'Your next car service is waiting here...' : 'Vaše příští autoservis vás čeká tady...'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Join thousands of satisfied customers who trust FixPoints for their automotive needs' 
              : 'Připojte se k tisícům spokojených zákazníků, kteří důvěřují FixPoints se svými automobilovými potřebami'}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            {language === 'en' ? 'Find Services Now' : 'Najít služby nyní'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}