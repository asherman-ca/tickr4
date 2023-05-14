import Image from 'next/image'
import spinner from '@/public/cryptocurrency.png'

const Spinner = () => {
	return (
		<div className='flex justify-center items-center flex-1'>
			<Image src={spinner} alt='spinner' className='h-32 w-32 animate-bounce' />
		</div>
	)
}

export default Spinner
