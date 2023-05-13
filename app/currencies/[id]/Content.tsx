import { coinView } from '@/app/util/types'
import LikeIcon from './components/LikeIcon'
import LikeButton from './components/LikeButton'

const Content = ({ coin, session }: { coin: coinView; session: any }) => {
	return (
		<div className='flex flex-col gap-4'>
			<h1>{coin.name}</h1>
			{session && <LikeButton coinId={coin.id} />}
			{!session && <LikeIcon />}
		</div>
	)
}

export default Content
