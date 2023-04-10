import { FC, ReactNode, useState } from 'react';

import GeneralContext from '@/contexts/GeneralContext';
import Drawer from '@/containers/layout/Drawer';

type Props = {
  children: ReactNode;
};

const GeneralProvider: FC<Props> = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <GeneralContext.Provider
      value={{
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
