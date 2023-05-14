import { coinHistoryType, coinView, newsType } from '@/app/util/types'

type Props = {
	coin: coinView
	news: newsType[]
	history: coinHistoryType[]
}

const CenterPanel = ({ coin, news, history }: Props) => {
	return <div className='flex basis-3/5'>CenterPanel</div>
}

export default CenterPanel
