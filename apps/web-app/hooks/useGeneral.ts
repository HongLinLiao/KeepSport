import { useContext } from 'react';

import GeneralContext from '@/contexts/GeneralContext';

const useGeneral = () => {
  return useContext(GeneralContext);
};

export default useGeneral;
