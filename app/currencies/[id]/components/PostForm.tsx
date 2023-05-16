import { addPost } from '@/app/util/requests'

const PostForm = () => {
	const submitPost = async (e: any) => {
		e.preventDefault()
		const res = await addPost('words', 'bitcoin', true)
		console.log(res)
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
			/>
			<button
				type='submit'
				className='bg-blue-500 rounded-md text-white py-1 px-3'
			>
				Post
			</button>
		</form>
	)
}

export default PostForm
