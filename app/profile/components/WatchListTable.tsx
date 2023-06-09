import Link from 'next/link'
import Image from 'next/image'
import { likeType, coinType, sessionType } from '@/app/util/types'
import { numParseTwoDecimal, moneyParse } from '@/app/util/formaters'

const WatchListTable = ({ coins, data }: { coins: coinType[]; data: any }) => {
	const likeIds = data?.map((like: likeType) => like.coinId)
	const coinPairs: coinType[] = coins.filter((coin) =>
		likeIds?.includes(coin.id)
	)

	return (
		<table>
			<thead>
				<tr className='border-b border-slate-200'>
					<th className='text-left py-4'>Coin</th>
					<th className='text-right'>Price</th>
					<th className='text-right'>1h%</th>
					<th className='text-right'>24h%</th>
					<th className='text-right'>7d%</th>
					<th className='text-right'>Market Cap</th>
					<th className='text-right'>Volume(24h)</th>
				</tr>
			</thead>
			<tbody>
				{coinPairs.map((coin) => (
					<tr
						key={coin.id}
						className='border-b border-slate-200 hover:bg-blue-50'
					>
						<td className='text-left py-4'>
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
							className={`text-right ${
								coin.price_change_percentage_1h_in_currency > 0
									? 'text-green-500'
									: 'text-red-500'
							}`}
						>
							{numParseTwoDecimal(coin.price_change_percentage_1h_in_currency)}%
						</td>
						<td
							className={`text-right ${
								coin.price_change_percentage_24h_in_currency > 0
									? 'text-green-500'
									: 'text-red-500'
							}`}
						>
							{numParseTwoDecimal(coin.price_change_percentage_24h_in_currency)}
							%
						</td>
						<td
							className={`text-right ${
								coin.price_change_percentage_7d_in_currency > 0
									? 'text-green-500'
									: 'text-red-500'
							}`}
						>
							{numParseTwoDecimal(coin.price_change_percentage_7d_in_currency)}%
						</td>
						<td className='text-right'>{moneyParse(coin.market_cap)}</td>
						<td className='text-right'>{moneyParse(coin.total_volume)}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default WatchListTable
