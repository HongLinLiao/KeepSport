import { FC, ReactNode, useState } from 'react';

import GeneralContext from '@/contexts/GeneralContext';
import UserInfo from '@/interfaces/UserInfo';
import Drawer from '@/containers/layout/Drawer';

type Props = {
  children: ReactNode;
};

const GeneralProvider: FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <GeneralContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isDrawerOpen,
        setDrawer: setDrawerOpen,
      }}
    >
      {children}
      <Drawer />
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
