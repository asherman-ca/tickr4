import { prisma } from '@/prisma/Prisma'
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
	const session: any = await getServerSession(authOptions)

	const user = await prisma.user.findUnique({
		where: {
			id: session?.user?.id,
		},
		include: {
			likes: true,
			orders: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	})

	return NextResponse.json(user)
}
