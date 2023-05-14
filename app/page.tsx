import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CoinTable from './components/CoinTable'
import { getCoins } from './util/requests'
import { coinType } from '@/app/util/types'

export const revalidate = 300

export default async function Home() {
	const session = await getServerSession(authOptions)
	const coins: coinType[] | [] = await getCoins()
	// let coins: coinType[] | [] = []
	// try {
	// coins = await getCoins()
	// } catch (e) {
	// console.log(e)
	// }

	return <CoinTable coins={coins} session={session} />
}
