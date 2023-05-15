import { getCoin, getCoinHistory, getCoins, getNews } from '@/app/util/requests'
import { getServerSession } from 'next-auth'
import Content from './Content'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// incrementally static regeneration
export const revalidate = 300
export async function getStaticParams() {
	const coins = await getCoins()
	return coins.map((coin) => ({
		id: coin.id,
	}))
}

const page = async ({ params }: { params: { id: string } }) => {
	const [session, coin, history, news] = await Promise.all([
		getServerSession(authOptions),
		getCoin(params.id),
		getCoinHistory(params.id),
		getNews(params.id),
	])
	// const coin = await getCoin(params.id)
	// const session = await getServerSession(authOptions)
	// const news = await getNews(params.id)
	// const history = await getCoinHistory(params.id)

	console.log('COIN', coin)

	const fakeCoin = {
		name: 'Ethereum',
		symbol: 'ETH',
		market_data: { current_price: { usd: 1000 } },
	}

	return <Content coin={coin} session={session} news={news} history={history} />
}

export default page
