import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CoinTable from './components/CoinTable'
import { getCoins } from './util/requests'
import { coinType } from '@/app/util/types'

import { testCoins } from '@/testdata/coins'

export const revalidate = 300

export default async function Home() {
	const session = await getServerSession(authOptions)
	// const coins: coinType[] | [] = await getCoins()
	const coins: coinType[] = testCoins as any
	// let coins: coinType[] | [] = []
	// try {
	// coins = await getCoins()
	// } catch (e) {
	// console.log(e)
	// }

	return <CoinTable coins={coins} session={session} />
}
