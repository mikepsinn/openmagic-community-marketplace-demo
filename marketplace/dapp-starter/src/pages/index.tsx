import { FC } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser';
import { uploadToIPFS } from "../api/web3/ipfs";

const Home: FC = () => {
	// const currUser = useCurrentUser();
	return (
		<div className='max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
			{/* {JSON.stringify(currUser.ensName)} */}

			<button onClick={()=>uploadToIPFS()}>
				click me
			</button>
		</div>
	)
}

export default Home
