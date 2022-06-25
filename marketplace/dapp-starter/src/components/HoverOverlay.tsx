import { GetServerSideProps } from 'next'
import * as React from 'react'

import { ProfileType } from '@/api/walletScan'
import MiniProfile from '@/components/profile/MiniProfile'

import Loading from '@/components/Loading'

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

export default function HoverOverlay({ walletAddress }: UserProps) {
	const [profile, setProfile] = React.useState<ProfileType>(null)
	const [loading, setLoading] = React.useState(true)
	const [failed, setFailed] = React.useState(false)

	const [hover, setHover] = React.useState(false)

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
			<span
				onClick={() => {
					router.push(`/user/${walletAddress}`)
				}}
				className="hover:underline"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{walletAddress}
			</span>
			{hover && (
				<div className="absolute z-50 p-4 bg-white rounded-md shadow-md">
					{loading && 'Loading...'}
					{!loading && <div>{!failed ? <MiniProfile profile={profile} /> : <Failed />}</div>}
				</div>
			)}
		</div>
	)
}
