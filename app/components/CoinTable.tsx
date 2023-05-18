'use client'
import { useState, useEffect, useMemo } from 'react'
import CoinItem from './CoinItem'
import { coinTableType, coinType } from '../util/types'
import { getUserLikes } from '../util/requests'
import Spinner from './Spinner'
import Pagination from './Pagination'
import { displayCoinsMemo, handleSort } from '../util/actions'
import { moneyParse, numParseTwoDecimal } from '../util/formaters'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'
const rowsPerPageOptions = [10, 25, 50, 100]

const CoinTable = ({
	coins,
	session,
}: {
	coins: coinType[] | []
	session: any
}) => {
	const [likes, setLikes] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [sortParam, setSortParam] = useState<{
		direction: string
		type: string
	}>({ direction: 'desc', type: 'mcap' })

	useEffect(() => {
		if (!session) {
			setLoading(false)
			return
		}
		const fetchLikes = async () => {
			const likes = await getUserLikes()
			setLikes(likes)
			setLoading(false)
		}
		fetchLikes()
	}, [session])

	const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const lastPage =
		coins.length % rowsPerPage === 0
			? coins.length / rowsPerPage
			: Math.floor(coins.length / rowsPerPage) + 1

	const updateRowsPerPage = (rowsNumber: number) => {
		setRowsPerPage(rowsNumber)
		setCurrentPage(1)
	}

	const nextPage = () => {
		if (currentPage === lastPage) return
		setCurrentPage((prev) => prev + 1)
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const prevPage = () => {
		if (currentPage === 1) return
		setCurrentPage((prev) => prev - 1)
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const parsedCoins = useMemo(() => {
		return (coins as coinTableType[]).map((coin: coinTableType) => {
			const like = likes.find((like: any) => like.coinId === coin.id)
			if (like) {
				coin.liked = true
			} else {
				coin.liked = false
			}
			return coin
		})
	}, [coins, likes])

	const displayCoins = displayCoinsMemo(parsedCoins, loading, sortParam)

	if (loading && session) return <Spinner />

	console.log(displayCoins)

	return (
		<div className='flex-1'>
			{/* {displayCoins?.slice(0, 10).map((coin) => (
				<CoinItem key={coin.id} coin={coin} />
			))} */}
			<table className='w-full'>
				<thead>
					<tr className='border-gray-200 border-b'>
						<th className='py-2'></th>
						<th className='text-left py-4'>#</th>
						<th className='text-left'>Name</th>
						<th className='text-right'>Price</th>
						<th
							className={`text-right cursor-pointer hidden md:table-cell`}
							onClick={() => handleSort('1hr', sortParam, setSortParam)}
						>
							<div className='flex gap-2 items-center justify-end'>
								{sortParam.type === '1hr' && sortParam.direction === 'asc' && (
									<VscTriangleUp />
								)}
								{sortParam.type === '1hr' && sortParam.direction === 'desc' && (
									<VscTriangleDown />
								)}
								1h%
							</div>
						</th>
						<th
							className={`text-right cursor-pointer hidden sm:table-cell`}
							onClick={() => handleSort('24hr', sortParam, setSortParam)}
						>
							<div className='flex gap-2 items-center justify-end'>
								{sortParam.type === '24hr' && sortParam.direction === 'asc' && (
									<VscTriangleUp />
								)}
								{sortParam.type === '24hr' &&
									sortParam.direction === 'desc' && <VscTriangleDown />}
								24h%
							</div>
						</th>
						<th
							className={`text-right cursor-pointer hidden md:table-cell`}
							onClick={() => handleSort('7d', sortParam, setSortParam)}
						>
							<div className='flex gap-2 items-center justify-end'>
								{sortParam.type === '7d' && sortParam.direction === 'asc' && (
									<VscTriangleUp />
								)}
								{sortParam.type === '7d' && sortParam.direction === 'desc' && (
									<VscTriangleDown />
								)}
								7d%
							</div>
						</th>
						<th
							className={`text-right cursor-pointer hidden md:table-cell`}
							onClick={() => handleSort('mcap', sortParam, setSortParam)}
						>
							<div className='flex gap-2 items-center justify-end'>
								{sortParam.type === 'mcap' && sortParam.direction === 'asc' && (
									<VscTriangleUp />
								)}
								{sortParam.type === 'mcap' &&
									sortParam.direction === 'desc' && <VscTriangleDown />}
								Market Cap
							</div>
						</th>
						<th
							className={`text-right cursor-pointer hidden md:table-cell`}
							onClick={() => handleSort('volume', sortParam, setSortParam)}
						>
							<div className='flex gap-2 items-center justify-end'>
								{sortParam.type === 'volume' &&
									sortParam.direction === 'asc' && <VscTriangleUp />}
								{sortParam.type === 'volume' &&
									sortParam.direction === 'desc' && <VscTriangleDown />}
								Volume(24h)
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{displayCoins
						.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
						.map((coin) => {
							return (
								<tr
									key={coin.id}
									className='hover:bg-blue-50 border-b border-gray-200'
								>
									<td className='pl-2'>
										{coin.liked ? <AiFillStar /> : <AiOutlineStar />}
									</td>
									<td className='text-left py-6'>{coin.market_cap_rank}</td>
									<td className='w-[250px]'>
										<Link
											href={`/coin/${coin.id}`}
											className='font-medium flex items-center gap-2'
										>
											<Image
												src={coin.image}
												height={24}
												width={24}
												alt={coin.name}
											/>
											<div>
												{coin.name}{' '}
												<span className='text-slate-500 font-normal'>
													{coin.symbol.toUpperCase()}
												</span>
											</div>
										</Link>
									</td>
									<td className='text-right font-medium'>
										{moneyParse(coin.current_price)}
									</td>
									<td
										className={`text-right min-w-[10%] hidden md:table-cell ${
											coin.price_change_percentage_1h_in_currency > 0
												? 'text-green-500'
												: 'text-red-500'
										}`}
									>
										{numParseTwoDecimal(
											coin.price_change_percentage_1h_in_currency
										)}
										%
									</td>
									<td
										className={`text-right min-w-[10%] hidden sm:table-cell ${
											coin.price_change_percentage_24h_in_currency > 0
												? 'text-green-500'
												: 'text-red-500'
										}`}
									>
										{numParseTwoDecimal(
											coin.price_change_percentage_24h_in_currency
										)}
										%
									</td>
									<td
										className={`text-right min-w-[10%] hidden md:table-cell ${
											coin.price_change_percentage_7d_in_currency > 0
												? 'text-green-500'
												: 'text-red-500'
										}`}
									>
										{numParseTwoDecimal(
											coin.price_change_percentage_7d_in_currency
										)}
										%
									</td>
									<td className='text-right min-w-[10%] hidden md:table-cell'>
										{moneyParse(coin.market_cap)}
									</td>
									<td className='text-right min-w-[10%] pr-2 hidden md:table-cell'>
										{moneyParse(coin.total_volume)}
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
			<Pagination
				rowsPerPage={rowsPerPage}
				setRowsPerPage={updateRowsPerPage}
				rowsPerPageOptions={rowsPerPageOptions}
				totalCount={displayCoins.length}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				nextPage={nextPage}
				prevPage={prevPage}
			/>
		</div>
	)
}

export default CoinTable
