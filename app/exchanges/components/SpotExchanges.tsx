import { exchangeType } from '@/app/util/types'
import { numParseTwoDecimal } from '@/app/util/formaters'
import Image from 'next/image'

const SpotExchanges = ({ exchanges }: { exchanges: exchangeType[] }) => {
	return (
		<table className='w-full text-sm'>
			<thead>
				<tr className='border-b border-gray-200'>
					<th className='text-left py-4 font-semibold'>#</th>
					<th className='text-left font-semibold'>Exchange</th>
					<th className='text-right font-semibold'>Score</th>
					<th className='text-right font-semibold'>BTC volume(24h)</th>
					<th className='text-right font-semibold'>Established</th>
					<th className='text-right font-semibold'>Location</th>
				</tr>
			</thead>
			<tbody>
				{exchanges.map((exchange) => (
					<tr className='border-b border-gray-200' key={exchange.id}>
						<td className='py-4'>{exchange.trust_score_rank}</td>
						<td>
							<a
								href={
									exchange.name === 'Kraken'
										? 'https://www.kraken.com/'
										: exchange.url
								}
								target='_blank'
								rel='noopener noreferrer'
								className='font-medium flex items-center gap-2'
							>
								<Image
									src={exchange.image}
									alt={exchange.name}
									className='rounded-full h-4 w-4'
									width={20}
									height={20}
								/>
								{exchange.name}
							</a>
						</td>
						<td className='text-right'>{exchange.trust_score}</td>
						<td className='text-right'>
							{numParseTwoDecimal(exchange.trade_volume_24h_btc_normalized)}
						</td>
						<td className='text-right'>{exchange.year_established ?? '--'}</td>
						<td className='text-right'>{exchange.country ?? '--'}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default SpotExchanges
