import { coinTableType, sortParamType, coinType } from '@/app/util/types'
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
		} else {
			return coins
		}
	}, [coins, loading, sortParam])
}

export const handleSort = (
	type: string,
	sortParam: sortParamType,
	setSortParam: (argument: sortParamType) => void
) => {
	if (type === 'mcap') {
		if (sortParam.direction === 'desc' && sortParam.type === 'mcap') {
			setSortParam({ type: 'mcap', direction: 'asc' })
		} else {
			setSortParam({ type: 'mcap', direction: 'desc' })
		}
	} else if (type === '7d') {
		if (sortParam.direction === 'desc' && sortParam.type === '7d') {
			setSortParam({ type: '7d', direction: 'asc' })
		} else {
			setSortParam({ type: '7d', direction: 'desc' })
		}
	} else if (type === '24hr') {
		if (sortParam.direction === 'desc' && sortParam.type === '24hr') {
			setSortParam({ type: '24hr', direction: 'asc' })
		} else {
			setSortParam({ type: '24hr', direction: 'desc' })
		}
	} else if (type === '1hr') {
		if (sortParam.direction === 'desc' && sortParam.type === '1hr') {
			setSortParam({ type: '1hr', direction: 'asc' })
		} else {
			setSortParam({ type: '1hr', direction: 'desc' })
		}
	} else if (type === 'volume') {
		if (sortParam.direction === 'desc' && sortParam.type === 'volume') {
			setSortParam({ type: 'volume', direction: 'asc' })
		} else {
			setSortParam({ type: 'volume', direction: 'desc' })
		}
	}
}

export const calcPNL = (orders: any[], coins: coinType[]) => {
	let accounts = {} as any

	let buys = orders.filter((order: any) => order.type === 'Buy')

	let sells = orders.filter((order: any) => order.type === 'Sell')

	buys?.forEach((order: any) => {
		if (!accounts[order.coin]) {
			accounts[order.coin] = {
				coin: order.coin,
				amount: order.amount,
				total: order.amount / order.price,
				totalSold: 0,
				earn: 0,
				coinId: order.coinId,
				image: order.image,
				symbol: order.symbol,
			}
		} else {
			accounts[order.coin].amount += order.amount
			accounts[order.coin].total += order.amount / order.price
		}
	})

	Object.values(accounts).forEach((account: any) => {
		accounts[account.coin].averagePrice = account.amount / account.total
	})

	sells?.forEach((order: any) => {
		accounts[order.coin].total -= order.amount / order.price
		accounts[order.coin].earn += order.amount
		accounts[order.coin].totalSold += order.amount / order.price
	})

	let PNL = [] as any

	Object.values(accounts).forEach((account: any) => {
		if (coins?.filter((coin: any) => coin.name === account.coin).length > 0) {
			const currentPrice = coins?.filter(
				(coin: any) => coin.name === account.coin
			)[0].current_price

			PNL.push({
				coin: account.coin,
				pnl:
					account.total *
					account.averagePrice *
					(currentPrice / account.averagePrice - 1),
				totalCoins: account.total,
				averagePrice: account.averagePrice,
				totalValue: currentPrice * account.total,
				rpnl: account.earn - account.totalSold * account.averagePrice,
				coinId: account.coinId,
				image: account.image,
				symbol: account.symbol,
			})
		}
	})

	PNL.sort((a: any, b: any) => b.totalValue - a.totalValue)

	return PNL
}
