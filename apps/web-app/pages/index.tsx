import SummarySwiper from '@/containers/summary/SummarySwiper';
import useGeneral from '@/hooks/useGeneral';

export function Index() {
  const ctx = useGeneral();

  return <SummarySwiper />;
}

export default Index;
