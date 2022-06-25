import React from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'
import AssetImage from './profile/AssetImage'

const ListingCard = ({ listing }) => {
	const currentUser = useCurrentUser()
	return (
		<div
			className="relative flex items-center px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm"
		>
			<div className="flex-shrink-0">
				<AssetImage image={listing.image} />
			</div>
			<div className="flex-1 min-w-0">
				<div className="focus:outline-none">
					<span className="absolute inset-0" aria-hidden="true" />
					<h3 className="text-lg font-medium text-gray-900">
						{listing.title || <span className="text-gray-500">No Title</span>}
					</h3>
          <p className='font-normal text-gray-800'>{listing.price}</p>
          <p className="text-sm text-gray-500 truncate">{listing.availability}</p>
				</div>
			</div>
		</div>
	)
}

export default ListingCard
