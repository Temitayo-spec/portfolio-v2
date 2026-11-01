'use client';
import { FC, useState } from 'react';
import type { Work, WorkType } from '@/src/lib/works';
import type { Package } from '@/src/lib/packages';
import { workTypes } from '@/src/constants';
import { useViewStore } from '@/src/store/view.store';
import PageShell from '../../shared/PageShell';
import TopBar from '../../shared/TopBar';
import SplitReveal from '../../shared/SplitReveal';
import Mixed from '../../shared/Mixed';
import WorksList from './WorksList';
import Packages from './Packages';

const WorksInject: FC<{ works: Work[]; packages: Package[] }> = ({ works, packages }) => {
  const { view: grid, setView } = useViewStore();
  const [filter, setFilter] = useState<WorkType | 'all'>('all');
  const years = works.map((w) => w.year).filter(Boolean).sort();
  const shown = filter === 'all' ? works : works.filter((w) => w.type === filter);
  const filters = [
    ['all', 'All', works.length],
    ...(Object.keys(workTypes) as WorkType[]).map(
      (type) => [type, workTypes[type], works.filter((w) => w.type === type).length] as const
    ),
  ] as const;

  return (
    <PageShell>
      <TopBar />

      <section className="wrapper pt-[16vh] md:pt-[20vh]">
        <div className="flex items-start gap-3">
          <SplitReveal as="h1" on="intro" by="chars" className="display text-[clamp(5rem,24vw,26rem)] leading-[0.78]">
            <Mixed text="W*o*rks" />
          </SplitReveal>
          <span className="meta mt-[1.5vw] text-accent">({String(works.length).padStart(2, '0')})</span>
        </div>

        <div className="mt-10 grid grid-cols-12 items-end gap-y-6 border-t border-line pt-6 md:mt-14">
          <SplitReveal on="intro" delay={0.3} className="col-span-12 max-w-md text-[15px] leading-relaxed text-muted md:col-span-5">
            {`Mobile apps, web products, backends and sites I've built and shipped with startups, agencies, founders and nonprofits${
              years.length ? `, ${years[0]} – ${years[years.length - 1]}` : ''
            }.`}
          </SplitReveal>

          <div className="meta col-span-12 flex justify-start md:col-span-4 md:col-start-9 md:justify-end">
            <div className="relative flex rounded-full border border-line p-1">
              <span
                aria-hidden
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-accent transition-transform duration-500 ease-out-expo"
                style={{ transform: grid ? 'translateX(100%)' : 'none' }}
              />
              {(['List', 'Grid'] as const).map((label) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={(label === 'Grid') === grid}
                  onClick={() => setView(label === 'Grid')}
                  className="relative w-20 rounded-full py-2"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper mt-12 md:mt-16">
        <div role="group" aria-label="Filter by type" className="meta mb-10 flex flex-wrap gap-2 md:mb-14">
          {filters.map(([value, label, count]) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`rounded-full border px-4 py-2.5 transition-colors duration-300 ${
                filter === value ? 'border-accent bg-accent text-ink' : 'border-line text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {label} <span className="ml-1 opacity-60">{String(count).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
        {/* Keyed so a new filter remounts the list and replays its reveal. */}
        <WorksList key={filter} works={shown} grid={grid} />
      </section>

      {packages.length > 0 && <Packages packages={packages} />}
    </PageShell>
  );
};

export default WorksInject;
