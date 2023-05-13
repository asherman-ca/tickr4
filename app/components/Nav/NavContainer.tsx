import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getGlobal } from '@/app/util/requests'
import Link from 'next/link'
import SubNav from './SubNav'
import SignOutButton from './SignOutButton'
import SignInButton from './SignInButton'

// export const dynamic = 'force-static'

const NavContainer = async () => {
	const [session, global] = await Promise.all([
		getServerSession(authOptions),
		getGlobal(),
	])

	// const session = await getServerSession(authOptions)

	return (
		<div className='flex flex-col'>
			<div className='flex justify-between items-center p-4'>
				<Link href={'/'} className='text-4xl'>
					Tickr
				</Link>
				{session && <SignOutButton />}
				{!session && <SignInButton />}
			</div>
			<SubNav />
		</div>
	)
}

export default NavContainer
