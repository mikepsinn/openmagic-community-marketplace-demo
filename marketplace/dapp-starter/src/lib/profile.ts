import { ProfileType } from "@/api/walletScan"
import { groupByCollection } from "./nft";
import { EthNYCCommunity } from "./nft";

export const getProfileImage = (profile: ProfileType) => {
  if (profile.lens.length > 0 && profile.lens[0].picture) return profile.lens[0].picture?.original?.url;
  // if (profile.nfts && profile.nfts.ownedNfts.length > 0 && profile.nfts.ownedNfts[0]?.media[0]?.raw) return profile.nfts.ownedNfts[0]?.media[0]?.raw;

  return null;
}

export const getMutualConnections = (profile1, profile2) => {
  const collection1 = groupByCollection(profile1.nfts);
  const collection2 = groupByCollection(profile2.nfts);

  // mutual NFT projects
  const mutualCollections = [];
  collection1.map(community1 => {
    collection2.map(community2 => {
      if (community1.name == community2.name) {
        mutualCollections.push(community1);
      }
    })
  })
  if (profile1.is_participant && profile2.is_participant) {
    mutualCollections.push(EthNYCCommunity)
  }

  const mutualDaos = [];
  profile1.daos.daos.map(dao1 => {
    profile2.daos.daos.map(dao2 => {
      if (dao1.name == dao2.name) {
        mutualDaos.push(dao1);
      }
    })
  })

  return {
    mutualCollections,
    mutualDaos
  }
}