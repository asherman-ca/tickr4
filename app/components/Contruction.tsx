'use client'
import main from '@/public/maint.json'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion } from 'framer-motion'

const Contruction = () => {
	return (
		<motion.div
			className='flex flex-col justify-center items-center gap-8 flex-1'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<h1 className='text-xl font-semibold'>
				Page under contruction, check back soon!
			</h1>
			<Player
				autoplay
				loop
				src={main}
				style={{ height: '300px', width: '300px' }}
			/>
		</motion.div>
	)
}

export default Contruction
