import { getCoins, getUserProfile } from '../util/requests'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import ProfileTable from './components/ProfileTable'
import { redirect } from 'next/navigation'

async function page() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/')
	} else {
	}
	const coins = await getCoins()

	return (
		<div className='flex flex-col py-8 gap-4'>
			<div className='text-2xl font-bold px-12'>Profile</div>
			<ProfileTable coins={coins} session={session} />
		</div>
	)
}

export default page
