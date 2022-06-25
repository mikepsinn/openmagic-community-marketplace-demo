import { GetServerSideProps } from 'next';
import * as React from 'react';

import { ProfileType } from '@/api/walletScan';
import Listing from "@/components/Listing";

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

type ItemProps = {
  itemId: string;
};


export default function Item({ itemId }: ItemProps) {
  const [profile, setProfile] = React.useState<ProfileType>(null);
  const [loading, setLoading] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  // React.useEffect(() => {
  //   const getProfile = async () => {
  //   if (itemId) {
  //       const resp = await getWalletInfo(itemId);
  //       if (resp) {
  //         setProfile(resp);
  //       } else {
  //         setFailed(true);
  //       }
  //       setLoading(false);
  //     }
  //   }
  //   getProfile();
  // }, [itemId])

  return (
    <div>
    {loading && <Loading /> }
    {!loading && 
      <div>
        {
          !failed ? <Listing /> : <Failed />
        }
      </div>
    }
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemId = context?.params?.id;
  return {
    props: {
      itemId
    }
  }
};
