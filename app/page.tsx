import { getCoins } from './util/requests'
import CoinItem from './components/CoinItem'

// export const revalidate = 300
// export const dynamic = 'force-static'
// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
	const coins = await getCoins()

	return (
		<main>
			{coins.slice(0, 10).map((coin) => (
				<CoinItem key={coin.id} coin={coin} />
			))}
		</main>
	)
}
