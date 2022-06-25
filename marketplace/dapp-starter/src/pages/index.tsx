import { FC } from 'react'
import Listings from '@/components/Listings';

import { getAllOrders, listItem, acceptItem } from "../api/web3/contract"
import { getMirrorArticleFromHash } from '@/api/web3/mirror';
import useCurrentUser from '@/hooks/useCurrentUser';
import { uploadToIPFS } from "../api/web3/ipfs";

import { listings } from '@/api/listings';

const Home: FC = () => {
	return (
		<div className='max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
			<Listings listings={listings} />
		</div>
	)
}

export default Home
