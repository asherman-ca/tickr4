import { getExchanges, getDerivExchanges } from '../util/requests'
import ExchangesTable from './components/ExchangesTable'
export const revalidate = 60000
const page = async () => {
	const [exchanges, derivExchanges] = await Promise.all([
		getExchanges(),
		getDerivExchanges(),
	])
	// const exchanges = await getExchanges()

	return (
		<ExchangesTable exchanges={exchanges} derivExchanges={derivExchanges} />
	)
}

export default page
