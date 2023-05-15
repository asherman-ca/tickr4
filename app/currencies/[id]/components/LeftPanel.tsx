import { coinView } from '@/app/util/types'
import LikeButton from './LikeButton'
import { moneyParseTwoDecimal } from '@/app/util/formaters'
import Image from 'next/image'

type Props = {
	coin: coinView
	initialLike: boolean
	session: any
}

const LeftPanel = ({ coin, initialLike, session }: Props) => {
	return (
		<div className='flex flex-col basis-1/5 gap-4 p-6 border-r border-gray-200 flex-1'>
			<div className='flex justify-between'>
				<div className='flex gap-1 items-center'>
					<Image
						src={coin.image.thumb}
						height={600}
						width={600}
						alt='coin logo'
						className='h-6 w-6'
					/>
					<h2 className='text-xl'>{coin.name}</h2>
					<span className='text-gray-500 text-sm'>
						{coin.symbol.toUpperCase()}
					</span>
				</div>
				<LikeButton
					coinId={coin.id}
					initialLike={initialLike}
					session={session}
				/>
			</div>

			<div className='text-4xl font-semibold'>
				{moneyParseTwoDecimal(coin.market_data.current_price.usd)}
			</div>

			<div>links</div>
			<div>converter</div>
		</div>
	)
}

export default LeftPanel
