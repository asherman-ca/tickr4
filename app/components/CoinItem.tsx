import { coinType } from '@/app/util/types'
import Link from 'next/link'

const CoinItem = ({ coin }: { coin: coinType }) => {
	return <Link href={`/currencies/${coin.id}`}>{coin.name}</Link>
}

export default CoinItem
