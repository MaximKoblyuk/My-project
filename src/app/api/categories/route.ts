import { NextResponse } from 'next/server'

const categories = [
  {
    id: '1',
    name: 'Auto Service',
    slug: 'auto-service',
    description: 'General automotive services',
    icon: '🔧'
  },
  {
    id: '2',
    name: 'STK (Technical Inspection)',
    slug: 'stk',
    description: 'Technical vehicle inspections',
    icon: '🔍'
  },
  {
    id: '3',
    name: 'EK (Emissions Testing)',
    slug: 'ek',
    description: 'Vehicle emissions testing',
    icon: '🌿'
  },
  {
    id: '4',
    name: 'Tire Service',
    slug: 'tire-service',
    description: 'Tire installation and repair',
    icon: '🛞'
  },
  {
    id: '5',
    name: 'Car Wash',
    slug: 'car-wash',
    description: 'Vehicle cleaning services',
    icon: '🚿'
  },
  {
    id: '6',
    name: 'Oil Change',
    slug: 'oil-change',
    description: 'Engine oil and fluid services',
    icon: '🛢️'
  }
]

export async function GET() {
  try {
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Categories fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}