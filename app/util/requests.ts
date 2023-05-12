import { coinType, globalType } from './types'
import { cache } from 'react'

export const getCoins = cache(async (): Promise<coinType[]> => {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d'
	)
	return response.json()
})

export const getGlobal = cache(async (): Promise<globalType> => {
	const response = await fetch('https://api.coingecko.com/api/v3/global')
	return response.json()
})
