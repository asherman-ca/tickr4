'use client'
import { signIn } from 'next-auth/react'

const SignInButton = () => {
	return <div onClick={() => signIn()}>SignInButton</div>
}

export default SignInButton
