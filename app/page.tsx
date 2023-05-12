import { getCoins } from './util/requests'

export const revalidate = 300

export default async function Home() {
	const coins = await getCoins()

	return <main>{coins[0].id}</main>
}
