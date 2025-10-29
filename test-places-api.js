// Test script pro stahování Google Places dat pro všechny kategorie
const categories = [
  'autoopravna',
  'vymena-oleje', 
  'myti-auta',
  'pneuservis',
  'diagnostika',
  'detailing',
  'klimatizace',
  'brzdy',
  'stk',
  'odtah'
]

const location = 'Praha, Czech Republic'
const baseUrl = 'http://localhost:3001/api/places'

async function testCategory(category) {
  try {
    console.log(`\n🔍 Testování kategorie: ${category}`)
    
    const url = `${baseUrl}?category=${category}&location=${encodeURIComponent(location)}`
    const response = await fetch(url)
    
    if (!response.ok) {
      const error = await response.text()
      console.log(`❌ Chyba pro ${category}: ${response.status} - ${error}`)
      return
    }
    
    const data = await response.json()
    
    console.log(`✅ ${category}:`)
    console.log(`   📍 Lokace: ${data.location}`)
    console.log(`   📊 Celkem služeb: ${data.total}`)
    
    if (data.services && data.services.length > 0) {
      console.log(`   🏪 První 3 služby:`)
      data.services.slice(0, 3).forEach((service, index) => {
        console.log(`     ${index + 1}. ${service.name}`)
        console.log(`        ⭐ ${service.rating}/5 (${service.reviewCount} recenzí)`)
        console.log(`        📍 ${service.address}`)
        console.log(`        🕒 ${service.openNow ? 'Otevřeno' : 'Zavřeno'}`)
      })
    } else {
      console.log(`   ❌ Žádné služby nenalezeny`)
    }
    
  } catch (error) {
    console.log(`💥 Chyba při načítání ${category}:`, error.message)
  }
}

async function testAllCategories() {
  console.log('🚗 FixPoints - Test Google Places API pro všechny kategorie')
  console.log('=' * 60)
  
  for (const category of categories) {
    await testCategory(category)
    // Krátká pauza mezi požadavky
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('\n✅ Test dokončen!')
}

// Spustit test
testAllCategories().catch(console.error)