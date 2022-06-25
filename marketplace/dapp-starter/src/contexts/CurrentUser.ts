import { createContext } from 'react';
import { ProfileType } from '@/api/walletScan';

export type CurrentUserContextType = ProfileType;

export const CurrentUserContext = createContext<CurrentUserContextType>({
 address: null,
 ensName: null,
 daos: null,
 nfts: null,
 poaps: [],
 lens: [],
 mirror: [],
 first_tx: null,
 is_participant: false
});
