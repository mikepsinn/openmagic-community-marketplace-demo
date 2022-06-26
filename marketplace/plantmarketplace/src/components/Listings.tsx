/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import ListingCard from './ListingCard'

import { getAllActiveOrdersVisibleToWalletAndPlants } from '@/api/web3/contract'
import useCurrentUser from '@/hooks/useCurrentUser'

export default function Listings() {
	const router = useRouter()
	const [listings, setListings] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const curUser = useCurrentUser();

	useEffect(() => {
		if (!loading && curUser) {
			setLoading(true)
			getAllActiveOrdersVisibleToWalletAndPlants(curUser).then(items => {
				setListings(items)
				setLoading(false)
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [curUser])
	return (
		<div>
			<div>
				<div className="pt-20 pb-10 text-center bg-green-800">
					<h1 className="text-4xl font-extrabold tracking-tight text-green-100">Plants Only</h1>
					<p className="mt-4 text-base text-green-200">
						The marketplace for luxury house plants.
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
