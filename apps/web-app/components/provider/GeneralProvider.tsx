import { FC, ReactNode, useState } from 'react';
import GeneralContext from '@/contexts/GeneralContext';

type Props = {
  children: ReactNode;
};

const GeneralProvider: FC<Props> = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <GeneralContext.Provider
      value={{
        isDrawerOpen,
        setDrawer: (state: boolean) => setDrawerOpen((_) => state),
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
