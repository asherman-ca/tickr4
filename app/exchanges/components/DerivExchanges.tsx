import { derivExchangeType } from '@/app/util/types'
import { numParseTwoDecimal } from '@/app/util/formaters'
import Image from 'next/image'

const DerivExchanges = ({
	derivExchanges,
}: {
	derivExchanges: derivExchangeType[]
}) => {
	return (
		<table className='w-full text-sm'>
			<thead>
				<tr className='border-b border-gray-200'>
					<th className='text-left py-2 font-semibold'>#</th>
					<th className='text-left font-semibold'>Exchange</th>
					<th className='text-right font-semibold'>BTC open interest</th>
					<th className='text-right font-semibold'># Futurues pairs</th>
					<th className='text-right font-semibold'># Perpetual pairs</th>
					<th className='text-right font-semibold'>Location</th>
				</tr>
			</thead>
			<tbody>
				{derivExchanges.map((exchange, idx) => (
					<tr className='border-b border-gray-200' key={exchange.id}>
						<td className='py-2'>{idx + 1}</td>
						<td>
							<a
								href={
									exchange.name === 'Kraken'
										? 'https://www.kraken.com/'
										: exchange.url
								}
								target='_blank'
								rel='noopener noreferrer'
								className='font-medium flex gap-2 items-center'
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
						<td className='text-right'>
							{numParseTwoDecimal(exchange.open_interest_btc)}
						</td>
						<td className='text-right'>
							{numParseTwoDecimal(exchange.number_of_futures_pairs)}
						</td>
						<td className='text-right'>
							{numParseTwoDecimal(exchange.number_of_perpetual_pairs)}
						</td>
						<td className='text-right'>{exchange.country ?? '--'}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default DerivExchanges
