import { FC } from 'react'
import Listings from '@/components/Listings';

import { getAllOrders, listItem, acceptItem } from "../api/web3/contract"
import { getMirrorArticleFromHash } from '@/api/web3/mirror';

const Home: FC = () => {
	// const currUser = useCurrentUser();
	return (
		<div className='max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
			<Listings />
		</div>
	)
}

export default Home
