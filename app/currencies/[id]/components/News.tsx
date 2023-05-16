import { newsType } from '@/app/util/types'
import TimeAgo from 'react-timeago'
import logo from '@/public/cryptocurrency.png'
import Image from 'next/image'

const News = ({ news, title }: { news: newsType[]; title: string }) => {
	console.log('news', news)
	return (
		<div id='news' className='px-8 flex flex-col gap-6'>
			<h2 className='text-4xl'>{title} news</h2>
			<div className='flex gap-6 flex-col'>
				{news.map((item, idx) => (
					<div key={`news ${idx}`} className='flex flex-col gap-6'>
						<div className='text-gray-500 text-sm'>
							<TimeAgo date={item.publishedAt} />
						</div>
						<div className='flex gap-4 items-center'>
							<div>
								<div className='font-semibold'>{item.title}</div>
								<div className='max-h-52 text-gray-500'>{item.content}</div>
							</div>

							{item.urlToImage ? (
								<img
									className='h-32 w-36 rounded-md'
									src={item.urlToImage}
									alt='logo'
								/>
							) : (
								<Image src={logo} className='h-32 w-36' alt='logo' />
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default News
