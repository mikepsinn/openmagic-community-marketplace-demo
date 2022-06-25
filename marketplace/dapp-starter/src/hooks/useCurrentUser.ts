import { useContext } from 'react';

import { CurrentUserContext, CurrentUserContextType } from '@/contexts/CurrentUser';

const useCurrentUser = (): CurrentUserContextType => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within an CurrentUserProvider');
  }
  return context;
};

export default useCurrentUser;
