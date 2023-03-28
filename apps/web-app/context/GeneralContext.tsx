import { createContext } from 'react';

interface IGeneralContext {
  isDarkMode: boolean;
  toggleDarkMode: () => unknown;
}

const GeneralContext = createContext<IGeneralContext>({
  isDarkMode: true,
  toggleDarkMode: () => null,
});

export default GeneralContext;
