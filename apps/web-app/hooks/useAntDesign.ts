import AntDesignContext from '@/contexts/AntDesignContext';
import { useContext } from 'react';

const useAntDesign = () => {
  return useContext(AntDesignContext);
};

export default useAntDesign;
