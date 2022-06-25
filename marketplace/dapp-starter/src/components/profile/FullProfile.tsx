import * as React from 'react'

import ProfileImage from './ProfileImage'
import { timeConverter } from "@/lib/time";
import { ProfileType } from '@/api/walletScan'

import TabMenu from './TabMenu';

import Daos from './Daos';
import POAPs from './POAPs';
import NFTs from './NFTs';
import SBTs from './SBTs';
import Social from './Social';
import Writings from './Writings';

const tabs = [
  { name: 'Listings' },
  { name: 'Reviews' },
  { name: 'DAOs' },
  { name: 'POAPs' },
  { name: 'NFTs'},
  { name: 'SBTs'},
  { name: 'Social' },
  { name: 'Writings' },
]

export default function FullProfile({ profile }: { profile: ProfileType }) {
  const [activeTab, setActiveTab] = React.useState("Listings");
  
	return (
		<div>
			<div className="flex items-center space-x-5">
				<div className="flex-shrink-0">
					<div className="relative">
						<ProfileImage profile={profile} small={false} />
						<span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
					</div>
				</div>
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{profile.ensName || profile.address}</h1>
          {profile?.first_tx?.timestamp ?
            <p className="text-sm font-medium text-gray-500">
              Web3 user since{' '}
              <a href={`https://etherscan.io/tx/${profile.first_tx.hash}`} className="text-gray-900">
              <time dateTime="2020-08-25">{timeConverter(profile?.first_tx?.timestamp)}</time>
              </a>{' '}
            </p> : <p className="text-sm font-medium text-gray-500">
              No transactions yet 😮
            </p>
          }
				</div>
			</div>
      <TabMenu tabs={tabs} activeTab={activeTab} selectTab={(tab) => setActiveTab(tab)} />
      { activeTab == "DAOs" && <Daos daos={profile.daos}/>}
      { activeTab == "POAPs" && <POAPs poaps={profile.poaps}/>}
      { activeTab == "NFTs" && <NFTs nfts={profile.nfts}/>}
      { activeTab == "SBTs" && <SBTs sbts={[]}/>}
      { activeTab == "Social" && <Social lens={profile.lens} profile={profile} />}
      { activeTab == "Writings" && <Writings mirror={profile.mirror}/>}
		</div>
	)
}
