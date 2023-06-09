'use client'
import { useMemo, useState } from 'react'
import { HiArrowLeft, HiCheck } from 'react-icons/hi'
import { SlMagnifier } from 'react-icons/sl'
import { coinType } from '@/app/util/types'
import Image from 'next/image'

type Props = {
	coins: coinType[]
	setModalActive: (value: boolean) => void
	setFormData: any
	formData: any
}

const CoinForm = ({ coins, setModalActive, setFormData, formData }: Props) => {
	const [coinSearch, setCoinSearch] = useState<string>('')

	const displayCoins = useMemo(() => {
		if (coinSearch === '') return coins
		return coins.filter((coin) => {
			return coin.name.toLowerCase().includes(coinSearch.toLowerCase())
		})
	}, [coinSearch])

	const handleClick = (
		coinName: string,
		coinId: string,
		image: string,
		symbol: string,
		price: number
	) => {
		setFormData(
			(formData: {
				amount: number
				coin: string
				coinId: string
				image: string
				symbol: string
				price: number
			}) => {
				return {
					...formData,
					coin: coinName,
					coinId: coinId,
					image: image,
					symbol: symbol,
					price: price,
				}
			}
		)
		setModalActive(false)
	}

	return (
		<div className='bg-white p-4 z-[101] absolute top-[5%] left-[5%] h-[90%] w-[90%] rounded-md text-base gap-4 flex flex-col overflow-auto scrollbar-hide'>
			<div className='flex justify-between items-center text-lg font-medium'>
				<div className='flex justify-start basis-full'>
					<HiArrowLeft
						height={24}
						width={24}
						onClick={() => setModalActive(false)}
					/>
				</div>
				<div className='basis-full text-center'>Select Asset</div>
				<div className='basis-full'></div>
			</div>
			<div className='flex items-center gap-2 border border-gray-200 rounded-md p-2'>
				<SlMagnifier height={24} width={24} />
				<input
					type='text'
					value={coinSearch}
					onChange={(e) => setCoinSearch(e.target.value)}
					className='w-full outline-none'
					placeholder='Search'
				/>
			</div>
			<div>
				{displayCoins.map((coin) => {
					return (
						<div
							key={coin.id}
							onClick={() =>
								handleClick(
									coin.name,
									coin.id,
									coin.image,
									coin.symbol,
									coin.current_price
								)
							}
							className='hover:bg-blue-100 p-4 rounded-md cursor-pointer flex justify-between items-center'
						>
							<div className='flex items-center gap-4'>
								<Image src={coin.image} height={32} width={32} alt={coin.id} />
								<div className='flex flex-col'>
									<div>{coin.name}</div>
									<div className='text-slate-500'>
										{coin.symbol.toLocaleUpperCase()}
									</div>
								</div>
							</div>
							{formData.coinId === coin.id && (
								<HiCheck height={24} width={24} color={'blue'} />
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default CoinForm
