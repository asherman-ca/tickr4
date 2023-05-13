'use client'
// import useSWR from 'swr'
import { addUserLike, removeUserLike } from '@/app/util/requests'
import { useState } from 'react'

const LikeButton = ({
	coinId,
	initialLike,
}: {
	coinId: string
	initialLike: boolean
}) => {
	const [like, setLike] = useState<boolean>(initialLike)
	// const fetchUserLike = async () => {
	// 	const res = await getUserLike(coinId)
	// 	return res
	// }
	// const { data, error, isLoading } = useSWR('/api/likes', fetchUserLike)
	// console.log('data', data)
	// useEffect(() => {
	// 	const fetchUserLike = async () => {
	// 		const res = await getUserLike(coinId)
	// 		console.log('res', res)
	// 	}
	// 	fetchUserLike()
	// }, [])
	const handleClick = async () => {
		const initialState = like
		setLike((prev) => !prev)
		if (!initialState) {
			const res = await addUserLike(coinId)
		} else {
			const res = await removeUserLike(coinId)
		}
	}

	return <button onClick={handleClick}>{like ? 'Liked' : 'Disliked'}</button>
}

export default LikeButton
