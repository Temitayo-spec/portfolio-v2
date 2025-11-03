import { WorksInject } from '@/src/components';
import { sanityFetch } from '@/src/sanity/lib/live';
import { works } from '@/src/sanity/queries';

const Page = async () => {
  const { data: projects } = await sanityFetch({
    query: works,
  });
  return (
    <main>
      <WorksInject projects={projects} />
    </main>
  );
};

export default Page;
