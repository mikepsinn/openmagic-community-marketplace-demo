/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import ListingCard from './ListingCard'

import { getAllOrders } from '@/api/web3/contract'

export default function Listings() {
	const router = useRouter();
	const [listings, setListings] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!loading) {
			setLoading(true);
			getAllOrders().then(items => {
				setListings(items)
				setLoading(false)
			});
		}
	}, [])

	return (
		<div className="bg-white">
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
