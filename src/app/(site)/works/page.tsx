import { WorksInject } from '@/src/components';
import { getWorks } from '@/src/lib/works';

const Page = async () => {
  const works = await getWorks();

  return <WorksInject works={works} />;
};

export default Page;
