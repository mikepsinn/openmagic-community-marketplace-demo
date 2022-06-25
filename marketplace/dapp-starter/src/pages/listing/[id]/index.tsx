import { GetServerSideProps } from 'next';
import * as React from 'react';
import { useEffect } from 'react';

import { ProfileType } from '@/api/walletScan';
import Listing from "@/components/Listing";

import Loading from '@/components/Loading';

import { listings } from '@/api/listings';
import { getOrderById } from '@/api/web3/contract';

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
  const [listing, setListing] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const getListing = async () => {
      if (itemId) {
        setLoading(true);
        getOrderById(itemId)
          .then(item => {
            if (item) {
              setListing(item)
            } else {
              setFailed(true);
            }
            setLoading(false)
          });
      }
    }
    getListing();
  }, [itemId])

  return (
    <div>
    {loading && <Loading /> }
    {!loading && 
      <div>
        {
          !failed ? <Listing listing={listing} /> : <Failed />
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
