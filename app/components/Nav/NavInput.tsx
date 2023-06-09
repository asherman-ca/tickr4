'use client'
import { coinType } from '@/app/util/types'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function NavInput({ coins }: { coins: coinType[] }) {
	const [search, setSearch] = useState('')
	const [focusIn, setFocusIn] = useState(false)
	const [focusComplete, setFocusComplete] = useState(false)
	const router = useRouter()
	// const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (focusIn) {
			setTimeout(() => {
				setFocusComplete(true)
			}, 400)
		}
	}, [focusIn])

	const trendingCoins = useMemo(() => {
		const coinCopy = [...coins]
		return coinCopy
			.sort((a, b) => {
				return (
					Math.abs(b.price_change_percentage_1h_in_currency) -
					Math.abs(a.price_change_percentage_1h_in_currency)
				)
			})
			.slice(0, 5)
	}, [coins])

	const displayCoins = useMemo(() => {
		if (search === '') return []
		return coins.filter((coin) => {
			return coin.name.toLowerCase().includes(search.toLowerCase())
		})
	}, [search])

	const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (
			event.relatedTarget instanceof HTMLElement &&
			event.relatedTarget.parentElement?.id === 'search-results' && // Check if mouse is over search results
			(event.relatedTarget as HTMLAnchorElement).href // Check if mouse is over a link
		) {
			router.push(`${(event.relatedTarget as HTMLAnchorElement).href}`)
		}
		setFocusIn(false)
		setFocusComplete(false)
		setSearch('')
	}

	// console.log('tcoins', trendingCoins)

	return (
		<div
			className={`relative z-[50] ${!focusIn && 'min-w-0'} ${
				focusIn && 'min-w-full'
			} transition-all ease-in-out duration-500`}
		>
			<div
				className={`flex border-2 border-gray-200 rounded-md items-center px-2 py-1 ${
					focusComplete && 'rounded-b-none'
				}`}
			>
				{/* <MagnifyingGlassIcon height={24} width={24} /> */}
				<input
					className={`h-full outline-none  p-1 w-full `}
					placeholder={`${
						focusComplete ? 'Search coin or exchange' : 'Search'
					}`}
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => {
						if (e.code === 'Enter') {
							router.push(`/currencies/${search}`)
						}
					}}
					onFocus={() => setFocusIn(true)}
					onBlur={handleInputBlur}
					// ref={inputRef}
				/>
			</div>
			{focusComplete && (
				<div
					id='search-results'
					className={`-mt-[2px] absolute flex flex-col justify-start border-2 border-gray-200 w-100% w-full transition-all ease-in-out duration-500 border-t-0 bg-white rounded-b-md max-h-80 overflow-auto scrollable slide-in`}
				>
					{displayCoins.length === 0 && (
						<>
							<div className='text-left px-2 py-2 flex items-center gap-1 text-slate-500'>
								Trending
								{/* <FireIcon height={24} width={24} color='red' /> */}
							</div>
							{trendingCoins.map((coin) => {
								return (
									<Link
										key={coin.id}
										href={`/currencies/${coin.id}`}
										className='text-left hover:bg-blue-100 px-2 py-2 flex items-center justify-between'
									>
										<div className='flex items-center gap-2'>
											<Image
												src={coin.image}
												alt={coin.name}
												height={24}
												width={24}
												className='rounded-full'
											/>
											<span className='font-medium'>{coin.name} </span>
											<span className='text-slate-500'>
												{coin.symbol.toUpperCase()}
											</span>
										</div>
										<div className='text-slate-500'>
											#{coin.market_cap_rank}
										</div>
									</Link>
								)
							})}
						</>
					)}
					{displayCoins.map((coin) => {
						return (
							<Link
								key={coin.id}
								href={`/currencies/${coin.id}`}
								className='text-left hover:bg-blue-100 py-2 px-2 flex items-center justify-between'
							>
								<div className='flex items-center gap-2'>
									<Image
										src={coin.image}
										alt={coin.name}
										height={24}
										width={24}
										className='rounded-full'
									/>
									<span className='font-medium'>{coin.name} </span>
									<span className='text-slate-500'>
										{coin.symbol.toUpperCase()}
									</span>
								</div>
								<div className='text-slate-500'>#{coin.market_cap_rank}</div>
							</Link>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default NavInput
