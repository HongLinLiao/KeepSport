import { createContext } from 'react';

interface IAntDesignContext {
  isDarkMode: boolean;
  toggleDarkMode: () => unknown;
}

const AntDesignContext = createContext<IAntDesignContext>({
  isDarkMode: true,
  toggleDarkMode: () => null,
});

export default AntDesignContext;
