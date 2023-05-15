'use client'
import { addUserLike, removeUserLike } from '@/app/util/requests'
import { useState } from 'react'
import { HiOutlineStar } from 'react-icons/hi'
import { toast } from 'react-hot-toast'

const LikeButton = ({
	coinId,
	initialLike,
	session,
}: {
	coinId: string
	initialLike: boolean
	session: any
}) => {
	const [like, setLike] = useState<boolean>(initialLike)
	const [loading, setLoading] = useState<boolean>(false)

	const handleClick = async () => {
		if (!session) {
			toast.error('You must be logged in to like a coin')
			return
		}
		setLoading(true)
		const initialState = like
		setLike((prev) => !prev)
		if (!initialState) {
			await addUserLike(coinId)
		} else {
			await removeUserLike(coinId)
		}
		setLoading(false)
	}

	return (
		<button
			disabled={loading}
			onClick={handleClick}
			className='bg-gray-100 rounded-md p-2'
		>
			{like ? (
				<HiOutlineStar className='fill-orange-300 text-orange-300 h-4 w-4' />
			) : (
				<HiOutlineStar className='text-black h-4 w-4' />
			)}
		</button>
	)
}

export default LikeButton
