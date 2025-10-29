import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        service: {
          include: {
            category: true,
            images: {
              orderBy: {
                order: 'asc'
              },
              take: 1
            },
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
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate average ratings for each service
    const favoritesWithRatings = favorites.map(favorite => {
      const service = favorite.service
      const totalRating = service.reviews.reduce((sum: number, review: any) => sum + review.rating, 0)
      const averageRating = service.reviews.length > 0 ? totalRating / service.reviews.length : 0

      return {
        id: favorite.id,
        createdAt: favorite.createdAt,
        service: {
          id: service.id,
          name: service.name,
          description: service.description,
          category: service.category.name,
          address: service.address,
          city: service.city,
          rating: averageRating,
          reviewCount: service._count.reviews,
          image: service.images[0]?.url || '/services/default-service.svg',
          priceRange: service.priceRange,
          isVerified: service.isVerified
        }
      }
    })

    return NextResponse.json({ favorites: favoritesWithRatings })

  } catch (error) {
    console.error('Favorites API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { serviceId } = body

    if (!serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      )
    }

    // Check if service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    })

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_serviceId: {
          userId: session.user.id,
          serviceId: serviceId
        }
      }
    })

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Service already in favorites' },
        { status: 400 }
      )
    }

    // Add to favorites
    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        serviceId: serviceId
      },
      include: {
        service: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({ favorite }, { status: 201 })

  } catch (error) {
    console.error('Add favorite error:', error)
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')

    if (!serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      )
    }

    // Remove from favorites
    await prisma.favorite.deleteMany({
      where: {
        userId: session.user.id,
        serviceId: serviceId
      }
    })

    return NextResponse.json({ message: 'Removed from favorites' })

  } catch (error) {
    console.error('Remove favorite error:', error)
    return NextResponse.json(
      { error: 'Failed to remove favorite' },
      { status: 500 }
    )
  }
}