'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import CoinItem from './CoinItem'
import { coinTableType, coinType } from '../util/types'
import { getUserLikes } from '../util/requests'
import Spinner from './Spinner'
import { displayCoinsMemo } from '../util/actions'

const CoinTable = ({
	coins,
	session,
}: {
	coins: coinType[] | []
	session: any
}) => {
	const [likes, setLikes] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [sortParam, setSortParam] = useState<{
		direction: string
		type: string
	}>({ direction: 'desc', type: 'mcap' })

	useEffect(() => {
		if (!session) {
			setLoading(false)
			return
		}
		const fetchLikes = async () => {
			const likes = await getUserLikes()
			setLikes(likes)
			setLoading(false)
		}
		fetchLikes()
	}, [session])

	const parsedCoins = useMemo(() => {
		return (coins as coinTableType[]).map((coin: coinTableType) => {
			const like = likes.find((like: any) => like.coinId === coin.id)
			if (like) {
				coin.liked = true
			} else {
				coin.liked = false
			}
			return coin
		})
	}, [coins, likes])

	const displayCoins = displayCoinsMemo(parsedCoins, loading, sortParam)

	if (loading && session) return <Spinner />

	console.log(displayCoins)

	return (
		<div className='flex-1'>
			{displayCoins?.slice(0, 10).map((coin) => (
				<CoinItem key={coin.id} coin={coin} />
			))}
		</div>
	)
}

export default CoinTable
