import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CoinTable from './components/CoinTable'
import { getCoins, getGlobal } from './util/requests'
import { coinType } from '@/app/util/types'
import Highlights from './components/Highlights'

export const revalidate = 300

export default async function Home() {
	const globals = await getGlobal()
	const session = await getServerSession(authOptions)
	const coins: coinType[] | [] = await getCoins()

	const hourTrends = [...coins]
		.sort(
			(a, b) =>
				Math.abs(b.price_change_percentage_1h_in_currency) -
				Math.abs(a.price_change_percentage_1h_in_currency)
		)
		.slice(0, 9)
	const dayTrends = [...coins]
		.sort(
			(a, b) =>
				Math.abs(b.price_change_percentage_24h_in_currency) -
				Math.abs(a.price_change_percentage_24h_in_currency)
		)
		.slice(0, 9)
	const weekTrends = [...coins]
		.sort(
			(a, b) =>
				Math.abs(b.price_change_percentage_7d_in_currency) -
				Math.abs(a.price_change_percentage_7d_in_currency)
		)
		.slice(0, 9)

	return (
		<div className='flex flex-col pt-6 pb-4 flex-1 bg-[#FBFCFD]'>
			<Highlights
				hourTrends={hourTrends}
				dayTrends={dayTrends}
				weekTrends={weekTrends}
				globals={globals}
			/>
			<CoinTable coins={coins} session={session} />
		</div>
	)
}
