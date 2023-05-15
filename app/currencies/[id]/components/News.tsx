import { newsType } from '@/app/util/types'
import TimeAgo from 'react-timeago'

const News = ({ news, title }: { news: newsType[]; title: string }) => {
	console.log('news', news)
	return (
		<div id='news' className='px-8 flex flex-col gap-4'>
			<h2 className='text-4xl'>{title} news</h2>
			<div>
				{news.map((item, idx) => (
					<div key={`news ${idx}`}>
						<div>news</div>
						<TimeAgo date={item.publishedAt} />
					</div>
				))}
			</div>
		</div>
	)
}

export default News
