import Chart from './Chart'
import Markets from './Markets'
import News from './News'
import { coinHistoryType, coinView, newsType } from '@/app/util/types'

type Props = {
	coin: coinView
	news: newsType[]
	history: coinHistoryType[]
}

const CenterPanel = ({ coin, news, history }: Props) => {
	return (
		<div className='hidden md:flex md:basis-2/3 lg:basis-1/2 flex-col gap-4 py-6 text-base border-l border-gray-200'>
			<div className='flex gap-4 px-10 text-base border-b border-gray-200'>
				<a href='#chart' className='pb-2'>
					Chart
				</a>
				<a href='#news' className='pb-2'>
					News
				</a>
				<a href='#about' className='pb-2'>
					About
				</a>
				<a href='#markets' className='pb-2'>
					Markets
				</a>
			</div>

			<Chart history={history} />

			<News news={news} />

			<Markets coin={coin} />

			{/* <div id='about'></div> */}
		</div>
	)
}

export default CenterPanel
