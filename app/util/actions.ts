import { coinTableType, sortParamType } from '@/app/util/types'
import { useMemo } from 'react'

export const displayCoinsMemo = (
	coins: coinTableType[],
	loading: boolean,
	sortParam: { type: string; direction: string }
) => {
	return useMemo(() => {
		const { type, direction } = sortParam

		if (sortParam.type === 'mcap') {
			if (sortParam.direction === 'desc') {
				return coins.sort((a, b) => {
					return a.market_cap_rank - b.market_cap_rank
				})
			} else {
				return coins.sort((a, b) => {
					return b.market_cap_rank - a.market_cap_rank
				})
			}
		} else if (type === '7d') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return (
						b.price_change_percentage_7d_in_currency -
						a.price_change_percentage_7d_in_currency
					)
				})
			} else {
				return coins.sort((a, b) => {
					return (
						a.price_change_percentage_7d_in_currency -
						b.price_change_percentage_7d_in_currency
					)
				})
			}
		} else if (type === '24hr') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return b.price_change_percentage_24h - a.price_change_percentage_24h
				})
			} else {
				return coins.sort((a, b) => {
					return a.price_change_percentage_24h - b.price_change_percentage_24h
				})
			}
		} else if (type === '1hr') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return (
						b.price_change_percentage_1h_in_currency -
						a.price_change_percentage_1h_in_currency
					)
				})
			} else {
				return coins.sort((a, b) => {
					return (
						a.price_change_percentage_1h_in_currency -
						b.price_change_percentage_1h_in_currency
					)
				})
			}
		} else if (type === 'volume') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return b.total_volume - a.total_volume
				})
			} else {
				return coins.sort((a, b) => {
					return a.total_volume - b.total_volume
				})
			}
		}
	}, [coins, loading, sortParam])
}
