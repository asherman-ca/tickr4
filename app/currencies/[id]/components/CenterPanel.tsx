import { coinHistoryType, coinView, newsType } from '@/app/util/types'

type Props = {
	coin: coinView
	news: newsType[]
	history: coinHistoryType[]
}

const CenterPanel = ({ coin, news, history }: Props) => {
	return (
		<div className='hidden md:flex md:basis-2/3 lg:basis-2/4'>CenterPanel</div>
	)
}

export default CenterPanel
