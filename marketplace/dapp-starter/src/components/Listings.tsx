/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import ListingCard from './ListingCard'

import { getAllActiveOrders } from '@/api/web3/contract'

export default function Listings() {
	const router = useRouter()
	const [listings, setListings] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!loading) {
			setLoading(true)
			getAllActiveOrders().then(items => {
				setListings(items)
				setLoading(false)
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className="bg-white">
			<div>
				<div className="pt-20 pb-10">
					<h1 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals</h1>
					<p className="mt-4 text-base text-gray-500">
						Checkout out the latest being sold in your communities.
					</p>
				</div>
				<div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
					{listings.map(listing => (
						<ListingCard listing={listing} key={listing.id} />
					))}
				</div>
			</div>
		</div>
	)
}
