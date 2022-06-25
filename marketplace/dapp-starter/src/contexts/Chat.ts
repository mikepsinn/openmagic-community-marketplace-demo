import { createContext } from 'react';

export type ChatContextType = {
  address: string;
  setAddress: any;
  showChat: boolean;
  setShowChat: any;
  hide: boolean;
  setHide: any;
};

export const ChatContext = createContext<ChatContextType>({
 address: null,
 setAddress: null,
 showChat: false,
 setShowChat: null,
 hide: false,
 setHide: null
});
