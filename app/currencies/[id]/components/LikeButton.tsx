'use client'
// import useSWR from 'swr'
import { getUserLike } from '@/app/util/requests'
import { useState, useEffect } from 'react'

const LikeButton = ({ coinId }: { coinId: string }) => {
	// const fetchUserLike = async () => {
	// 	const res = await getUserLike(coinId)
	// 	return res
	// }
	// const { data, error, isLoading } = useSWR('/api/likes', fetchUserLike)
	// console.log('data', data)
	useEffect(() => {
		const fetchUserLike = async () => {
			const res = await getUserLike(coinId)
			console.log('res', res)
		}
		fetchUserLike()
	}, [])

	return <div>LikeButton</div>
}

export default LikeButton
