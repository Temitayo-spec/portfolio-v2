'use client';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import type { Package } from '@/src/lib/packages';
import { npmProfile } from '@/src/lib/packages';
import { easeOutExpo } from '@/src/constants';
import SplitReveal from '../../shared/SplitReveal';
import Mixed from '../../shared/Mixed';
import Roll from '../../shared/Roll';

const pad = (n: number) => String(n).padStart(2, '0');

const copy = async (name: string) => {
  try {
    await navigator.clipboard.writeText(`npm i ${name}`);
    toast.success(`Copied npm i ${name}`);
  } catch {
    toast.error("Couldn't copy that.");
  }
};

/** npm packages, one row each: name, what it does, version and monthly downloads. */
const Packages = ({ packages }: { packages: Package[] }) => (
  <section className="wrapper mt-[14vh] md:mt-[18vh]">
    <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
      <div>
        <p className="meta mb-4 text-muted">(Open source)</p>
        <SplitReveal as="h2" by="chars" className="display text-[clamp(3rem,9vw,8rem)] leading-[0.85]">
          <Mixed text="Packages" />
        </SplitReveal>
      </div>
      <a href={npmProfile} target="_blank" rel="noreferrer noopener" className="group meta shrink-0 text-muted hover:text-ink">
        <Roll>npm profile ↗</Roll>
      </a>
    </div>

    <ul>
      {packages.map((pkg, i) => (
        <motion.li
          key={pkg.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: (i % 4) * 0.05 }}
          className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-line py-6"
        >
          <span className="meta col-span-2 text-muted md:col-span-1">{pad(i + 1)}</span>
          <div className="col-span-10 md:col-span-4">
            <a
              href={pkg.url}
              target="_blank"
              rel="noreferrer noopener"
              className="wipe-line font-mono text-[clamp(1rem,1.5vw,1.375rem)] tracking-tight break-all"
            >
              {pkg.name}
            </a>
            {pkg.org && <p className="meta mt-1 text-muted">With {pkg.org}</p>}
          </div>
          <p className="col-span-10 col-start-3 text-[15px] leading-relaxed text-muted md:col-span-4 md:col-start-auto">
            {pkg.description}
          </p>
          <div className="meta col-span-10 col-start-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-3 md:col-start-auto md:justify-end">
            {pkg.version && <span className="normal-case">v{pkg.version}</span>}
            {pkg.downloads !== null && (
              <span className="text-muted">{pkg.downloads.toLocaleString('en')}/mo</span>
            )}
            <button
              type="button"
              onClick={() => copy(pkg.name)}
              aria-label={`Copy npm i ${pkg.name}`}
              className="rounded-full border border-line px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
            >
              npm i
            </button>
          </div>
        </motion.li>
      ))}
    </ul>
  </section>
);

export default Packages;
