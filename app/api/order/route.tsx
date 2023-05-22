import { prisma } from '@/prisma/Prisma'
import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
	const session: any = await getServerSession(authOptions)

	const orders = await prisma.order.findMany({
		where: {
			userId: session.user.id,
		},
	})

	return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
	const session: any = await getServerSession(authOptions)
	const data = await request.json()
	console.log('data', data)

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	})

	if (user?.balance! < data.amount) {
		return NextResponse.json({
			error: 'Insufficient funds',
		})
	}

	const order = await prisma.order.create({
		data: {
			...data,
			userId: session.user.id,
		},
	})

	const updatedUser = await prisma.user.update({
		where: {
			id: session.user.id,
		},
		data: {
			balance: user!.balance - data.amount,
		},
	})

	return NextResponse.json(order)
}
