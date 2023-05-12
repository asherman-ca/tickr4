import { coinType } from './types'

export const getCoins = async (): Promise<coinType[]> => {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d'
	)
	return response.json()
}
