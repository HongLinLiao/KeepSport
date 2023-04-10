import { FC, ReactElement } from 'react';
import Header from './Header';

interface Props {
  children: ReactElement;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
