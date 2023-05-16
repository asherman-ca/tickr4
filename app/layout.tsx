import './globals.css'
import { Poppins } from 'next/font/google'
import Nav from './components/Nav/Nav'
import { Wrapper } from './util/Wrapper'

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-poppins',
})

export const metadata = {
	title: 'Tickr',
	description: 'Cryptocurrency Prices, Charts and Testnet',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className='h-screen flex'>
			<body
				className={`scrollable flex flex-col ${poppins.className} text-base w-full`}
			>
				<Wrapper>
					{/* @ts-expect-error */}
					<Nav />
					{children}
				</Wrapper>
			</body>
		</html>
	)
}
