// Predefined car services for autocomplete
export const CAR_SERVICES = [
  // Auto repair services
  { 
    id: 'autoopravna',
    name: 'Autoopravna', 
    category: 'Opravy',
    keywords: ['autoopravna', 'oprava', 'servis', 'motor', 'brzdy', 'převodovka']
  },
  { 
    id: 'vymena-oleje',
    name: 'Výměna oleje', 
    category: 'Údržba',
    keywords: ['výměna oleje', 'olej', 'motorový olej', 'servis']
  },
  { 
    id: 'myti-auta',
    name: 'Mytí auta', 
    category: 'Čištění',
    keywords: ['mytí', 'umývání', 'car wash', 'čištění', 'ruční mytí']
  },
  { 
    id: 'pneuservis',
    name: 'Pneuservis', 
    category: 'Pneumatiky',
    keywords: ['pneumatiky', 'pneuservis', 'přezutí', 'vyvážení', 'geometrie']
  },
  { 
    id: 'diagnostika',
    name: 'Diagnostika', 
    category: 'Kontrola',
    keywords: ['diagnostika', 'kontrola', 'chybové kódy', 'STK', 'emise']
  },
  { 
    id: 'detailing',
    name: 'Detailing', 
    category: 'Čištění',
    keywords: ['detailing', 'leštění', 'renovace', 'ochranné fólie', 'keramika']
  },
  { 
    id: 'klimatizace',
    name: 'Klimatizace', 
    category: 'Komfort',
    keywords: ['klimatizace', 'chlazení', 'plnění klimatizace', 'AC servis']
  },
  { 
    id: 'brzdy',
    name: 'Brzdy', 
    category: 'Bezpečnost',
    keywords: ['brzdy', 'brzdové kotouče', 'destičky', 'brzdinová kapalina']
  },
  { 
    id: 'odtahova-sluzba',
    name: 'Odtahová služba', 
    category: 'Nouzové služby',
    keywords: ['odtah', 'odtahová služba', 'pomoc na silnici', 'havárie']
  },
  { 
    id: 'elektrika',
    name: 'Elektrika', 
    category: 'Opravy',
    keywords: ['elektrika', 'elektrické systémy', 'baterie', 'alternátor', 'startér']
  },
  { 
    id: 'karoserie',
    name: 'Karosářské práce', 
    category: 'Opravy',
    keywords: ['karoserie', 'lakování', 'klempířské práce', 'nehoda']
  },
  { 
    id: 'stk',
    name: 'STK - Státní technická kontrola', 
    category: 'Kontrola',
    keywords: ['STK', 'státní technická kontrola', 'kontrola', 'technická', 'pravidelná kontrola', 'povinná kontrola']
  },
  { 
    id: 'ek',
    name: 'EK - Měření emisí', 
    category: 'Kontrola',
    keywords: ['EK', 'emise', 'měření emisí', 'emisní kontrola', 'výfuk', 'katalyzátor']
  },
  { 
    id: 'stk-ek',
    name: 'STK + EK', 
    category: 'Kontrola',
    keywords: ['STK EK', 'STK a EK', 'technická kontrola + emise', 'kompletní kontrola', 'povinné kontroly']
  },
  { 
    id: 'predstk',
    name: 'PředSTK kontrola', 
    category: 'Kontrola',
    keywords: ['předSTK', 'příprava na STK', 'kontrola před STK', 'prověrka', 'předběžná kontrola']
  },
  { 
    id: 'motorova-brzda',
    name: 'Kontrola motorové brzdy', 
    category: 'Kontrola',
    keywords: ['motorová brzda', 'brzda motoru', 'kontrola brzd', 'brzdný systém', 'EK brzda']
  }
]

// Function to search services based on query
export const searchServices = (query: string): typeof CAR_SERVICES => {
  if (!query || query.length < 2) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  
  return CAR_SERVICES.filter(service => {
    // Search in name
    if (service.name.toLowerCase().includes(normalizedQuery)) {
      return true
    }
    
    // Search in keywords
    return service.keywords.some(keyword => 
      keyword.toLowerCase().includes(normalizedQuery)
    )
  }).slice(0, 8) // Limit results
}