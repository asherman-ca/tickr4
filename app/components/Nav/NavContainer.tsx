import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignOutButton from '../SignOutButton'
import SignInButton from '../SignInButton'

const NavContainer = async () => {
	const session = await getServerSession(authOptions)
	console.log('SESH', session)
	return (
		<div>
			{session && <SignOutButton />}
			{!session && <SignInButton />}
		</div>
	)
}

export default NavContainer
