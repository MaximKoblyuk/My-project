import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const location = searchParams.get('location')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const where: any = {}

    if (category && category !== 'all') {
      where.category = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (location) {
      where.address = { contains: location, mode: 'insensitive' }
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.service.count({ where })
    ])

    // Calculate average ratings
    const servicesWithRatings = services.map((service: any) => {
      const ratings = service.reviews.map((r: any) => r.rating)
      const averageRating = ratings.length > 0 
        ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
        : 0
      
      return {
        ...service,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: service._count.reviews,
        reviews: undefined, // Remove reviews from response
        _count: undefined // Remove count from response
      }
    })

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      services: servicesWithRatings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Services fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      category,
      address,
      phone,
      email,
      website,
      openingHours,
      priceRange,
      latitude,
      longitude
    } = await req.json()

    if (!name || !description || !category || !address) {
      return NextResponse.json(
        { error: 'Name, description, category, and address are required' },
        { status: 400 }
      )
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        category,
        address,
        phone: phone || null,
        email: email || null,
        website: website || null,
        openingHours: openingHours || null,
        priceRange: priceRange || null,
        latitude: latitude || null,
        longitude: longitude || null
      }
    })

    return NextResponse.json({ service }, { status: 201 })
  } catch (error) {
    console.error('Service creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}