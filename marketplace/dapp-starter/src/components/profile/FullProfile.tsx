import * as React from 'react'

import { ProfileType } from '@/api/walletScan'

import MiniProfile from './MiniProfile'

import TabMenu from './TabMenu'

import Chat from '../Chat'

import Daos from './Daos'
import POAPs from './POAPs'
import NFTs from './NFTs'
import SBTs from './SBTs'
import Social from './Social'
import Writings from './Writings'

const tabs = [{ name: 'Overview' }, { name: 'Listings' }, { name: 'Transactions & Reviews' }]

export default function FullProfile({ profile }: { profile: ProfileType }) {
	const [activeTab, setActiveTab] = React.useState('Overview')
	const [showChat, setShowChat] = React.useState(false)

	return (
		<div className="bg-gray-50">
			<div className="bg-white border-b border-gray-200">
				<div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
					<MiniProfile profile={profile} />
					<button
						type="submit"
						onClick={() => {setShowChat(true)}}
						className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none"
					>
						Message
					</button>
					<TabMenu tabs={tabs} activeTab={activeTab} selectTab={tab => setActiveTab(tab)} />
				</div>
			</div>
			<div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
				{activeTab == 'Overview' && (
					<div>
						<Social lens={profile.lens} profile={profile} />
						<hr className="my-6" />
						<Daos daos={profile.daos} />
						<hr className="my-6" />
						<POAPs poaps={profile.poaps} />
						<hr className="my-6" />
						<SBTs sbts={[]} />
						<hr className="my-6" />
						<Writings mirror={profile.mirror} />
						<hr className="my-6" />
						<NFTs nfts={profile.nfts} />
						<div className="pb-10" />
					</div>
				)}
				{/* {activeTab == 'DAOs' && <Daos daos={profile.daos} />}
			{activeTab == 'POAPs' && <POAPs poaps={profile.poaps} />}
			{activeTab == 'NFTs' && <NFTs nfts={profile.nfts} />}
			{activeTab == 'SBTs' && <SBTs sbts={[]} />}
			{activeTab == 'Social' && <Social lens={profile.lens} profile={profile} />}
			{activeTab == 'Writings' && <Writings mirror={profile.mirror} />} */}
			</div>
			<Chat address={profile.address} showChat={showChat} setShowChat={setShowChat} />
		</div>
	)
}
