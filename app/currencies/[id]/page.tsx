import { getCoin, getUserLike } from '@/app/util/requests'
import { getServerSession } from 'next-auth'
import { AuthOptions } from 'next-auth'
import Content from './Content'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const page = async ({ params }: { params: { id: string } }) => {
	const coin = await getCoin(params.id)
	const session = await getServerSession(authOptions)
	let initialLike = false
	if (session) {
		initialLike = await getUserLike(params.id)
	}

	return <Content coin={coin} session={session} initialLike={!!initialLike} />
}

export default page
