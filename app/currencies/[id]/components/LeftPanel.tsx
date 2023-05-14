import { coinView } from '@/app/util/types'
import LikeButton from './LikeButton'

type Props = {
	coin: coinView
	initialLike: boolean
	session: any
}

const LeftPanel = ({ coin, initialLike, session }: Props) => {
	return (
		<div className='flex basis-1/5'>
			LeftPanel
			<LikeButton
				coinId={coin.id}
				initialLike={initialLike}
				session={session}
			/>
		</div>
	)
}

export default LeftPanel
