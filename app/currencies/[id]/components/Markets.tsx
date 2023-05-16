import { coinView, marketType } from '@/app/util/types'
import { moneyParse } from '@/app/util/formaters'

const Markets = ({ coin }: { coin: coinView }) => {
	const filteredMarkets: marketType[] = coin.tickers
		.filter((market: any) => market.base === coin.symbol.toUpperCase())
		.sort((a: any, b: any) => b.converted_volume.usd - a.converted_volume.usd)
		.slice(0, 10)

	return (
		<div id='markets' className='px-8 flex flex-col gap-4'>
			<h2 className='text-4xl font-semibold'>{coin.name} Markets</h2>
			<table className=''>
				<thead>
					<tr className='border-b border-t border-gray-200'>
						<th className='py-2 text-left'>#</th>
						<th className='text-left'>Exchange</th>
						<th className='text-right'>Pair</th>
						<th className='text-right'>Price</th>
						<th className='text-right'>Volume</th>
					</tr>
				</thead>
				<tbody>
					{filteredMarkets.map((market, idx: number) => (
						<tr key={`market ${idx}`} className='border-b border-gray-200'>
							<td className='text-left py-2'>{idx + 1}</td>
							<td className='font-semibold'>{market.market.name}</td>
							<td className='text-right'>
								{market.base} / {market.target}
							</td>
							<td className='text-right'>{moneyParse(market.last)}</td>
							<td className='text-right'>
								{moneyParse(market.converted_volume.usd)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Markets
