'use client'
import Link from 'next/link'
import { HiOutlineShoppingCart, HiOutlineStar } from 'react-icons/hi'
import { toast } from 'react-hot-toast'

const LinkButton = ({ session, type }: { session: any; type: string }) => {
	if (!session) {
		return (
			<div
				onClick={() => toast.error('Must be logged in')}
				className='text-slate-500 flex items-center gap-1 p-2 rounded-md hover:bg-slate-100 profile-button cursor-pointer'
			>
				{type === 'exchange' ? (
					<HiOutlineShoppingCart className='h-5 w-5' />
				) : (
					<HiOutlineStar className='h-5 w-5' />
				)}
				{type === 'exchange' ? 'Exchange' : 'Profile'}
			</div>
		)
	}

	return (
		<Link
			href={type === 'exchange' ? '/exchange' : '/profile'}
			className='text-slate-500 flex items-center gap-1 p-2 rounded-md hover:bg-slate-100 profile-button'
		>
			{type === 'exchange' ? (
				<HiOutlineShoppingCart className='h-5 w-5' />
			) : (
				<HiOutlineStar className='h-5 w-5' />
			)}

			{type === 'exchange' ? 'Exchange' : 'Profile'}
		</Link>
	)
}

export default LinkButton
