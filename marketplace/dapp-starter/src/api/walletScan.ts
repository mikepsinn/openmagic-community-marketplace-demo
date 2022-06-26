import axios from "axios";
import { db } from "../api/firebase/firebase";
import {
  doc, collection,
  getDocs, setDoc,
  query, where, limit,
} from "firebase/firestore";

import { getOpenListingForSeller, getCompletedOrdersForSeller } from '@/api/web3/contract'

const walletScanEndpoint = 'https://us-central1-walletscan-354022.cloudfunctions.net/walletscan_demo?address=';

export type ProfileType = {
  address: null | string;
  ensName: null | string;
  daos: {
    totalDaos: number,
    totalProposals: number,
    totalVotes: number,
    daos: any[]
  } | null;
  nfts: any | null;
  poaps: any[];
  lens: any[];
  mirror: any[];
  listings: any[];
  sold: any[];
  first_tx: { timestamp: any, hash: string };
  is_participant: boolean
};

// simple cache layer to make it run faster. once we do our own indexing it'll be FAST
async function checkCachedData(address: string): Promise<ProfileType|null> {
  // Note: this address could be an ENS name as well. so can't directly index 
  if (!address) return null;
  
  const q = query(
    collection(db, "wallets"),
    where("address", "==", address),
    limit(10), 
  )
  const docSnapshots = await getDocs(q);
  const infoList = docSnapshots.docs.map(doc => (doc.data()));

  if (infoList.length > 0) {
    return infoList[0] as ProfileType
  }
  return null;
}

async function cacheAPIResponse(address: string, profile: ProfileType) {
  setDoc(doc(db, "wallets", address), profile, { merge: false });
}

export const getWalletInfo = async (address): Promise<ProfileType> => {
  try {
    const cached = await checkCachedData(address);
    if (cached) {
      const listings = await getOpenListingForSeller(address);
      cached.listings = listings;
      const sold = await getCompletedOrdersForSeller(address);
      cached.sold = sold;
      return cached;
    }
    
    const response = await axios.get(`${walletScanEndpoint}${address}`);
    const wallet = response.data;
    const listings = await getOpenListingForSeller(address);
    wallet.listings = listings;
    const sold = await getCompletedOrdersForSeller(address);
    wallet.sold = sold;
    
    if (wallet && wallet.address) {
      cacheAPIResponse(wallet.address, wallet);
    }
    return wallet;
  } catch (error){
    return null;
  }
}