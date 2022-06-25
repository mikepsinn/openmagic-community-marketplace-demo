import axios from "axios";

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

export const getWalletInfo = async (address): Promise<ProfileType> => {
  try {
    const response = await axios.get(`${walletScanEndpoint}${address}`);
    console.log(response);
    return response.data;
  } catch {
    return null;
  }
}