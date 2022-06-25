import { useContext } from 'react';

import { ChatContextType, ChatContext } from '@/contexts/Chat';

const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within an CurrentUserProvider');
  }
  return context;
};

export default useChat;
