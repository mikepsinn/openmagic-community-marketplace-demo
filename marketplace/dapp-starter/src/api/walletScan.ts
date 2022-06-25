import axios from "axios";
import { db } from "../api/firebase/firebase";
import {
  doc, collection,
  getDocs, setDoc,
  query, where, limit,
} from "firebase/firestore";

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
      return cached;
    }
    
    const response = await axios.get(`${walletScanEndpoint}${address}`);
    if (response.data && response.data.address) {
      cacheAPIResponse(response.data.address, response.data);
    }
    return response.data;
  } catch {
    return null;
  }
}