import * as React from 'react'
import ProfileImage from './ProfileImage'
import { timeConverter } from '@/lib/time'
import { ProfileType } from '@/api/walletScan'

export default function MiniProfile({ profile }: { profile: ProfileType }) {
	return (
		<div className="p-4 mt-3 mb-4 border rounded">
			<div className="flex items-center space-x-5 ">
				<div className="flex-shrink-0">
					<div className="relative">
						<ProfileImage profile={profile} small={false} />
						<span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
					</div>
				</div>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{profile.ensName || profile.address}</h1>
					{profile?.first_tx?.timestamp ? (
						<p className="text-sm font-medium text-gray-500">
							Web3 user since{' '}
							<a href={`https://etherscan.io/tx/${profile.first_tx.hash}`} className="text-gray-900">
								<time dateTime="2020-08-25">{timeConverter(profile?.first_tx?.timestamp)}</time>
							</a>{' '}
						</p>
					) : (
						<p className="text-sm font-medium text-gray-500">No transactions yet 😮</p>
					)}
				</div>
			</div>
			<div className="flex justify-start mt-2 space-x-6 text-sm font-medium text-gray-500">
				<p>Total Daos: {profile.daos.totalDaos}</p>
        <p>Total POAPs: {profile.poaps.length}</p>
        <p>Total NFTs: {profile.nfts.ownedNfts.length}</p>
        <p>Total Writings: {profile.mirror.length}</p>
			</div>
		</div>
	)
}
