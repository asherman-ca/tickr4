import { coinHistoryType, coinView, newsType } from '@/app/util/types'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

type Props = {
	coin: coinView
	news: newsType[]
	history: coinHistoryType[]
}

const convertDate = (utc: number) => {
	console.log('utc', utc)
	const date = new Date(utc)
	console.log('date', date)
	const options = {
		timeZone: 'America/Los_Angeles',
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	}
	const pstValue = date.toLocaleString('en-US', options)
	console.log('pstval', pstValue)
	return pstValue
}

const CenterPanel = ({ coin, news, history }: Props) => {
	const data = history.slice(0, 360).map((item) => ({
		date: convertDate(item[0]),
		price: item[1],
	}))

	return (
		<div className='hidden md:flex md:basis-2/3 lg:basis-2/4 flex-col gap-4 py-6 px-8 text-base'>
			<div>
				<a href=''>Chart</a>
				<a href=''>News</a>
				<a href=''>About</a>
				<a href=''>Markets</a>
			</div>

			<ResponsiveContainer width='100%' height='100%' className='max-h-96'>
				<AreaChart
					// width={500}
					// height={200}
					data={data}
					margin={{
						top: 10,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='date' />
					<YAxis />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='price'
						stroke='#16C784'
						fill='#CFF2E3'
					/>
				</AreaChart>
			</ResponsiveContainer>

			<div>News</div>
		</div>
	)
}

export default CenterPanel
