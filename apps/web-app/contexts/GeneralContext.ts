import { createContext } from 'react';
interface IGeneralContext {
  isDrawerOpen: boolean;
  setDrawer: (state: boolean) => void;
}

const GeneralContext = createContext<IGeneralContext>({
  isDrawerOpen: false,
  setDrawer: () => null,
});

export default GeneralContext;
