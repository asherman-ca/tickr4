'use client'
import { coinType } from '@/app/util/types'
import { useState, useEffect } from 'react'
import PurchaseForm from './PurchaseForm'
import OrderList from './OrderList'
import { getUserProfile } from '@/app/util/requests'
import Spinner from '@/app/components/Spinner'

type Props = {
	coins: coinType[]
	session: any
}

const Testnet = ({ coins, session }: Props) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [user, setUser] = useState<any>({})
	const [modalActive, setModalActive] = useState(false)

	useEffect(() => {
		console.log('hits')
		const fetchUser = async () => {
			const user = await getUserProfile()
			setUser(user)
			setLoading(false)
		}
		fetchUser()
	}, [])

	if (loading) return <Spinner />

	console.log('user', user)

	return (
		<div className='p-6 flex flex-col md:flex-row gap-4 flex-1'>
			{modalActive && (
				<div
					className='absolute top-0 left-0 w-screen h-screen z-[75] bg-black opacity-50'
					onClick={() => setModalActive(false)}
				></div>
			)}
			<OrderList orders={user?.orders || []} />
			<PurchaseForm
				coins={coins}
				modalActive={modalActive}
				setModalActive={setModalActive}
				balance={user?.balance || 0}
				setUser={setUser}
			/>
		</div>
	)
}

export default Testnet
