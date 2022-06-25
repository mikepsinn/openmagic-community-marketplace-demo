import { GetServerSideProps } from 'next';
import * as React from 'react';

import { ProfileType } from '@/api/walletScan';
import FullProfile from '@/components/profile/FullProfile';

import Loading from '@/components/Loading';

import {getWalletInfo} from "@/api/walletScan";

const Failed = () => {
  return (
    <section>
      <div className='flex flex-col items-center justify-center min-h-screen text-center layout'>
        <div className='text-xl text-gray-600'>
          Failed to get profile 🥲
        </div>
      </div>
    </section>
  )
}

type UserProps = {
  walletAddress: string;
};


export default function User({ walletAddress }: UserProps) {
  const [profile, setProfile] = React.useState<ProfileType>(null);
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const getProfile = async () => {
    if (walletAddress) {
        const resp = await getWalletInfo(walletAddress);
        if (resp) {
          setProfile(resp);
        } else {
          setFailed(true);
        }
        setLoading(false);
      }
    }
    getProfile();
  }, [walletAddress])

  return (
    <div className='max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
    {loading && <Loading /> }
    {!loading && 
      <div>
        {
          !failed ? <FullProfile profile={profile} /> : <Failed />
        }
      </div>
    }
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const walletAddress = context?.params?.id;
  return {
    props: {
      walletAddress
    }
  }
};
