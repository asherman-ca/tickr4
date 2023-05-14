import { getCoin, getUserLike } from '@/app/util/requests'
import { getServerSession } from 'next-auth'
import Content from './Content'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const dynamic = 'force-dynamic'

const page = async ({ params }: { params: { id: string } }) => {
	const coin = await getCoin(params.id)
	const session = await getServerSession(authOptions)

	return <Content coin={coin} session={session} />
}

export default page
