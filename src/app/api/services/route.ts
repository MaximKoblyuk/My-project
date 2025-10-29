import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const minRating = parseFloat(searchParams.get('minRating') || '0')
    
    const where: any = {
      isActive: true,
    }

    if (category) {
      where.category = {
        slug: category
      }
    }

    if (location) {
      where.city = {
        contains: location,
        mode: 'insensitive'
      }
    }

    // Get services with reviews for rating calculation
    const services = await prisma.service.findMany({
      where,
      include: {
        category: true,
        reviews: {
          select: {
            rating: true
          }
        },
        images: {
          orderBy: {
            order: 'asc'
          },
          take: 1
        },
        _count: {
          select: {
            reviews: true,
            favorites: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    // Calculate average ratings and filter by minRating
    const servicesWithRatings = services
      .map(service => {
        const totalRating = service.reviews.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = service.reviews.length > 0 ? totalRating / service.reviews.length : 0
        
        return {
          id: service.id,
          name: service.name,
          description: service.description,
          category: service.category.name,
          categorySlug: service.category.slug,
          address: service.address,
          city: service.city,
          state: service.state,
          phone: service.phone,
          website: service.website,
          rating: averageRating,
          reviewCount: service._count.reviews,
          favoriteCount: service._count.favorites,
          isVerified: service.isVerified,
          priceRange: service.priceRange,
          image: service.images[0]?.url || '/services/default-service.svg',
          location: {
            lat: service.latitude,
            lng: service.longitude
          }
        }
      })
      .filter(service => service.rating >= minRating)

    const totalCount = await prisma.service.count({ where })

    return NextResponse.json({
      services: servicesWithRatings,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('Services API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'categoryId', 'address', 'city', 'state']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    const service = await prisma.service.create({
      data: {
        name: body.name,
        description: body.description,
        categoryId: body.categoryId,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        phone: body.phone,
        email: body.email,
        website: body.website,
        latitude: body.latitude,
        longitude: body.longitude,
        openingHours: body.openingHours,
        priceRange: body.priceRange,
        ownerId: body.ownerId,
      },
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ service }, { status: 201 })

  } catch (error) {
    console.error('Create service error:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}