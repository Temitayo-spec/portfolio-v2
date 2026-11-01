import ScrubText from '../../shared/ScrubText';
import SplitReveal from '../../shared/SplitReveal';
import Mixed from '../../shared/Mixed';

const services = [
  {
    title: 'Mobile',
    body: 'iOS and Android apps in React Native and Expo, from the first screen to the store listing: EAS builds, over-the-air updates, native Swift extensions, and App Store and Google Play reviews.',
  },
  {
    title: 'Web',
    body: 'Web apps, dashboards and marketing sites in Next.js and React, with motion that feels considered and interfaces that stay fast.',
  },
  {
    title: 'Backend',
    body: 'The APIs, admin tools and payment systems behind them, in Node.js and Bun with MongoDB or PostgreSQL, built for correctness: ledgers, idempotent transfers, webhooks and reconciliation.',
  },
];

const Statement = () => (
  <section className="wrapper py-[14vh] md:py-[18vh]">
    <ScrubText as="h2" className="display text-[clamp(2.5rem,7.2vw,8.25rem)] leading-[0.9]">
      <Mixed text="I build apps & web experiences that feel *a*live — fast, fluid & hard t*o* put d*o*wn" />
    </ScrubText>

    <div className="mt-16 grid grid-cols-12 gap-y-10 border-t border-line pt-6 md:mt-24">
      <p className="meta col-span-12 md:col-span-3">(02) What I do</p>
      {services.map((service, i) => (
        <div key={service.title} className="col-span-12 md:col-span-3">
          <p className="meta mb-4">
            <span className="text-accent">0{i + 1}</span> <span className="ml-2">{service.title}</span>
          </p>
          <SplitReveal delay={i * 0.08} className="text-[15px] leading-relaxed text-muted">
            {service.body}
          </SplitReveal>
        </div>
      ))}
    </div>
  </section>
);

export default Statement;
