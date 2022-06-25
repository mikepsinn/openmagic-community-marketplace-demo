import * as React from 'react'

import { ProfileType } from '@/api/walletScan'

import MiniProfile from './MiniProfile'

import TabMenu from './TabMenu'

import Daos from './Daos'
import POAPs from './POAPs'
import NFTs from './NFTs'
import SBTs from './SBTs'
import Social from './Social'
import Writings from './Writings'

const tabs = [
	{ name: 'Listings' },
	{ name: 'Reviews' },
	{ name: 'DAOs' },
	{ name: 'POAPs' },
	{ name: 'NFTs' },
	{ name: 'SBTs' },
	{ name: 'Social' },
	{ name: 'Writings' },
]

export default function FullProfile({ profile }: { profile: ProfileType }) {
	const [activeTab, setActiveTab] = React.useState('Listings')

	return (
		<div>
			<MiniProfile profile={profile} />
			<TabMenu tabs={tabs} activeTab={activeTab} selectTab={tab => setActiveTab(tab)} />
			{activeTab == 'DAOs' && <Daos daos={profile.daos} />}
			{activeTab == 'POAPs' && <POAPs poaps={profile.poaps} />}
			{activeTab == 'NFTs' && <NFTs nfts={profile.nfts} />}
			{activeTab == 'SBTs' && <SBTs sbts={[]} />}
			{activeTab == 'Social' && <Social lens={profile.lens} profile={profile} />}
			{activeTab == 'Writings' && <Writings mirror={profile.mirror} />}
		</div>
	)
}
