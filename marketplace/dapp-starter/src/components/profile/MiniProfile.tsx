import * as React from 'react'
import ProfileImage from './ProfileImage'
import { timeConverter } from '@/lib/time'
import { ProfileType } from '@/api/walletScan'
import { useRouter } from 'next/router'
import truncateEthAddress from 'truncate-eth-address'
import useChat from '@/hooks/useChat'

import { StarIcon } from '@heroicons/react/solid'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const reviews = { average: 4, totalCount: 1624 }

export default function MiniProfile({
	profile,
	showMessageButton = false,
}: {
	profile: ProfileType
	showMessageButton?: boolean
}) {
	const { setShowChat, setAddress } = useChat()
	const router = useRouter()
	return (
		<div className="pb-2 mt-3 ">
			<div className="flex items-center space-x-5 ">
				<div className="flex-shrink-0">
					<div className="relative">
						<ProfileImage profile={profile} small={false} />
						<span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
					</div>
				</div>
				<div>
					<a
						className="cursor-pointer hover:underline"
						onClick={() => router.push(`/user/${profile.ensName || profile.address}`)}
					>
						<h1 className="text-2xl font-bold text-gray-900">
							{profile.ensName || truncateEthAddress(profile.address)}
							{profile.ensName && (
								<span className="ml-2 text-sm font-normal text-gray-600">
									{truncateEthAddress(profile.address)}
								</span>
							)}
						</h1>
					</a>
					{profile?.first_tx?.timestamp ? (
						<p className="text-sm font-medium text-gray-500">
							Web3 user since{' '}
							<a
								href={`https://etherscan.io/tx/${profile.first_tx.hash}`}
								className="text-gray-900 hover:underline"
							>
								<time dateTime="2020-08-25">{timeConverter(profile?.first_tx?.timestamp)}</time>
							</a>{' '}
						</p>
					) : (
						<p className="text-sm font-medium text-gray-500">No transactions yet 😮</p>
					)}
				</div>
			</div>
			<div className="flex justify-start mt-2 space-x-6 text-sm font-medium text-gray-500">
				<div className="flex items-center">
					<div>
						<div className="flex items-center">
							{[0, 1, 2, 3, 4].map(rating => (
								<StarIcon
									key={rating}
									className={classNames(
										reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
										'h-5 w-5 flex-shrink-0'
									)}
									aria-hidden="true"
								/>
							))}
						</div>
						<p className="sr-only">{reviews.average} out of 5 stars</p>
					</div>
					<p className="ml-2 text-sm text-gray-500">{reviews.totalCount} Reviews</p>
				</div>
				<p>{profile.daos.totalDaos} DAOs</p>
				<p>{profile.poaps.length} POAPs</p>
				<p>{profile.nfts.length == 100 ? '100+' : profile.nfts.length} NFTs</p>
				<p>{profile.mirror.length} Articles</p>
			</div>
			{showMessageButton && (
				<button
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						setAddress(profile.address)
						setShowChat(true)
					}}
					className="inline-flex justify-center px-4 py-2 mt-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none"
				>
					Message
				</button>
			)}
		</div>
	)
}
