import { ProfileType } from "@/api/walletScan"

export const getProfileImage = (profile: ProfileType) => {
  if (profile.lens.length > 0 && profile.lens[0].picture) return profile.lens[0].picture?.original?.url;
  // if (profile.nfts && profile.nfts.ownedNfts.length > 0 && profile.nfts.ownedNfts[0]?.media[0]?.raw) return profile.nfts.ownedNfts[0]?.media[0]?.raw;

  return null;
}