'use client'
import { useState, useEffect } from 'react'
import { coinView } from '@/app/util/types'
import LikeButton from './components/LikeButton'
import { getUserLike } from '@/app/util/requests'

const Content = ({ coin, session }: { coin: coinView; session: any }) => {
	const [initialLike, setInitialLike] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	useEffect(() => {
		console.log('hits')
		if (!session) {
			setLoading(false)
			return
		}
		const fetchLike = async () => {
			const like = await getUserLike(coin.id)
			console.log('fetched like', like)
			await setInitialLike(!!like)
			await setLoading(false)
		}
		fetchLike()
	}, [session])

	if (loading) return <div>Loading...</div>

	return (
		<div className='flex flex-col gap-4'>
			<h1>{coin.name}</h1>
			{console.log('init like', initialLike)}
			<LikeButton
				coinId={coin.id}
				initialLike={initialLike}
				session={session}
			/>
		</div>
	)
}

export default Content
