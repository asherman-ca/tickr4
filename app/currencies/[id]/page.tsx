import { getCoin, getCoinHistory, getCoins, getNews } from '@/app/util/requests'
import { getServerSession } from 'next-auth'
import Content from './Content'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import bitcoin from '@/testdata/bitcoin.json'
import { coinHistory } from '@/testdata/coinHistory'
import everything from '@/testdata/everything.json'

// incrementally static regeneration
export const revalidate = 300
export async function getStaticParams() {
	const coins = await getCoins()
	return coins.map((coin) => ({
		id: coin.id,
	}))
}

const page = async ({ params }: { params: { id: string } }) => {
	// const [session, coin, history, news] = await Promise.all([
	// 	getServerSession(authOptions),
	// 	getCoin(params.id),
	// 	getCoinHistory(params.id),
	// 	getNews(params.id),
	// ])

	const session = await getServerSession(authOptions)
	const coin = JSON.parse(JSON.stringify(bitcoin))
	const history = coinHistory
	const parsedNews = JSON.parse(JSON.stringify(everything))
		.articles.slice(0, 5)
		.sort((a: any, b: any) => {
			return (
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
			)
		})

	// const parsedNews = JSON.parse(JSON.stringify(news))
	// 	.articles.slice(0, 5)
	// 	.sort((a: any, b: any) => {
	// 		return (
	// 			new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	// 		)
	// 	})

	return (
		<Content
			coin={coin}
			session={session}
			news={parsedNews}
			history={history.prices}
		/>
	)
}

export default page
