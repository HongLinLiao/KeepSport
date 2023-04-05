import { createContext } from 'react';
interface IGeneralContext {
  setDrawer: (state: boolean) => void;
}

const GeneralContext = createContext<IGeneralContext>({
  setDrawer: () => null,
});

export default GeneralContext;
