'use client'
import { useState, useEffect } from 'react'
import CoinItem from './CoinItem'
import { coinType } from '../util/types'
import { getUserLikes } from '../util/requests'

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
			setLoading(true)
			const likes = await getUserLikes()
			setLikes(likes)
			setLoading(false)
		}
		fetchLikes()
	}, [session])

	if (loading) return <div>Loading...</div>

	return (
		<div>
			{coins?.slice(0, 10).map((coin) => (
				<CoinItem key={coin.id} coin={coin} />
			))}
			{likes.map((like: any) => (
				<div key={like.id}>{like.coinId}</div>
			))}
		</div>
	)
}

export default CoinTable
