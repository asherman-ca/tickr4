'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import CoinItem from './CoinItem'
import { coinTableType, coinType } from '../util/types'
import { getUserLikes } from '../util/requests'
import Spinner from './Spinner'

const CoinTable = ({
	coins,
	session,
}: {
	coins: coinType[] | []
	session: any
}) => {
	const [likes, setLikes] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!session) {
			setLoading(false)
			return
		}
		const fetchLikes = async () => {
			// setLoading(true)
			const likes = await getUserLikes()
			setLikes(likes)
			setLoading(false)
		}
		fetchLikes()
	}, [session])
	const displayCoins = useMemo(() => {
		return (coins as coinTableType[]).map((coin: coinTableType) => {
			const like = likes.find((like: any) => like.coinId === coin.id)
			if (like) {
				coin.liked = true
			} else {
				coin.liked = false
			}
			return coin
		})
	}, [coins, likes, session])

	if (loading && session) return <Spinner />

	return (
		<div>
			{displayCoins?.slice(0, 10).map((coin) => (
				<CoinItem key={coin.id} coin={coin} />
			))}
		</div>
	)
}

export default CoinTable
