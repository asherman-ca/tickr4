import { prisma } from '@/prisma/Prisma'
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
	const session = await getServerSession(authOptions)

	const userLikes = await prisma.likes.findMany({
		where: {
			userId: session?.user?.id!,
		},
	})

	return NextResponse.json(userLikes)
}
