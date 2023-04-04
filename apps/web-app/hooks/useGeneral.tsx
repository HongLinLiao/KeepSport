import GeneralContext from '@/context/GeneralContext';
import { useContext } from 'react';

const useGeneral = () => {
  return useContext(GeneralContext);
};

export default useGeneral;
