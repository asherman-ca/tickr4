import { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiPlusSm, HiBadgeCheck } from 'react-icons/hi'
import { coinView } from '@/app/util/types'
import PostForm from './PostForm'
import { getPosts } from '@/app/util/requests'
import TimeAgo from 'react-timeago'
import { motion } from 'framer-motion'
import Spinner from '@/app/components/Spinner'

const RightPanel = ({ coin }: { coin: coinView }) => {
	const [posts, setPosts] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await getPosts(coin.id)
			setPosts(res)
			setLoading(false)
		}
		fetchPosts()
	}, [])

	return (
		<div className='hidden lg:flex lg:basis-1/4 border-l border-gray-200 py-6 flex-col'>
			<div className='flex flex-col gap-6 px-6 pb-6 border-b border-gray-200'>
				<h2 className='text-lg font-semibold'>{coin.name} Community</h2>
				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-2'>
						<Image
							src={coin.image.small}
							alt='coin image'
							className='h-10 w-10'
							width={32}
							height={32}
						/>
						<div className='flex flex-col'>
							<div className='font-semibold flex items-center gap-1'>
								{coin.name} <HiBadgeCheck className='h-6 w-6 fill-blue-500' />
							</div>
							<span className='text-gray-500'>25k Followers</span>
						</div>
					</div>

					<button className='flex gap-1 items-center bg-blue-500 text-white pr-3 pl-2 py-1 rounded-md'>
						<HiPlusSm className='h-6 w-6 fill-white' /> Follow
					</button>
				</div>
			</div>
			<div className='px-6 overflow-auto flex flex-1 flex-col pt-2 scrollbar-hide'>
				{loading && (
					<div className='flex justify-center items-center flex-1'>
						<Spinner />
					</div>
				)}
				{!loading &&
					posts.map((post, idx) => (
						<motion.div
							layout
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							key={`post ${idx}`}
							className='flex flex-col gap-4 border-b border-gray-200 py-4'
						>
							<div className='flex justify-between items-start'>
								<div className='flex gap-2 items-center'>
									<Image
										src={post.user.image}
										alt='pfp'
										className='h-8 w-8 rounded-full'
										height={300}
										width={300}
									/>
									<div className='flex flex-col'>
										<span>{post.user.name}</span>
										<span className='text-gray-500 text-sm'>
											@{post.user.name.replace(/\s/g, '')}
										</span>
									</div>
								</div>
								<TimeAgo
									date={post.createdAt}
									className='text-sm text-gray-500'
								/>
							</div>
							<div className='text-sm'>{post.content}</div>
						</motion.div>
					))}
			</div>
			<PostForm setPosts={setPosts} />
		</div>
	)
}

export default RightPanel
