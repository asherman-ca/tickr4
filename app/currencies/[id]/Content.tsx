'use client'
import { useState, useEffect } from 'react'
import { coinView, coinHistoryType } from '@/app/util/types'
import LikeButton from './components/LikeButton'
import { getUserLike } from '@/app/util/requests'
import Spinner from '@/app/components/Spinner'
import LeftPanel from './components/LeftPanel'
import CenterPanel from './components/CenterPanel'
import RightPanel from './components/RightPanel'

const Content = ({
	coin,
	session,
	news,
	history,
}: {
	coin: coinView
	session: any
	news: any
	history: coinHistoryType[]
}) => {
	const [initialLike, setInitialLike] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	useEffect(() => {
		if (!session) {
			setLoading(false)
			return
		}
		const fetchLike = async () => {
			const like = await getUserLike(coin.id)
			setInitialLike(!!like)
			setLoading(false)
		}
		fetchLike()
	}, [session])

	if (session && loading) return <Spinner />

	return (
		<div className='flex h-full overflow-y-hidden'>
			<LeftPanel coin={coin} initialLike={initialLike} session={session} />
			<CenterPanel news={news} coin={coin} history={history} />
			<RightPanel coin={coin} />
		</div>
	)
}

export default Content
