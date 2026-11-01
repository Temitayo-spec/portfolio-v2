import { HomeInject } from '@/src/components';
import { getWorks, pickFeatured } from '@/src/lib/works';

export default async function Home() {
  const works = await getWorks();

  return <HomeInject featured={pickFeatured(works, 8)} total={works.length} />;
}
