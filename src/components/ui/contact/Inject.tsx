import { site, socialLinks } from '@/src/constants';
import PageShell from '../../shared/PageShell';
import TopBar from '../../shared/TopBar';
import SplitReveal from '../../shared/SplitReveal';
import Mixed from '../../shared/Mixed';
import LocalTime from '../../shared/LocalTime';
import Form from '../../shared/ContactForm';
import { PageKanji } from '../../shared/looks/Art';

const ContactInject = () => {
  return (
    <PageShell>
      <TopBar />
      <PageKanji>連絡先</PageKanji>

      <section className="wrapper pt-[16vh] md:pt-[20vh]">
        <SplitReveal on="intro" className="meta mb-6 text-muted">
          (Contact)
        </SplitReveal>
        <SplitReveal as="h1" on="intro" by="chars" className="display text-[clamp(4.5rem,19vw,20rem)] leading-[0.78]">
          <Mixed text="Let's t*a*lk" />
        </SplitReveal>
      </section>

      <section className="wrapper mt-14 grid grid-cols-12 gap-y-14 border-t border-line pt-8 md:mt-20">
        <aside className="col-span-12 flex flex-col gap-8 md:col-span-4">
          <SplitReveal on="intro" delay={0.3} className="max-w-sm text-[15px] leading-relaxed text-muted">
            Have a project in mind, a role to fill, or just want to say hi? Send
            a note and I&apos;ll reply as soon as I can.
          </SplitReveal>

          <div className="meta flex flex-col gap-1">
            <span className="text-muted">Email</span>
            <a href={`mailto:${site.email}`} className="wipe-line w-fit break-all text-base normal-case tracking-normal">
              {site.email}
            </a>
          </div>
          <div className="meta flex flex-col gap-1">
            <span className="text-muted">Socials</span>
            {socialLinks.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer noopener" className="wipe-line w-fit">
                {s.title}
              </a>
            ))}
          </div>
          <div className="meta flex flex-col gap-1">
            <span className="text-muted">Based in</span>
            <span>
              {site.location} · <LocalTime />
            </span>
          </div>
          <div className="meta flex flex-col gap-1">
            <span className="text-muted">Resume</span>
            <a href={site.resume} target="_blank" rel="noopener" className="wipe-line w-fit">
              CV (PDF) ↓
            </a>
          </div>
        </aside>

        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <Form />
        </div>
      </section>
    </PageShell>
  );
};

export default ContactInject;
