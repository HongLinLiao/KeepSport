import { FC, ReactNode, useState } from 'react';

import GeneralContext from '@/contexts/GeneralContext';
import Drawer from '@/containers/layout/Drawer';

type Props = {
  children: ReactNode;
};

const GeneralProvider: FC<Props> = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  return (
    <GeneralContext.Provider
      value={{
        setDrawer: setDrawerOpen,
      }}
    >
      {children}
      <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
