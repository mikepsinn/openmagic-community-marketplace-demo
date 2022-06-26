/* eslint-disable @next/next/no-html-link-for-pages */
import ConnectWallet from '../ConnectWallet'
import * as React from 'react'
import { useRouter } from 'next/router'
import useCurrentUser from '@/hooks/useCurrentUser'

export default function Header() {
	const router = useRouter()
	const curUser = useCurrentUser();

	return (
		<header className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
			<div className="flex items-center justify-between h-14">
				<a className="text-2xl font-medium cursor-pointer hover:text-gray-600" onClick={() => router.push('/')}>
					Market3
				</a>
				<nav>
					<ul className="flex items-center justify-between space-x-4">
						<a
							className="text-lg font-medium cursor-pointer hover:text-gray-600"
							onClick={() => router.push('/sell')}
						>
							Sell
						</a>
						<a
							className="text-lg font-medium cursor-pointer hover:text-gray-600"
							onClick={() => router.push(`/user/${curUser.address}`)}
						>
							Profile
						</a>
						<ConnectWallet />
					</ul>
				</nav>
			</div>
		</header>
	)
}
