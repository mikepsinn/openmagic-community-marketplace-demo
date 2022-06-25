import { FC } from 'react'
import Listings from '@/components/Listings';

const Home: FC = () => {
	return (
		<div className='max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
			<Listings/>
		</div>
	)
}

export default Home
