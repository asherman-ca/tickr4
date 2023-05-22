import { getCoins } from '@/app/util/requests'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Testnet from './components/Testnet'
import { redirect } from 'next/navigation'

async function page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/')
	}
	const coins = await getCoins()
	// coins.sort((a, b) => a.market_cap_rank - b.market_cap_rank)

	return <Testnet coins={coins} session={session} />
}

export default page
