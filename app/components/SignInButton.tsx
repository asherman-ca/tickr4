'use client'
import { signIn } from 'next-auth/react'

const SignInButton = () => {
	return <div onClick={() => signIn('google')}>SignInButton</div>
}

export default SignInButton
