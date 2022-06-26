import * as React from 'react'
import CommunityCheckbox from './CommunityCheckbox'

import { groupByCollection, EthNYCCommunity } from '@/lib/nft'

export default function Communities({ profile }) {
	const collections = groupByCollection(profile.nfts)
	if (profile.is_participant) {
		collections.push(EthNYCCommunity)
	}

	return (
		<div>
			<div className="">
				<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
					<p>DAOs</p>
				</div>
				{profile.daos.daos.map(dao => (
					<CommunityCheckbox
						key={JSON.stringify(dao)}
						title={dao.name || <span className="text-gray-600">No Name</span>}
						image={dao.image}
					/>
				))}
				{profile.daos.daos.length === 0 && <span className='text-sm font-medium text-gray-400'>You aren`t in any DAOs</span> }
				<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
					<p>NFT Communities</p>
				</div>
				{collections.map(collection => (
					<CommunityCheckbox
						key={JSON.stringify(collection)}
						title={collection.name || <span className="text-gray-500">No Title</span>}
						image={collection.image_url}
					/>
				))}
				{collections.length === 0 && <span className='text-sm font-medium text-gray-400'>You don`t have any NFTs</span> }
				<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
					<p>POAPs</p>
				</div>
				{profile.poaps.map(poap => (
					<CommunityCheckbox
						key={JSON.stringify(poap)}
						title={poap.event.name}
						image={poap.event.image_url}
					/>
				))}
				{profile.poaps.length === 0 && <span className='text-sm font-medium text-gray-400'>You don`t have any POAPs</span> }
			</div>
		</div>
	)
}
