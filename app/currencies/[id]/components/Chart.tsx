import { coinHistoryType } from '@/app/util/types'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'

const convertDate = (utc: number) => {
	const date = new Date(utc)
	const options = {
		timeZone: 'America/Los_Angeles',
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	} as any
	const pstValue = date.toLocaleString('en-US', options)
	return pstValue
}

const Chart = ({ history }: { history: coinHistoryType[] }) => {
	const data = history.slice(0, 360).map((item) => ({
		date: convertDate(item[0]),
		price: item[1] > 1 ? item[1].toFixed(2) : item[1],
	}))

	console.log('hits')
	console.log('history', history)

	return (
		<ResponsiveContainer
			className='text-sm px-8'
			width='90%'
			height={400}
			id='chart'
		>
			<AreaChart
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
				<YAxis label={{ value: 'USD', angle: -90, position: 'insideLeft' }} />
				<Tooltip />
				<Area
					type='monotone'
					dataKey='price'
					stroke='#16C784'
					fill='#ECF9F5'
					name='$USD'
				/>
			</AreaChart>
		</ResponsiveContainer>
	)
}

export default Chart
