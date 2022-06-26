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

  const mutualPoaps = [];
  profile1.poaps.map(poap1 => {
    profile2.poaps.map(poap2 => {
      if (poap1.event.name == poap2.event.name) {
        mutualPoaps.push(poap1);
      }
    })
  })

  return {
    mutualCollections,
    mutualDaos,
    mutualPoaps
  }
}

export const isAccessible = (order, userProfile) => {
  if (order.listPublicly) return true;
  const collection1 = groupByCollection(userProfile.nfts);

  for (var i = 0; i < order.communities.length; i++) {
    const community = order.communities[i];
    for (var j = 0; j < collection1.length; j++) {
      const collection = collection1[j];
      if (collection.name == community) return true;
    }
    for (var j = 0; j < userProfile.daos.daos.length; j++) {
      const dao = userProfile.daos.daos[j];
      if (dao.name == community) return true;
    }
    for (var j = 0; j < userProfile.poaps.length; j++) {
      const poap = userProfile.poaps[j];
      if (poap.name == community) return true;
    }
  }
  
  return false;
}