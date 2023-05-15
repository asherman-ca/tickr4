import { coinHistoryType, coinView, newsType } from '@/app/util/types'

type Props = {
	coin: coinView
	news: newsType[]
	history: coinHistoryType[]
}

const CenterPanel = ({ coin, news, history }: Props) => {
	return (
		<div className='hidden md:flex md:basis-2/3 lg:basis-2/4 flex-col gap-4 py-6 px-8 text-base'>
			<div>
				<a href=''>Chart</a>
				<a href=''>News</a>
				<a href=''>About</a>
				<a href=''>Markets</a>
			</div>
			<div>Chart</div>
			<div>News</div>
		</div>
	)
}

export default CenterPanel
