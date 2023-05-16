import Chart from './Chart'
import Markets from './Markets'
import News from './News'
import { coinHistoryType, coinView, newsType } from '@/app/util/types'

type Props = {
	coin: coinView
	news: newsType[]
	history: coinHistoryType[]
}

const handleNav = (elementId: string) => {
	const element = document.getElementById(elementId)!
	element.scrollIntoView({
		behavior: 'smooth',
		block: 'start',
		inline: 'nearest',
	})
}

const CenterPanel = ({ coin, news, history }: Props) => {
	return (
		<div className='hidden md:flex md:basis-2/3 lg:basis-1/2 flex-col gap-4 pb-4 text-base border-l border-gray-200 overflow-auto scrollbar-hide'>
			<div className='flex gap-4 pt-6 px-10 text-base border-b border-gray-200 sticky top-0 left-0 bg-white z-10'>
				<button onClick={() => handleNav('chart')}>Chart</button>
				<button onClick={() => handleNav('news')}>News</button>
				<button onClick={() => handleNav('about')}>About</button>
				<button onClick={() => handleNav('markets')}>Markets</button>
			</div>

			{/* <Chart history={history} /> */}

			<News news={news} title={coin.name} />

			<Markets coin={coin} />

			<div id='about' className='px-8 flex gap-4 flex-col'>
				<h2 className='text-4xl'>About {coin.name}</h2>
				<div className='flex flex-col gap-2'>
					<span>
						What is {coin.name} ({coin.symbol.toUpperCase()})?
					</span>
					<p className='text-gray-500'>
						{coin.description.en.replace(/<\/?a[^>]*>/g, '')}
					</p>
				</div>
			</div>
		</div>
	)
}

export default CenterPanel
