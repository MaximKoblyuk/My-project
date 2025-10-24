'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'cs'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    'header.signIn': 'Sign In',
    'header.signUp': 'Sign Up',
    
    // Home Page
    'home.hero.title': 'Find the Best Car Services Near You with FixPoints',
    'home.hero.subtitle': 'Connect with trusted automotive professionals in your area. From oil changes to major repairs, we help you find the right service at the right price.',
    'home.featured.title': 'Featured Services',
    'home.categories.title': 'Service Categories',
    
    // Search
    'search.service.placeholder': 'What service do you need? (e.g., oil change, car wash)',
    'search.location.placeholder': 'Enter address',
    'search.button': 'Search',
    'search.distance.notSpecified': 'Not specified',
    'search.distance.exact': '+0 km',
    'search.distance.around': 'within {{distance}} km',
    'search.location.searchNearby': 'Search nearby',
    'search.location.selectCity': 'Select city',
    'search.location.useCustom': 'Use "{{location}}"',
    
    // Service Categories
    'category.oilChange': 'Oil Change',
    'category.brakeService': 'Brake Service',
    'category.tireService': 'Tire Service',
    'category.carWash': 'Car Wash',
    'category.autoRepair': 'Auto Repair',
    'category.diagnostics': 'Diagnostics',
    'category.detailing': 'Detailing',
    'category.acService': 'AC Service',
    'category.towingService': 'Towing Service',
    
    // Service Status
    'status.openNow': 'Open Now',
    'status.closed': 'Closed',
    'status.opens': 'Opens {{time}}',
    
    // Authentication
    'auth.signin.title': 'Sign in to FixPoints',
    'auth.signin.subtitle': 'Access your account to book services and manage appointments',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.signin.button': 'Sign In',
    'auth.signin.divider': 'Or continue with',
    'auth.google': 'Continue with Google',
    'auth.apple': 'Continue with Apple',
    'auth.noAccount': "Don't have an account?",
    'auth.signup': 'Sign up',
    
    // Common
    'common.distance.km': '{{distance}} km',
    'common.rating': '{{rating}} ({{count}} reviews)'
  },
  cs: {
    // Header
    'header.signIn': 'Přihlásit se',
    'header.signUp': 'Registrovat se',
    
    // Home Page
    'home.hero.title': 'Najděte nejlepší autoservisy ve vašem okolí s FixPoints',
    'home.hero.subtitle': 'Spojte se s důvěryhodnými automobilovými profesionály ve vaší oblasti. Od výměny oleje po velké opravy, pomůžeme vám najít správný servis za správnou cenu.',
    'home.featured.title': 'Doporučené služby',
    'home.categories.title': 'Kategorie služeb',
    
    // Search
    'search.service.placeholder': 'Jakou službu potřebujete? (např. výměna oleje, mytí auta)',
    'search.location.placeholder': 'Zadejte adresu',
    'search.button': 'Hledat',
    'search.distance.notSpecified': 'Nezadáno',
    'search.distance.exact': '+0 km',
    'search.distance.around': 'v okolí {{distance}} km',
    'search.location.searchNearby': 'Hledat v okolí',
    'search.location.selectCity': 'Vyberte město',
    'search.location.useCustom': 'Použít "{{location}}"',
    
    // Service Categories
    'category.oilChange': 'Výměna oleje',
    'category.brakeService': 'Brzdy',
    'category.tireService': 'Pneumatiky',
    'category.carWash': 'Mytí auta',
    'category.autoRepair': 'Autoopravna',
    'category.diagnostics': 'Diagnostika',
    'category.detailing': 'Detailing',
    'category.acService': 'Klimatizace',
    'category.towingService': 'Odtahová služba',
    
    // Service Status
    'status.openNow': 'Otevřeno',
    'status.closed': 'Zavřeno',
    'status.opens': 'Otevírá v {{time}}',
    
    // Authentication
    'auth.signin.title': 'Přihlaste se do FixPoints',
    'auth.signin.subtitle': 'Přihlaste se ke svému účtu pro rezervaci služeb a správu termínů',
    'auth.email': 'E-mail',
    'auth.password': 'Heslo',
    'auth.signin.button': 'Přihlásit se',
    'auth.signin.divider': 'Nebo pokračujte s',
    'auth.google': 'Pokračovat s Google',
    'auth.apple': 'Pokračovat s Apple',
    'auth.noAccount': 'Nemáte účet?',
    'auth.signup': 'Registrovat se',
    
    // Common
    'common.distance.km': '{{distance}} km',
    'common.rating': '{{rating}} ({{count}} hodnocení)'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('cs') // Default to Czech

  const t = (key: string): string => {
    try {
      const keys = key.split('.')
      let value: any = translations[language]
      
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k]
        } else {
          console.warn(`Translation key not found: ${key} at ${k}`)
          return key
        }
      }
      
      if (typeof value === 'string') {
        return value
      } else {
        console.warn(`Translation value is not a string for key: ${key}`)
        return key
      }
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error)
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Fallback for server-side rendering or missing provider
    return {
      language: 'cs' as Language,
      setLanguage: () => {},
      t: (key: string) => {
        // Simple fallback translation
        const fallbackTranslations: Record<string, string> = {
          'home.hero.title': 'Najděte nejlepší autoservisy ve vašem okolí s FixPoints',
          'home.hero.subtitle': 'Spojte se s důvěryhodnými automobilovými profesionály ve vaší oblasti. Od výměny oleje po velké opravy, pomůžeme vám najít správný servis za správnou cenu.',
          'home.featured.title': 'Doporučené služby',
          'home.categories.title': 'Kategorie služeb',
          'header.signIn': 'Přihlásit se',
          'header.signUp': 'Registrovat se',
          'search.button': 'Hledat',
          'search.service.placeholder': 'Jakou službu potřebujete? (např. výměna oleje, mytí auta)',
          'search.location.placeholder': 'Zadejte adresu',
          'search.distance.around': 'v okolí {{distance}} km',
          'search.distance.notSpecified': 'Nezadáno',
          'search.distance.exact': '+0 km',
          'search.location.searchNearby': 'Hledat v okolí',
          'search.location.selectCity': 'Vyberte město',
          'search.location.useCustom': 'Použít "{{location}}"',
          'category.autoRepair': 'Autoopravna',
          'category.oilChange': 'Výměna oleje',
          'category.carWash': 'Mytí auta',
          'category.tireService': 'Pneumatiky',
          'category.detailing': 'Detailing',
          'category.diagnostics': 'Diagnostika',
          'category.towingService': 'Odtahová služba',
          'status.openNow': 'Otevřeno',
          'status.closed': 'Zavřeno',
          'status.opens': 'Otevírá v {{time}}'
        }
        return fallbackTranslations[key] || key
      }
    }
  }
  return context
}