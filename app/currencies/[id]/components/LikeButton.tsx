'use client'
import { addUserLike, removeUserLike } from '@/app/util/requests'
import { useState } from 'react'
import { HiOutlineHeart } from 'react-icons/hi'
import { revalidatePath } from 'next/cache'
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
		<button disabled={loading} onClick={handleClick}>
			{like ? (
				<HiOutlineHeart className='fill-red-500 text-red-500 h-10 w-10' />
			) : (
				<HiOutlineHeart className='text-red-500 h-10 w-10' />
			)}
		</button>
	)
}

export default LikeButton
