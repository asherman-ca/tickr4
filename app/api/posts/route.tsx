import { prisma } from '@/prisma/Prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const coinId = request.nextUrl.searchParams.get('coinId')

	const coinPosts = await prisma.posts.findMany({
		where: {
			coinId: coinId!,
		},
		include: {
			user: {
				select: {
					name: true,
					image: true,
				},
			},
		},
	})

	return NextResponse.json(coinPosts)
}
