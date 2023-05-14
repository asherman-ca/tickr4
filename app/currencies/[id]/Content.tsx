'use client'
import { useState, useEffect } from 'react'
import { coinView } from '@/app/util/types'
import LikeButton from './components/LikeButton'
import { getUserLike } from '@/app/util/requests'
import Loader from '@/app/components/Loader'
import Spinner from '@/app/components/Spinner'

const Content = ({ coin, session }: { coin: coinView; session: any }) => {
	const [initialLike, setInitialLike] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	useEffect(() => {
		if (!session) {
			return
		}
		const fetchLike = async () => {
			setLoading(true)
			const like = await getUserLike(coin.id)
			setInitialLike(!!like)
			setLoading(false)
		}
		fetchLike()
	}, [session])

	if (session && loading) return <Spinner />

	return (
		<div className='flex flex-col gap-4'>
			<h1>{coin.name}</h1>
			<LikeButton
				coinId={coin.id}
				initialLike={initialLike}
				session={session}
			/>
		</div>
	)
}

export default Content
