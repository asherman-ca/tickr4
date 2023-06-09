'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HiClock, HiFire, HiCalendar } from 'react-icons/hi'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { coinType } from '@/app/util/types'
import { numParseTwoDecimal } from '@/app/util/formaters'

type durationType =
	| 'price_change_percentage_1h_in_currency'
	| 'price_change_percentage_24h_in_currency'
	| 'price_change_percentage_7d_in_currency'

type Props = {
	coins: coinType[]
	duration: durationType
	title: string
}

const HighlightTable = ({ coins, duration, title }: Props) => {
	const [page, setPage] = useState(1)
	useEffect(() => {
		const interval = setInterval(() => {
			setPage((prev) => (prev === 3 ? 1 : prev + 1))
		}, 10000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className='basis-full flex flex-col gap-4 bg-white shadow-sm rounded-md p-4 overflow-hidden text-sm'>
			<div className='flex gap-2 items-center'>
				{duration === 'price_change_percentage_1h_in_currency' && (
					<HiFire className='h-6 w-6 fill-red-500' />
				)}
				{duration === 'price_change_percentage_24h_in_currency' && (
					<HiClock className='h-6 w-6' />
				)}
				{duration === 'price_change_percentage_7d_in_currency' && (
					<HiCalendar className='h-6 w-6' />
				)}
				<span className='font-semibold text-base'>{title}</span>
			</div>
			{coins.slice((page - 1) * 3, page * 3).map((coin, index) => (
				<Link
					href={`/currencies/${coin.id}`}
					key={`${duration} ${coin.id}`}
					className='flex justify-between fly-in'
				>
					<div className='flex gap-3 items-center'>
						<span className='text-slate-500 w-3'>
							{index + (page - 1) * 3 + 1}
						</span>
						<Image
							height={24}
							width={24}
							src={coin.image}
							alt={coin.name}
							className='h-[24px] w-[24px] rounded-full'
						/>
						{coin.name}{' '}
						<span className='text-slate-500'>{coin.symbol.toUpperCase()}</span>
					</div>
					<div
						className={`flex gap-1 items-center ${
							coin[duration] > 0 ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{coin[duration] > 0 ? (
							<VscTriangleUp className='h-3 w-3' />
						) : (
							<VscTriangleDown className='h-3 w-3' />
						)}
						{numParseTwoDecimal(coin[duration])}%
					</div>
				</Link>
			))}
			<div className='flex justify-center gap-1'>
				<div
					onClick={() => setPage(1)}
					className={`cursor-pointer w-2 h-2 rounded-full ${
						page === 1 ? 'bg-blue-500' : 'bg-slate-200'
					}`}
				/>
				<div
					onClick={() => setPage(2)}
					className={`cursor-pointer w-2 h-2 rounded-full ${
						page === 2 ? 'bg-blue-500' : 'bg-slate-200'
					}`}
				/>
				<div
					onClick={() => setPage(3)}
					className={`cursor-pointer w-2 h-2 rounded-full ${
						page === 3 ? 'bg-blue-500' : 'bg-slate-200'
					}`}
				/>
			</div>
		</div>
	)
}

export default HighlightTable
