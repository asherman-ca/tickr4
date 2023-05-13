import { prisma } from '@/prisma/Prisma'
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
	const session = await getServerSession(authOptions)
	const coinId = await request.nextUrl.searchParams.get('coinId')

	const userLike = await prisma.likes.findFirst({
		where: {
			userId: session?.user?.id!,
			coinId: coinId!,
		},
	})

	return NextResponse.json(userLike)
}

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions)
	const coinId = await request.nextUrl.searchParams.get('coinId')

	const userLike = await prisma.likes.create({
		data: {
			userId: session?.user?.id!,
			coinId: coinId!,
		},
	})

	return NextResponse.json(userLike)
}

export async function DELETE(request: NextRequest) {
	const session = await getServerSession(authOptions)
	const coinId = await request.nextUrl.searchParams.get('coinId')

	const userLike = await prisma.likes.delete({
		where: {
			userId_coinId: {
				userId: session?.user?.id!,
				coinId: coinId!,
			},
		},
	})

	return NextResponse.json(userLike)
}
