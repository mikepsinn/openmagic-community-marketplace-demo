/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React from 'react'
import HoverOverlay from './HoverOverlay'
import { timeSince } from '@/lib/time'

const ListingCard = ({ listing }) => {
	const router = useRouter()

	return (
		<div key={listing.id} className="relative">
			<div
				className="w-full h-56 overflow-hidden bg-gray-200 rounded-md hover:opacity-75 lg:h-72 xl:h-80"
				onClick={() => router.push(`/listing/${listing.id}`)}
			>
				<img src={listing.imageSrc} className="object-cover object-center w-full h-full cursor-pointer" />
			</div>
			<h3 className="mt-4 text-lg font-medium text-gray-700">
				<a>{listing.price}</a>
			</h3>
			<p onClick={() => router.push(`/listing/${listing.id}`)} className="text-gray-600 cursor-pointer text-normal hover:underline">
				{listing.title}
			</p>
			<div className="flex mt-1 space-x-2 text-sm text-gray-500">
				<HoverOverlay walletAddress={listing.seller} />
				<span>
				{timeSince(listing.timestamp)} ago
				</span>
			</div>
			{listing.communities.length > 0 && (
				<div className="mt-1 text-sm">
					<span className="text-gray-500">Only for members of</span>{' '}
					<span className="text-blue-500">
						{listing.communities.map(community => (
							<span key={community.name}>{community.name}</span>
						))}
					</span>
				</div>
			)}
		</div>
	)
}

export default ListingCard
