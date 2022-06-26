/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import ListingCard from '@/components/ListingCard'

import { getPurchaseHistoryForBuyer, getCompletedOrdersForSeller } from '@/api/web3/contract'

export default function UserTransactions({ address }) {
	const router = useRouter()
	const [purchased, setPurchased] = useState<any[]>([])
	const [sold, setSold] = useState<any[]>([])

	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!loading) {
			setLoading(true)
			getPurchaseHistoryForBuyer(address).then(items => {
				setPurchased(items)
				setLoading(false)
			})
			getCompletedOrdersForSeller(address).then(items => {
				setSold(items)
				setLoading(false)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className="pb-96">
			<div>
				<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
					<p>Purchased: {purchased.length}</p>
				</div>
				<div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
					{purchased.map(listing => (
						<ListingCard listing={listing} key={listing.id} />
					))}
				</div>
				<div className="flex justify-start my-4 space-x-6 text-sm font-medium text-gray-500">
					<p>Sold: {sold.length}</p>
				</div>
				<div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
					{sold.map(listing => (
						<ListingCard listing={listing} key={listing.id} />
					))}
				</div>
			</div>
		</div>
	)
}
