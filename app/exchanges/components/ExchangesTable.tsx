import { exchangeType } from '@/app/util/types'
import { numParseTwoDecimal } from '@/app/util/formaters'

export const revalidate = 60000

const ExchangesTable = ({ exchanges }: { exchanges: exchangeType[] }) => {
	console.log(exchanges.filter((exchange) => exchange.name === 'Kraken'))
	return (
		<div className='px-8 py-6 gap-6 flex flex-col'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-2xl font-semibold'>
					Top Cryptocurrency Spot Exchanges
				</h1>
				<span className='text-sm text-gray-500'>
					Tickr ranks and scores exchanges based on traffic, liquidity, trading
					volumes, and confidence in the legitimacy of trading volumes reported.
				</span>
			</div>
			<div>
				<table className='w-full'>
					<thead>
						<tr className='border-b border-gray-200'>
							<th className='text-left py-2 font-semibold'>#</th>
							<th className='text-left font-semibold'>Exchange</th>
							<th className='text-left font-semibold'>Score</th>
							<th className='text-right font-semibold'>BTC volume(24h)</th>
							<th className='text-right font-semibold'>Location</th>
						</tr>
					</thead>
					<tbody>
						{exchanges.map((exchange) => (
							<tr className='border-b border-gray-200' key={exchange.id}>
								<td className='py-2'>{exchange.trust_score_rank}</td>
								<td>
									<a
										href={
											exchange.name === 'Kraken'
												? 'https://www.kraken.com/'
												: exchange.url
										}
										target='_blank'
										rel='noopener noreferrer'
										className='font-medium'
									>
										{exchange.name}
									</a>
								</td>
								<td>{exchange.trust_score}</td>
								<td className='text-right'>
									{numParseTwoDecimal(exchange.trade_volume_24h_btc_normalized)}
								</td>
								<td className='text-right'>{exchange.country ?? '--'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ExchangesTable
