'use client'
import { signIn } from 'next-auth/react'

const SignInButton = () => {
	return (
		<button className='btn' onClick={() => signIn('google')}>
			Login
		</button>
	)
}

export default SignInButton
