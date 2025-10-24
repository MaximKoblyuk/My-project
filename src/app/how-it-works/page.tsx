'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Search, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  User, 
  Settings, 
  Star,
  CreditCard,
  MessageSquare,
  UserPlus,
  FileText,
  Shield
} from 'lucide-react'

export default function HowItWorksPage() {
  const { language } = useLanguage()

  const clientSteps = [
    {
      icon: Search,
      title: language === 'en' ? 'Search for Services' : 'Vyhledejte služby',
      description: language === 'en' 
        ? 'Enter the service you need and your location to find nearby automotive professionals.'
        : 'Zadejte službu, kterou potřebujete, a svou polohu, abyste našli blízké automobilové odborníky.'
    },
    {
      icon: MapPin,
      title: language === 'en' ? 'Compare & Choose' : 'Porovnejte a vyberte',
      description: language === 'en'
        ? 'Browse service providers, read reviews, check ratings and compare prices to find the best match.'
        : 'Procházejte poskytovatele služeb, čtěte recenze, kontrolujte hodnocení a porovnávejte ceny, abyste našli nejlepší volbu.'
    },
    {
      icon: Calendar,
      title: language === 'en' ? 'Book Appointment' : 'Rezervujte termín',
      description: language === 'en'
        ? 'Select your preferred time slot and book your appointment instantly with confirmation.'
        : 'Vyberte si preferovaný časový úsek a okamžitě si rezervujte termín s potvrzením.'
    },
    {
      icon: CheckCircle,
      title: language === 'en' ? 'Get Service Done' : 'Nechte si udělat službu',
      description: language === 'en'
        ? 'Visit the service provider at the scheduled time and get your car serviced by certified professionals.'
        : 'Navštivte poskytovatele služeb v naplánovaném čase a nechte si auto opravit certifikovanými odborníky.'
    }
  ]

  const serviceProviderSteps = [
    {
      icon: UserPlus,
      title: language === 'en' ? 'Create Your Profile' : 'Vytvořte si profil',
      description: language === 'en'
        ? 'Sign up and create a detailed business profile with your services, location, and certifications.'
        : 'Zaregistrujte se a vytvořte si podrobný obchodní profil se svými službami, polohou a certifikáty.'
    },
    {
      icon: FileText,
      title: language === 'en' ? 'List Your Services' : 'Uveďte své služby',
      description: language === 'en'
        ? 'Add all the automotive services you offer with detailed descriptions and competitive pricing.'
        : 'Přidejte všechny automobilové služby, které nabízíte, s podrobnými popisy a konkurenceschopnými cenami.'
    },
    {
      icon: Calendar,
      title: language === 'en' ? 'Manage Bookings' : 'Spravujte rezervace',
      description: language === 'en'
        ? 'Receive booking requests, manage your schedule, and confirm appointments with customers.'
        : 'Přijímejte žádosti o rezervaci, spravujte svůj rozvrh a potvrďte termíny se zákazníky.'
    },
    {
      icon: CreditCard,
      title: language === 'en' ? 'Get Paid' : 'Dostávejte zaplaceno',
      description: language === 'en'
        ? 'Provide excellent service, receive payments securely, and grow your business with positive reviews.'
        : 'Poskytujte vynikající služby, dostávejte platby bezpečně a rozvíjejte své podnikání s pozitivními recenzemi.'
    }
  ]

  const benefits = {
    client: [
      {
        icon: Shield,
        title: language === 'en' ? 'Verified Professionals' : 'Ověření odborníci',
        description: language === 'en'
          ? 'All service providers are verified and certified for quality assurance.'
          : 'Všichni poskytovatelé služeb jsou ověřeni a certifikováni pro zajištění kvality.'
      },
      {
        icon: Star,
        title: language === 'en' ? 'Real Reviews' : 'Skutečné recenze',
        description: language === 'en'
          ? 'Read authentic reviews from real customers to make informed decisions.'
          : 'Čtěte autentické recenze od skutečných zákazníků pro informované rozhodnutí.'
      },
      {
        icon: CreditCard,
        title: language === 'en' ? 'Secure Payments' : 'Bezpečné platby',
        description: language === 'en'
          ? 'Pay securely through our platform with multiple payment options.'
          : 'Plaťte bezpečně prostřednictvím naší platformy s více možnostmi plateb.'
      }
    ],
    provider: [
      {
        icon: User,
        title: language === 'en' ? 'More Customers' : 'Více zákazníků',
        description: language === 'en'
          ? 'Reach more customers in your area and grow your business.'
          : 'Oslovte více zákazníků ve své oblasti a rozšiřte své podnikání.'
      },
      {
        icon: Settings,
        title: language === 'en' ? 'Easy Management' : 'Snadná správa',
        description: language === 'en'
          ? 'Manage your bookings, schedule, and payments all in one place.'
          : 'Spravujte své rezervace, rozvrh a platby na jednom místě.'
      },
      {
        icon: MessageSquare,
        title: language === 'en' ? 'Direct Communication' : 'Přímá komunikace',
        description: language === 'en'
          ? 'Communicate directly with customers for better service coordination.'
          : 'Komunikujte přímo se zákazníky pro lepší koordinaci služeb.'
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {language === 'en' ? 'How FixPoints Works' : 'Jak FixPoints funguje'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Connecting car owners with trusted automotive professionals has never been easier. Discover how our platform works for both customers and service providers.'
              : 'Propojování majitelů aut s důvěryhodnými automobilovými odborníky nikdy nebylo jednodušší. Objevte, jak naše platforma funguje pro zákazníky i poskytovatele služeb.'
            }
          </p>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'For Car Owners' : 'Pro majitele aut'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' 
                ? 'Find and book automotive services in just a few clicks'
                : 'Najděte a rezervujte si automobilové služby jen v několika kliknutích'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {clientSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
                      <IconComponent className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              )
            })}
          </div>

          {/* Customer Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.client.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* For Service Providers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'For Service Providers' : 'Pro poskytovatele služeb'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' 
                ? 'Join our network and grow your automotive business'
                : 'Připojte se k naší síti a rozšiřte své automobilové podnikání'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {serviceProviderSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
                      <IconComponent className="w-10 h-10 text-green-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              )
            })}
          </div>

          {/* Provider Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.provider.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Ready to Get Started?' : 'Připraveni začít?'}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Join thousands of satisfied customers and service providers on FixPoints today.'
              : 'Připojte se k tisícům spokojených zákazníků a poskytovatelů služeb na FixPoints ještě dnes.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              {language === 'en' ? 'Find Services' : 'Najít služby'}
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              {language === 'en' ? 'Become a Provider' : 'Stát se poskytovatelem'}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}