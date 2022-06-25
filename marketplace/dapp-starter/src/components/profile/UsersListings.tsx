/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import ListingCard from '@/components/ListingCard'

import { getOpenListingForSeller } from '@/api/web3/contract'

export default function Listings({ wallet }) {
	const router = useRouter()
	const [listings, setListings] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!loading) {
			setLoading(true)
			getOpenListingForSeller(wallet).then(items => {
				setListings(items)
				setLoading(false)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className="pb-96">
			<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
				<p>Active Listings: {listings.length}</p>
			</div>
			<div>
				<div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
					{listings.map(listing => (
						<ListingCard listing={listing} key={listing.id} />
					))}
				</div>
			</div>
		</div>
	)
}
