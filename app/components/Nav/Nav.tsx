import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getGlobal, getCoins } from '@/app/util/requests'
import { numParseNoDecimal, moneyParse, numParse } from '@/app/util/formaters'
import Link from 'next/link'
import NavInput from './NavInput'
import SignOutButton from './SignOutButton'
import SignInButton from './SignInButton'
import { testCoins } from '@/testdata/coins'
import logo from '@/public/cryptocurrency.png'
import Image from 'next/image'
import style from './Nav.module.css'
import LinkButton from './LinkButton'
const { spins } = style

export const revalidate = 300
const NavContainer = async () => {
	const [session, global, coins] = await Promise.all([
		getServerSession(authOptions),
		getGlobal(),
		getCoins(),
	])

	// const coins = testCoins as coinType[]

	return (
		<nav className='flex bg-white pt-2 pb-4 box-shadow-grey flex-col relative border-b border-gray-200'>
			<div className='flex justify-between pb-2 border-b-2 border-gray-100  text-xs px-4 md:px-6'>
				<div className='flex gap-4 items-center'>
					<div>
						Cryptos:{' '}
						<span className='text-blue-500'>
							{numParseNoDecimal(global.data.active_cryptocurrencies)}
						</span>
					</div>
					<div>
						Exchange:{' '}
						<span className='text-blue-500'>
							{numParseNoDecimal(global.data.markets)}
						</span>
					</div>
					<div>
						Market Cap:{' '}
						<span className='text-blue-500'>
							{moneyParse(global.data.total_market_cap.usd)}
						</span>
					</div>
					<div className='hidden md:inline-block'>
						24h Vol:{' '}
						<span className='text-blue-500'>
							{moneyParse(global.data.total_volume.usd)}
						</span>
					</div>
					<div className='hidden md:inline-block'>
						Dominance:{' '}
						<span className='text-blue-500'>
							BTC: {numParse(global.data.market_cap_percentage.btc)}% ETH:{' '}
							{numParse(global.data.market_cap_percentage.eth)}%
						</span>
					</div>
				</div>
				<div className='hidden sm:inline-block'>
					{!session ? <SignInButton /> : <SignOutButton />}
				</div>
			</div>
			<div className='flex pt-4 justify-between px-4 md:px-6'>
				<div className='basis-4/6 flex items-center justify-start gap-8 text-base'>
					<div
						className={`text-3xl font-semibold flex items-center gap-2 ${spins}`}
					>
						<Image src={logo} alt='logo' className='h-8 w-8' />
						Tickr
					</div>
					<Link className='font-medium hover:text-blue-500' href='/'>
						Cryptocurrencies
					</Link>
					<Link
						className='hidden md:inline-block font-medium hover:text-blue-500'
						href='/exchanges'
					>
						Exchanges
					</Link>
					<Link
						className='hidden md:inline-block font-medium hover:text-blue-500'
						href='/leaderboard'
					>
						Leaderboard
					</Link>
				</div>
				<div className='hidden sm:flex basis-2/6 justify-end items-center gap-4'>
					<div className='flex text-sm'>
						<LinkButton session={session} type={'profile'} />
						<LinkButton session={session} type={'exchange'} />
					</div>
					<NavInput coins={coins} />
				</div>
				<div className='sm:hidden flex justify-end text-right items-center'>
					<div>Dropdown</div>
					{/* <Bars3Icon height={24} width={24} /> */}
				</div>
			</div>
		</nav>
	)
}

export default NavContainer
