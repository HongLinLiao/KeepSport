import { FC, ReactNode, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import AntDesignContext from '@/contexts/AntDesignContext';

type Props = {
  children: ReactNode;
};

const AntDesignProvider: FC<Props> = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(true);

  return (
    <AntDesignContext.Provider
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
        <div
          className={`min-h-screen max-h-full ${
            isDarkMode ? 'bg-black' : 'bg-white'
          }`}
        >
          {children}
        </div>
      </ConfigProvider>
    </AntDesignContext.Provider>
  );
};

export default AntDesignProvider;
