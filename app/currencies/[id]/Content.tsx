import { coinView } from '@/app/util/types'
import LikeIcon from './components/LikeIcon'
import LikeButton from './components/LikeButton'

const Content = ({
	coin,
	session,
	initialLike,
}: {
	coin: coinView
	session: any
	initialLike: boolean
}) => {
	return (
		<div className='flex flex-col gap-4'>
			<h1>{coin.name}</h1>
			{session && <LikeButton coinId={coin.id} initialLike={initialLike} />}
			{!session && <LikeIcon />}
		</div>
	)
}

export default Content
