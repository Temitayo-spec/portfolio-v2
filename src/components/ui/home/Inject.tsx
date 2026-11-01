import { FC } from 'react';
import type { Work } from '@/src/lib/works';
import PageShell from '../../shared/PageShell';
import HeroSection from './Hero';
import Statement from './Statement';
import WorksCarousel from './WorksCarousel';

const HomeInject: FC<{ featured: Work[]; total: number }> = ({ featured, total }) => {
  return (
    <PageShell>
      <HeroSection projectCount={total} />
      <Statement />
      <WorksCarousel works={featured} total={total} />
    </PageShell>
  );
};

export default HomeInject;
