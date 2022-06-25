import { useState } from 'react';
import Chat from '@/components/Chat'
import { ChatContext } from '@/contexts/Chat';

export const ChatProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [hide, setHide] = useState(false);
  

  return (
    <ChatContext.Provider
      value={{ address, setAddress, showChat, setShowChat, hide, setHide }}
    >
      {children}
      <Chat address={address} showChat={showChat} setShowChat={setShowChat} hide={hide} setHide={setHide} />
    </ChatContext.Provider>
  );
};

export default ChatProvider;
