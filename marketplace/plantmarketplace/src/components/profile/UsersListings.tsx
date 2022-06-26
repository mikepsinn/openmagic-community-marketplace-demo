/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import ListingCard from '@/components/ListingCard'

export default function Listings({ listings }) {
	return (
		<div className="pb-96">
			<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
				<p>Active Listings: {listings?.length}</p>
			</div>
			<div>
				<div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
					{listings?.map(listing => (
						<ListingCard listing={listing} key={listing.id} />
					))}
				</div>
			</div>
		</div>
	)
}
