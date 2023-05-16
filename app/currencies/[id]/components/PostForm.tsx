import { useState } from 'react'
import { addPost } from '@/app/util/requests'

const PostForm = ({ setPosts }: any) => {
	const [loading, setLoading] = useState<boolean>(false)
	const submitPost = async (e: any) => {
		e.preventDefault()
		setLoading(true)
		const formData = new FormData(e.target)
		const content = formData.get('content') as string
		const res = await addPost(content, 'bitcoin', true)
		console.log('res', res)
		console.log(setPosts)
		setPosts((prev: any[]) => [res, ...prev])
		setLoading(false)
	}
	return (
		<form
			className='mt-auto px-6 pt-6 border-t border-gray-200 flex justify-between'
			onSubmit={submitPost}
		>
			<input
				type='text'
				placeholder='Create post...'
				className='outline-none'
				name='content'
				id='content'
			/>
			<button
				type='submit'
				className='bg-blue-500 rounded-md text-white py-1 px-3'
				disabled={loading}
			>
				Post
			</button>
		</form>
	)
}

export default PostForm
