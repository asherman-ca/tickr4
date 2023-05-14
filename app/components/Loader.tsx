import { Player } from '@lottiefiles/react-lottie-player'
import { motion } from 'framer-motion'
import spinner from '@/public/spinner.json'

const Loader = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className='flex justify-center items-center flex-1'
		>
			<Player
				autoplay
				loop
				src={spinner}
				style={{ height: '300px', width: '300px' }}
			/>
		</motion.div>
	)
}

export default Loader
