import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {
      isHidden: false
    }

    if (serviceId) {
      where.serviceId = serviceId
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        service: {
          select: {
            id: true,
            name: true,
            category: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const totalCount = await prisma.review.count({ where })

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('Reviews API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
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
    const { serviceId, rating, title, content } = body

    // Validate required fields
    if (!serviceId || !rating || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceId, rating, content' },
        { status: 400 }
      )
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
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

    // Check if user already reviewed this service
    const existingReview = await prisma.review.findUnique({
      where: {
        userId_serviceId: {
          userId: session.user.id,
          serviceId: serviceId
        }
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this service' },
        { status: 400 }
      )
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        rating,
        title,
        content,
        userId: session.user.id,
        serviceId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        service: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({ review }, { status: 201 })

  } catch (error) {
    console.error('Create review error:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}