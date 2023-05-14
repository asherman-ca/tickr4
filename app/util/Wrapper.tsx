'use client'

import { Toaster } from 'react-hot-toast'

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<>
		<Toaster />
		{children}
	</>
)
