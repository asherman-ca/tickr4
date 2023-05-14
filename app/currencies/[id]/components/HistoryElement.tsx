'use client'

import { coinHistoryType } from '@/app/util/types'

const HistoryElement = ({ history }: { history: coinHistoryType[] }) => {
	console.log(history)
	return <div>HistoryElement</div>
}

export default HistoryElement
