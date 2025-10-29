import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const categories = [
    {
      name: 'Autoopravna',
      slug: 'autoopravna',
      description: 'Obecné opravy a servis automobilů',
      icon: 'wrench',
      color: '#3B82F6'
    },
    {
      name: 'Výměna oleje',
      slug: 'vymena-oleje',
      description: 'Rychlá výměna motorového oleje',
      icon: 'droplets',
      color: '#059669'
    },
    {
      name: 'Mytí auta',
      slug: 'myti-auta',
      description: 'Mytí a čištění automobilů',
      icon: 'car',
      color: '#0891B2'
    },
    {
      name: 'Pneumatiky',
      slug: 'pneuservis',
      description: 'Prodej a servis pneumatik',
      icon: 'circle',
      color: '#DC2626'
    },
    {
      name: 'Diagnostika',
      slug: 'diagnostika',
      description: 'Technická diagnostika vozidel',
      icon: 'search',
      color: '#7C3AED'
    },
    {
      name: 'Detailing',
      slug: 'detailing',
      description: 'Profesionální čištění a úprava vozidel',
      icon: 'sparkles',
      color: '#EA580C'
    },
    {
      name: 'Klimatizace',
      slug: 'klimatizace',
      description: 'Servis a plnění klimatizace',
      icon: 'wind',
      color: '#0D9488'
    },
    {
      name: 'Brzdy',
      slug: 'brzdy',
      description: 'Opravy a výměna brzdového systému',
      icon: 'shield',
      color: '#B91C1C'
    }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  console.log('✅ Categories created')

  // Create test user
  const hashedPassword = await bcryptjs.hash('password123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@fixpoints.cz' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@fixpoints.cz',
      password: hashedPassword,
      provider: 'email'
    }
  })

  console.log('✅ Test user created')

  // Create sample services
  const autoopravnaCategory = await prisma.category.findUnique({
    where: { slug: 'autoopravna' }
  })

  if (autoopravnaCategory) {
    const sampleServices = [
      {
        name: 'Premium Auto Care Praha',
        description: 'Kompletní autoservis s certifikovanými mechaniky. Specializujeme se na všechny značky vozidel.',
        categoryId: autoopravnaCategory.id,
        address: 'Wenceslas Square 1',
        city: 'Praha',
        state: 'Praha',
        zipCode: '11000',
        phone: '+420 800 123 456',
        email: 'info@premiumautocare.cz',
        website: 'https://premiumautocare.cz',
        latitude: 50.0755,
        longitude: 14.4378,
        priceRange: '$$',
        isVerified: true,
        ownerId: testUser.id
      },
      {
        name: 'Quick Fix Autoservis',
        description: 'Rychlé a spolehlivé opravy za dostupné ceny. Otevřeno 7 dní v týdnu.',
        categoryId: autoopravnaCategory.id,
        address: 'Národní třída 116',
        city: 'Praha',
        state: 'Praha',
        zipCode: '11000',
        phone: '+420 800 654 321',
        email: 'kontakt@quickfix.cz',
        latitude: 50.0819,
        longitude: 14.4199,
        priceRange: '$',
        isVerified: false,
        ownerId: testUser.id
      }
    ]

    for (const service of sampleServices) {
      await prisma.service.upsert({
        where: { 
          name_city: {
            name: service.name,
            city: service.city
          }
        },
        update: {},
        create: service
      })
    }

    console.log('✅ Sample services created')
  }

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })