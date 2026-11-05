import { AboutInject } from '@/src/components';
import { getOnRepeat } from '@/src/lib/spotify';

// Spotify's four-week chart moves slowly, so a few hours old is fine.
export const revalidate = 21600;

const Page = async () => {
  const music = await getOnRepeat();

  return (
    <main>
      <AboutInject music={music} />
    </main>
  );
};

export default Page;
