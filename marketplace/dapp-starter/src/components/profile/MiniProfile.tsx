import * as React from 'react'
import ProfileImage from './ProfileImage'
import { timeConverter } from '@/lib/time'
import { ProfileType } from '@/api/walletScan'
import { useRouter } from 'next/router'
import truncateEthAddress from 'truncate-eth-address'

export default function MiniProfile({ profile }: { profile: ProfileType }) {
	const router = useRouter();
	return (
		<div className="pb-2 mt-3 mb-4">
			<div className="flex items-center space-x-5 ">
				<div className="flex-shrink-0">
					<div className="relative">
						<ProfileImage profile={profile} small={false} />
						<span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
					</div>
				</div>
				<div>
					<a className='cursor-pointer hover:underline' onClick={() => router.push(`/user/${profile.ensName || profile.address}`)}>
						<h1 className="text-2xl font-bold text-gray-900">
							{profile.ensName || truncateEthAddress(profile.address)}
							{profile.ensName && (
								<span className="ml-2 text-sm font-normal text-gray-600">{truncateEthAddress(profile.address)}</span>
							)}
						</h1>
					</a>
					{profile?.first_tx?.timestamp ? (
						<p className="text-sm font-medium text-gray-500">
							Web3 user since{' '}
							<a href={`https://etherscan.io/tx/${profile.first_tx.hash}`} className="text-gray-900 hover:underline">
								<time dateTime="2020-08-25">{timeConverter(profile?.first_tx?.timestamp)}</time>
							</a>{' '}
						</p>
					) : (
						<p className="text-sm font-medium text-gray-500">No transactions yet 😮</p>
					)}
				</div>
			</div>
			<div className="flex justify-start mt-2 space-x-6 text-sm font-medium text-gray-500">
				<p>100% Positive Feedback</p>
				<p>Reviews: 124</p>
				<p>DAOs: {profile.daos.totalDaos}</p>
				<p>POAPs: {profile.poaps.length}</p>
				<p>NFTs: {profile.nfts.ownedNfts.length == 100 ? '100+' : profile.nfts.ownedNfts.length}</p>
				<p>Writings: {profile.mirror.length}</p>
			</div>
		</div>
	)
}
