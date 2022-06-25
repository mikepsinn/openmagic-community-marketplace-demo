import { FC } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser';

import { getAllOrders } from "../api/contract"

const Home: FC = () => {
	// const currUser = useCurrentUser();
	const testOnClick = () => {
		getAllOrders().then(console.log)
	}

	return (
		<div className='max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
			{/* {JSON.stringify(currUser.ensName)} */}
			<button onClick={testOnClick}>
				click me
			</button>
		</div>
	)
}

export default Home
