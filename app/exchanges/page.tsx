import Contruction from '../components/Contruction'
import { getExchanges } from '../util/requests'
import ExchangesTable from './components/ExchangesTable'

const page = async () => {
	const exchanges = await getExchanges()

	return <ExchangesTable exchanges={exchanges} />
}

export default page
