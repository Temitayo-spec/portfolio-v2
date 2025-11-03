import { HomeInject } from '@/src/components';
import { sanityFetch } from '@/src/sanity/lib/live';
import { works } from '@/src/sanity/queries';

export default async function Home() {
  const { data: projects } = await sanityFetch({
    query: works,
  });

  return (
    <>
      <HomeInject projects={projects.slice(0, 5)} />
    </>
  );
}
