import * as React from 'react'
import CommunityCheckbox from './CommunityCheckbox'

export default function Communities({ profile }) {
	return (
		<div>
			<div className="">
				{profile.daos.daos.map(dao => (
					<CommunityCheckbox
						key={JSON.stringify(dao)}
						title={dao.name || <span className="text-gray-600">No Name</span>}
            image={dao.image}
					/>
				))}
        {profile.nfts.map(nft => (
					<CommunityCheckbox
						key={JSON.stringify(nft)}
						title={nft.name || <span className='text-gray-500'>No Title</span>}
            image={nft.image_url}
					/>
				))}
        {profile.poaps.map(poap => (
					<CommunityCheckbox
						key={JSON.stringify(poap)}
						title={poap.event.name}
            image={poap.event.image_url}
					/>
				))}
			</div>
		</div>
	)
}
