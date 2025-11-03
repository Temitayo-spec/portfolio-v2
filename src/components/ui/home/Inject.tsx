import Header from '../../shared/Header';
import HeroSection from './HeroSection';
import BriefAboutSection from './BriefSection';
import WorksSection from './WorksSection';
import { FC } from 'react';
import { WorksResult } from '@/sanity.types';
import ContactSection from './ContactSection';
import Footer from '../../shared/Footer';

const HomeInject: FC<{ projects: WorksResult }> = ({ projects }) => {
  return (
    <main>
      <main>
        <Header />
        <HeroSection />
        <BriefAboutSection />
        <WorksSection projects={projects} />
        <ContactSection />
      </main>
      <Footer />
    </main>
  );
};

export default HomeInject;
