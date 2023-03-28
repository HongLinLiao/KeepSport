import { FC, ReactNode, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import GeneralContext from '@/context/GeneralContext';

type Props = {
  children: ReactNode;
};

const AntDesignProvider: FC<Props> = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(true);

  return (
    <GeneralContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode: () => setDarkMode((pre) => !pre),
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </GeneralContext.Provider>
  );
};

export default AntDesignProvider;
