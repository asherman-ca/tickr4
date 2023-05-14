import './globals.css'
import { Poppins } from 'next/font/google'
import NavContainer from './components/Nav/NavContainer'
import { Wrapper } from './util/Wrapper'

const poppins = Poppins({
	weight: ['500', '600', '700'],
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
		<html lang='en'>
			<body
				className={`m-h-screen scrollable flex flex-col gap-4 ${poppins.className} text-base`}
			>
				<Wrapper>
					{/* @ts-expect-error */}
					<NavContainer />
					{children}
				</Wrapper>
			</body>
		</html>
	)
}
