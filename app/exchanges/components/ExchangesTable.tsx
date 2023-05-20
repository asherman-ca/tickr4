'use client'
import { useState } from 'react'
import { derivExchangeType, exchangeType } from '@/app/util/types'
import SpotExchanges from './SpotExchanges'
import DerivExchanges from './DerivExchanges'
import { HiOutlineStar } from 'react-icons/hi'

const ExchangesTable = ({
	exchanges,
	derivExchanges,
}: {
	exchanges: exchangeType[]
	derivExchanges: derivExchangeType[]
}) => {
	const [showDeriv, setShowDeriv] = useState(false)
	return (
		<div className='px-8 py-6 flex flex-col'>
			<div className='flex flex-col gap-2 mb-6'>
				<h1 className='text-2xl font-semibold'>
					Top Cryptocurrency Spot Exchanges
				</h1>
				<span className='text-sm text-gray-500'>
					Tickr ranks and scores exchanges based on traffic, liquidity, trading
					volumes, and confidence in the legitimacy of trading volumes reported.
				</span>
			</div>
			<div className='flex gap-4 mb-2 text-sm'>
				<button className='py-2 px-3 bg-gray-100 rounded-md flex gap-1 items-center'>
					<HiOutlineStar className='h-4 w-4' />
					Watchlist
				</button>
				<div className='border-l border-gray-200 mx-2 h-[90%]' />
				<button
					onClick={() => setShowDeriv(false)}
					className={`py-2 px-3 text-gray-500 rounded-md ${
						!showDeriv && '!text-blue-500 bg-gray-100'
					}`}
				>
					Spot
				</button>
				<button
					onClick={() => setShowDeriv(true)}
					className={`py-2 px-3 text-gray-500 rounded-md ${
						showDeriv && '!text-blue-500 bg-gray-100'
					}`}
				>
					Derivatives
				</button>
			</div>
			{showDeriv ? (
				<DerivExchanges derivExchanges={derivExchanges} />
			) : (
				<SpotExchanges exchanges={exchanges} />
			)}
		</div>
	)
}

export default ExchangesTable
