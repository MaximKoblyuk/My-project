'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  Star,
  Target,
  Zap,
  Globe
} from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const { language } = useLanguage()

  const stats = [
    {
      number: '50,000+',
      label: language === 'en' ? 'Happy Customers' : 'Spokojených zákazníků'
    },
    {
      number: '2,500+',
      label: language === 'en' ? 'Verified Partners' : 'Ověřených partnerů'
    },
    {
      number: '150+',
      label: language === 'en' ? 'Cities Covered' : 'Pokrytých měst'
    },
    {
      number: '4.8/5',
      label: language === 'en' ? 'Average Rating' : 'Průměrné hodnocení'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: language === 'en' ? 'Customer First' : 'Zákazník na prvním místě',
      description: language === 'en' 
        ? 'Every decision we make starts with thinking about our customers and their automotive needs.'
        : 'Každé rozhodnutí začínáme myšlenkou na naše zákazníky a jejich automobilové potřeby.'
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Trust & Safety' : 'Důvěra a bezpečnost',
      description: language === 'en'
        ? 'All our service providers are verified, certified, and regularly reviewed for quality assurance.'
        : 'Všichni naši poskytovatelé služeb jsou ověřeni, certifikováni a pravidelně kontrolováni.'
    },
    {
      icon: Zap,
      title: language === 'en' ? 'Innovation' : 'Inovace',
      description: language === 'en'
        ? 'We constantly improve our platform with new technologies to make car service booking easier.'
        : 'Neustále vylepšujeme naši platformu novými technologiemi pro jednodušší rezervaci služeb.'
    },
    {
      icon: Globe,
      title: language === 'en' ? 'Accessibility' : 'Dostupnost',
      description: language === 'en'
        ? 'Quality automotive services should be accessible to everyone, everywhere in the Czech Republic.'
        : 'Kvalitní automobilové služby by měly být dostupné všem, všude v České republice.'
    }
  ]

  const team = [
    {
      name: 'Maxim ',
      role: language === 'en' ? 'CEO & Founder' : 'CEO a zakladatel',
      description: language === 'en' 
        ? 'Former automotive engineer with 15 years of experience in the car service industry.'
        : 'Bývalý automobilový inženýr s 15letou zkušeností v oboru autoservisů.',
      image: '/team/ceo.jpg'
    },
    {
      name: 'Jevgen ',
      role: language === 'en' ? 'CTO & Co-founder' : 'CTO a spoluzakladatelka',
      description: language === 'en'
        ? 'Technology expert focused on creating user-friendly platforms for automotive services.'
        : 'Technologická expertka zaměřená na vytváření uživatelsky přívětivých platforem pro automobilové služby.',
      image: '/team/cto.jpg'
    },
    {
      name: 'Martin',
      role: language === 'en' ? 'Head of Operations' : 'Vedoucí provozu',
      description: language === 'en'
        ? 'Ensures quality standards and manages relationships with service providers across the country.'
        : 'Zajišťuje kvalitní standardy a spravuje vztahy s poskytovateli služeb po celé zemi.',
      image: '/team/operations.jpg'
    }
  ]

  const milestones = [
    {
      year: '2025',
      title: language === 'en' ? 'Company Founded' : 'Založení společnosti',
      description: language === 'en' 
        ? 'FixPoint was founded with the vision to revolutionize how people find automotive services.'
        : 'FixPoint byl založen s vizí revolučně změnit způsob, jakým lidé hledají automobilové služby.'
    },
    {
      year: '2025',
      title: language === 'en' ? 'First 1,000 Partners' : 'Prvních 1 000 partnerů',
      description: language === 'en'
        ? 'Reached our first milestone of 1,000 verified service providers across major Czech cities.'
        : 'Dosáhli jsme prvního milníku 1 000 ověřených poskytovatelů služeb ve velkých českých městech.'
    },
    {
      year: '2025',
      title: language === 'en' ? 'Mobile App Launch' : 'Spuštění mobilní aplikace',
      description: language === 'en'
        ? 'Launched our mobile application, making it even easier to book services on the go.'
        : 'Spustili jsme mobilní aplikaci, která ještě více zjednodušila rezervaci služeb na cestách.'
    },
    {
      year: '2025',
      title: language === 'en' ? 'National Coverage' : 'Celostátní pokrytí',
      description: language === 'en'
        ? 'Expanded to cover all regions of the Czech Republic with 24/7 customer support.'
        : 'Rozšířili jsme se do všech regionů České republiky s 24/7 zákaznickou podporou.'
    },
    {
      year: '2025',
      title: language === 'en' ? '50,000 Happy Customers' : '50 000 spokojených zákazníků',
      description: language === 'en'
        ? 'Celebrated serving over 50,000 satisfied customers and winning multiple industry awards.'
        : 'Oslavili jsme obsloužení více než 50 000 spokojených zákazníků a získání několika oborových ocenění.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              {language === 'en' ? 'About FixPoint' : 'O FixPoint'}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              {language === 'en' 
                ? 'We are revolutionizing the way people find and book automotive services in the Czech Republic. Our mission is to connect car owners with trusted, certified professionals who provide excellent service at fair prices.'
                : 'Revolučně měníme způsob, jakým lidé hledají a rezervují automobilové služby v České republice. Naším posláním je spojovat majitele aut s důvěryhodnými, certifikovanými odborníky, kteří poskytují vynikající služby za férové ceny.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              {language === 'en' ? 'Our Story' : 'Náš příběh'}
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              {language === 'en' ? (
                <div className="space-y-6">
                  <p>
                    FixPoint was born from a simple frustration: finding reliable automotive services shouldn't be a gamble. 
                    Our founders, both car enthusiasts and technology experts, experienced firsthand the challenges of 
                    finding trustworthy mechanics, fair pricing, and convenient scheduling.
                  </p>
                  <p>
                    In 2020, we set out to solve this problem by creating a platform that brings transparency, 
                    trust, and convenience to the automotive service industry. We started by carefully vetting 
                    service providers in Prague and gradually expanded across the Czech Republic.
                  </p>
                  <p>
                    Today, FixPoint is the leading platform for automotive services in the Czech Republic, 
                    connecting thousands of car owners with certified professionals every day. We're proud to 
                    have built a community based on trust, quality, and exceptional customer service.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p>
                    FixPoint vznikl z jednoduché frustrace: hledání spolehlivých automobilových služeb by nemělo být hazard. 
                    Naši zakladatelé, milovníci aut i technologičtí experti, zažili na vlastní kůži výzvy při 
                    hledání důvěryhodných mechaniků, férových cen a pohodlného plánování.
                  </p>
                  <p>
                    V roce 2020 jsme se rozhodli tento problém vyřešit vytvořením platformy, která přináší transparentnost, 
                    důvěru a pohodlí do odvětví automobilových služeb. Začali jsme pečlivým ověřováním 
                    poskytovatelů služeb v Praze a postupně jsme se rozšířili po celé České republice.
                  </p>
                  <p>
                    Dnes je FixPoint vedoucí platformou pro automobilové služby v České republice, 
                    která každý den spojuje tisíce majitelů aut s certifikovanými odborníky. Jsme hrdí na to, 
                    že jsme vybudovali komunitu založenou na důvěře, kvalitě a výjimečném zákaznickém servisu.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {language === 'en' ? 'Our Values' : 'Naše hodnoty'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {language === 'en' ? 'Meet Our Team' : 'Poznejte náš tým'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {language === 'en' ? 'Our Journey' : 'Naše cesta'}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm z-10">
                      {milestone.year}
                    </div>
                    <div className="ml-8 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              {language === 'en' ? 'Get in Touch' : 'Kontaktujte nás'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'Address' : 'Adresa'}
                </h3>
                <p className="text-gray-600">
                  Wenceslas Square 1<br />
                  110 00 Prague 1<br />
                  Czech Republic
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 text-center">
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'en' ? 'Phone' : 'Telefon'}
                </h3>
                <p className="text-gray-600">
                  +420 800 123 456<br />
                  <span className="text-sm">{language === 'en' ? '24/7 Support' : '24/7 podpora'}</span>
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 text-center">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">
                  info@fixpoint.cz<br />
                  support@fixpoint.cz
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'en' ? 'Ready to Experience FixPoint?' : 'Připraveni vyzkoušet FixPoint?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Join thousands of satisfied customers who trust FixPoint for all their automotive needs.'
              : 'Připojte se k tisícům spokojených zákazníků, kteří důvěřují FixPoint ve všech automobilových potřebách.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              {language === 'en' ? 'Find Services' : 'Najít služby'}
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              {language === 'en' ? 'Become a Partner' : 'Stát se partnerem'}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}