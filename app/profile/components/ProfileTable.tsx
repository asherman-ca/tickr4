'use client'
import { useState, useEffect, useMemo } from 'react'
import { getUserProfile } from '@/app/util/requests'
import { calcPNL } from '@/app/util/actions'
import Spinner from '@/app/components/Spinner'
import WatchListTable from './WatchListTable'
import PortfolioTable from './PortfolioTable'

const ProfileTable = ({ coins }: any) => {
	const [user, setUser] = useState<any>({})
	const [loading, setLoading] = useState(true)
	const [showWatchlist, setShowWatchlist] = useState(false)
	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUserProfile()
			setUser(user)
		}
		fetchUser()
		setLoading(false)
	}, [])
	const pnl = useMemo(() => {
		if (!user?.orders) return []
		return calcPNL(user.orders, coins)
	}, [user.orders, coins])
	if (loading) return <Spinner />

	return (
		<div className='flex flex-col gap-4 px-12'>
			<div className='flex gap-4'>
				<button
					className='p-2 bg-gray-100 rounded-md flex items-cente gap-2 profile-button'
					onClick={() => setShowWatchlist(true)}
				>
					Watchlist
				</button>
				<button
					className='p-2 bg-gray-100 rounded-md flex items-center gap-2 profile-button'
					onClick={() => setShowWatchlist(false)}
				>
					Portfolio
				</button>
			</div>
			{showWatchlist ? (
				<WatchListTable coins={coins} />
			) : (
				<PortfolioTable accounts={pnl} />
			)}
		</div>
	)
}

export default ProfileTable
