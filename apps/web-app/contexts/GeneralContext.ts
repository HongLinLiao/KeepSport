import UserInfo from '@/interfaces/UserInfo';
import { createContext } from 'react';
interface IGeneralContext {
  userInfo: UserInfo | null;
  setUserInfo: (data: UserInfo) => void;
  isDrawerOpen: boolean;
  setDrawer: (state: boolean) => void;
}

const GeneralContext = createContext<IGeneralContext>({
  userInfo: null,
  setUserInfo: () => null,
  isDrawerOpen: false,
  setDrawer: () => null,
});

export default GeneralContext;
