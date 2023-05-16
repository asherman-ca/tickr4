import { prisma } from '@/prisma/Prisma'
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: NextRequest) {
	const session: any = await getServerSession(authOptions)
	const { content, coinId } = await request.json()
	const userPost = await prisma.posts.create({
		data: {
			content,
			coinId,
			userId: session?.user?.id!,
		},
	})

	return NextResponse.json(userPost)
}

export async function DELETE(request: NextRequest) {
	const session: any = await getServerSession(authOptions)
	const postId = await request.nextUrl.searchParams.get('postId')

	const userPost = await prisma.posts.deleteMany({
		where: {
			id: postId!,
			userId: session?.user?.id!,
		},
	})

	return NextResponse.json(userPost)
}
