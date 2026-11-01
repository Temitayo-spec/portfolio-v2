import { WorksInject } from '@/src/components';
import { getWorks } from '@/src/lib/works';
import { getPackages } from '@/src/lib/packages';

const Page = async () => {
  const [works, packages] = await Promise.all([getWorks(), getPackages()]);

  return <WorksInject works={works} packages={packages} />;
};

export default Page;
