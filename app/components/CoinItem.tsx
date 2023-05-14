import { coinTableType } from '@/app/util/types'
import Link from 'next/link'

const CoinItem = ({ coin }: { coin: coinTableType }) => {
	return (
		<Link
			href={`/currencies/${coin.id}`}
			className={`${coin.liked && 'text-red-500'}`}
		>
			{coin.name}
		</Link>
	)
}

export default CoinItem
