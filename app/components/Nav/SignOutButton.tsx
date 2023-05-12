'use client'
import { signOut } from 'next-auth/react'

import React from 'react'

const SignOutButton = () => {
	return (
		<button className='btn' onClick={() => signOut()}>
			Logout
		</button>
	)
}

export default SignOutButton
