import { getCoins, getUserLikes } from './util/requests'
import CoinItem from './components/CoinItem'

export const dynamic = 'force-dynamic'
// export const cache = 'no-store'
// export const revalidate = 0
// export const dynamic = 'force-static'
// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
	let coins = []
	let likes = []
	try {
		coins = await getCoins()
		likes = await getUserLikes()
	} catch (e) {
		console.log(e)
	}

	return (
		<main>
			{coins?.slice(0, 10).map((coin) => (
				<CoinItem key={coin.id} coin={coin} />
			))}
			{likes?.map((like) => (
				<div>{like.coinId}</div>
			))}
		</main>
	)
}
