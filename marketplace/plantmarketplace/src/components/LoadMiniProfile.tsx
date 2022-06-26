import { GetServerSideProps } from 'next'
import * as React from 'react'

import { ProfileType } from '@/api/walletScan'
import MiniProfile from '@/components/profile/MiniProfile'

import { getWalletInfo } from '@/api/walletScan'
import { useRouter } from 'next/router'

const Failed = () => {
	return (
		<section>
			<div className="flex flex-col items-center justify-center text-center layout">
				<div className="text-gray-600 text-normal">Failed to get profile 🥲</div>
			</div>
		</section>
	)
}

type UserProps = {
	walletAddress: string
}

export default function LoadMiniProfile({ walletAddress }: UserProps) {
	const [profile, setProfile] = React.useState<ProfileType>(null)
	const [loading, setLoading] = React.useState(true)
	const [failed, setFailed] = React.useState(false)

	const router = useRouter()

	React.useEffect(() => {
		const getProfile = async () => {
			if (walletAddress) {
				const resp = await getWalletInfo(walletAddress)
				if (resp) {
					setProfile(resp)
				} else {
					setFailed(true)
				}
				setLoading(false)
			}
		}
		getProfile()
	}, [walletAddress])

	return (
		<div className="relative">
			{loading && <div className='text-gray-200 animate-pulse'>Loading Seller Profile...</div> }
			{!loading && <div>{!failed ? <div className='p-3 border rounded'><MiniProfile profile={profile} /></div> : <Failed />}</div>}
		</div>
	)
}
