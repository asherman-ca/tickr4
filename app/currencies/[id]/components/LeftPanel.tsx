import { coinView } from '@/app/util/types'
import LikeButton from './LikeButton'
import {
	moneyParseTwoDecimal,
	numParseTwoDecimal,
	numParseNoDecimal,
} from '@/app/util/formaters'
import { HiShare } from 'react-icons/hi'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import {
	HiOutlineStar,
	HiPlusSm,
	HiOutlineChartPie,
	HiOutlineInformationCircle,
	HiGlobeAlt,
	HiOutlineDocumentText,
	HiChevronUp,
} from 'react-icons/hi'
import { GrReddit } from 'react-icons/gr'
import { GoMarkGithub } from 'react-icons/go'
import { RxMagnifyingGlass } from 'react-icons/rx'
import Image from 'next/image'

type Props = {
	coin: coinView
	initialLike: boolean
	session: any
}

const LeftPanel = ({ coin, initialLike, session }: Props) => {
	return (
		<div className='flex flex-col md:basis-1/3 lg:basis-1/4 gap-4 p-6 flex-1'>
			<div className='flex justify-between'>
				<div className='flex gap-1 items-center'>
					<Image
						src={coin.image.thumb}
						height={600}
						width={600}
						alt='coin logo'
						className='h-6 w-6'
					/>
					<h2 className='text-xl'>{coin.name}</h2>
					<span className='text-gray-500 text-sm'>
						{coin.symbol.toUpperCase()}
					</span>
				</div>
				<div className='flex gap-2'>
					<LikeButton
						coinId={coin.id}
						initialLike={initialLike}
						session={session}
					/>
					<button className='bg-gray-100 rounded-md p-2'>
						<HiShare className='h-4 w-4 fill-gray-500' />
					</button>
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				<div className='text-4xl font-semibold'>
					{moneyParseTwoDecimal(coin.market_data.current_price.usd)}
				</div>
				<div className='flex justify-between text-sm'>
					<div
						className={`flex items-center gap-1 ${
							coin.market_data.price_change_percentage_1h_in_currency.usd > 0
								? 'text-green-500'
								: 'text-red-500'
						}`}
					>
						{coin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? (
							<VscTriangleUp className='h-4 w-4' />
						) : (
							<VscTriangleDown className='h-4 w-4' />
						)}
						{numParseTwoDecimal(
							coin.market_data.price_change_percentage_1h_in_currency.usd
						)}
						% (1h)
					</div>
					<div
						className={`flex items-center gap-1 ${
							coin.market_data.price_change_percentage_24h_in_currency.usd > 0
								? 'text-green-500'
								: 'text-red-500'
						}`}
					>
						{coin.market_data.price_change_percentage_24h_in_currency.usd >
						0 ? (
							<VscTriangleUp className='h-4 w-4' />
						) : (
							<VscTriangleDown className='h-4 w-4' />
						)}
						{numParseTwoDecimal(
							coin.market_data.price_change_percentage_24h_in_currency.usd
						)}
						% (24h)
					</div>
					<div
						className={`flex items-center gap-1 ${
							coin.market_data.price_change_percentage_7d_in_currency.usd > 0
								? 'text-green-500'
								: 'text-red-500'
						}`}
					>
						{coin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? (
							<VscTriangleUp className='h-4 w-4' />
						) : (
							<VscTriangleDown className='h-4 w-4' />
						)}
						{numParseTwoDecimal(
							coin.market_data.price_change_percentage_7d_in_currency.usd
						)}
						% (7d)
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-2 text-gray-500 text-sm'>
				<button className='bg-gray-100 p-2 rounded-md flex justify-between items-center'>
					<div className='flex gap-1 items-center'>
						<HiOutlineStar className='text-black h-4 w-4' />
						Add to watchlist
					</div>
					<HiPlusSm className='h-5 w-5' />
				</button>
				<button className='bg-gray-100 p-2 rounded-md flex justify-between'>
					<div className='flex gap-1 items-center'>
						<HiOutlineChartPie className='text-black h-4 w-4' />
						Purchase in testnet
					</div>
					<HiPlusSm className='h-5 w-5' />
				</button>
			</div>

			<div className='flex flex-col gap-4 text-sm'>
				<div className='flex justify-between items-center'>
					<div className='text-gray-500 flex items-center gap-1'>
						Market Cap
						<HiOutlineInformationCircle className='w-4 h-4' />
					</div>
					<span>{moneyParseTwoDecimal(coin.market_data.market_cap.usd)}</span>
				</div>
				<div className='flex justify-between items-center'>
					<div className='text-gray-500 flex items-center gap-1'>
						Volume
						<HiOutlineInformationCircle className='w-4 h-4' />
					</div>
					<span>{moneyParseTwoDecimal(coin.market_data.total_volume.usd)}</span>
				</div>
				<div className='flex justify-between items-center'>
					<div className='text-gray-500 flex items-center gap-1'>
						Volume/Market Cap <HiOutlineInformationCircle className='w-4 h-4' />
					</div>
					<span>
						{numParseTwoDecimal(
							(coin.market_data.total_volume.usd /
								coin.market_data.market_cap.usd) *
								100
						)}
						%
					</span>
				</div>
				<div className='flex justify-between items-center'>
					<div className='text-gray-500 flex gap-1 items-center'>
						Circulating Supply
						<HiOutlineInformationCircle className='w-4 h-4' />
					</div>
					<span>{numParseNoDecimal(coin.market_data.circulating_supply)}</span>
				</div>
				<div className='flex justify-between items-center'>
					<div className='text-gray-500 flex gap-1 items-center'>
						Max Supply
						<HiOutlineInformationCircle className='w-4 h-4' />
					</div>
					<span>{numParseNoDecimal(coin.market_data.total_supply)}</span>
				</div>
				<div className='flex justify-between items-center'>
					<div className='text-gray-500 flex gap-1 items-center'>
						All Time High
						<HiOutlineInformationCircle className='w-4 h-4' />
					</div>
					<span
						className={`flex gap-1 items-center ${
							coin.market_data.ath_change_percentage.usd < 0
								? 'text-red-500'
								: 'text-green-500'
						}`}
					>
						{coin.market_data.ath_change_percentage.usd < 0 ? (
							<VscTriangleDown className='h-4 w-4' />
						) : (
							<VscTriangleUp className='h-4 w-4' />
						)}
						{moneyParseTwoDecimal(coin.market_data.ath_change_percentage.usd)}
					</span>
				</div>
			</div>
			<div className='flex flex-col gap-2 text-sm'>
				<span>Official links</span>
				<div className='flex justify-start items-center gap-2'>
					<a
						href={coin.links.homepage[0]}
						target='_blank'
						rel='noopener noreferrer'
						className='py-1 px-2 rounded-md bg-gray-100 flex gap-1 items-center'
					>
						<HiGlobeAlt className='h-4 w-4' />
						Website
					</a>
					<a
						href={coin.links.homepage[0]}
						target='_blank'
						rel='noopener noreferrer'
						className='py-1 px-2 rounded-md bg-gray-100 flex gap-1 items-center'
					>
						<HiOutlineDocumentText className='h-4 w-4' />
						Whitepaper
					</a>
					<a
						href={coin.links.repos_url.github[0]}
						target='_blank'
						rel='noopener noreferrer'
						className='py-1 px-2 rounded-md bg-gray-100 flex gap-1 items-center'
					>
						<GoMarkGithub className='h-4 w-4' />
						GitHub
					</a>
				</div>
			</div>
			<div className='flex flex-col gap-2 text-sm'>
				<span>Socials</span>
				<div className='flex justify-start items-center'>
					<a
						href={coin.links.subreddit_url}
						target='_blank'
						rel='noopener noreferrer'
						className='py-1 px-2 rounded-md bg-gray-100 flex gap-1 items-center'
					>
						<GrReddit className='w-4 h-4' />
						Reddit
					</a>
				</div>
			</div>
			<div className='flex flex-col gap-2 text-sm'>
				Network Information
				<div className='flex justify-start items-center'>
					<div className='py-1 px-2 rounded-md bg-gray-100 flex gap-1 items-center group relative'>
						<RxMagnifyingGlass className='w-4 h-4' />
						Chain explorers
						<HiChevronUp className='w-4 h-4' />
						<div className='group-hover:flex absolute hidden bottom-[100%] left-0 w-full'>
							<div className='bg-white shadow-md mb-4 p-4 rounded-md flex flex-col gap-2 min-w-full btmCarrot relative'>
								{coin.links.blockchain_site
									.filter((site) => site.length > 0)
									.map((site, index) => (
										<a key={`blockchainsite ${index}`} href=''>
											{site.split('//')[1]?.split('/')[0]}
										</a>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LeftPanel
