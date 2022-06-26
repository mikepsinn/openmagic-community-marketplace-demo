import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getWalletInfo } from '@/api/walletScan';

import { CurrentUserContext, CurrentUserContextType } from '@/contexts/CurrentUser';

export const FiltersProvider = ({ children }) => {
  const [walletInfo, setWalletInfo] = useState<CurrentUserContextType>(null);

  const { data } = useAccount();

  useEffect(() => {
    const getProfile = async () => {
      if (data?.address) {
        const resp = await getWalletInfo(data?.address);

        if (resp) {
          setWalletInfo(resp);
        }
        }
      }
      getProfile();
  }, [data?.address]);

  return (
    <CurrentUserContext.Provider
      value={walletInfo}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default FiltersProvider;
