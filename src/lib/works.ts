import { existsSync } from 'node:fs';
import path from 'node:path';
import { sanityFetch } from '../sanity/lib/live';
import { works as worksQuery } from '../sanity/queries';
import { workTypes } from '../constants';
import { projects } from './projects';

export type WorkType = keyof typeof workTypes;

export type Work = {
  id: string;
  title: string;
  slug: string;
  description: string;
  roles: string[];
  collaborators: string[];
  stack: string[];
  link: string | null;
  year: string;
  /** ISO date or YYYY-MM, for sorting. */
  date: string;
  type: WorkType;
  cover: string | null;
  coverAlt: string;
  coverBlur: string | null;
  /** Phone mockup for mobile apps without a cover: a splash colour and an icon or wordmark. */
  phone: { image?: string; background: string; wordmark?: boolean } | null;
  featured: boolean;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Screenshots in public/works/<slug>.jpg stand in until a cover is uploaded in the Studio.
const fallbackCover = (slug: string) =>
  existsSync(path.join(process.cwd(), 'public', 'works', `${slug}.jpg`))
    ? `/works/${slug}.jpg`
    : null;

// Works kept in Sanity but left off the site because their live sites are gone.
const hiddenWorks = new Set([
  '64288993-a0d3-4e3f-8696-ef63de7e660e', // Strategic Solutions: domain now serves spam
  'a0c8d2ca-eaf0-45d6-9cd9-48b5ffa1473c', // Leadhership Gala: domain no longer resolves
]);

export async function getWorks(): Promise<Work[]> {
  const { data } = await sanityFetch({ query: worksQuery });

  const fromSanity = data.filter((work) => !hiddenWorks.has(work._id)).map((work): Work => {
    const title = work.project_title ?? 'Untitled';
    const slug = slugify(title);
    const date = work.publishedAt ?? '';

    return {
      id: work._id,
      title,
      slug,
      description: work.brief_discussion ?? '',
      roles: (work.roles ?? []).flatMap((r) => (r.role_list ? [r.role_list] : [])),
      collaborators: (work.clients_collaborators ?? []).flatMap((c) =>
        c.title ? [c.title] : []
      ),
      stack: work.stack ?? [],
      link: work.project__link ?? null,
      year: date ? String(new Date(date).getFullYear()) : '',
      date,
      type: work.type ?? 'web',
      cover: work.coverUrl ?? fallbackCover(slug),
      coverAlt: work.cover?.alt ?? `${title} website`,
      coverBlur: work.coverLqip ?? null,
      phone: null,
      featured: Boolean(work.featured),
    };
  });

  const taken = new Set(fromSanity.map((w) => w.slug));
  const local = projects.flatMap((project): Work[] => {
    const slug = slugify(project.title);
    if (taken.has(slug)) return [];
    return [
      {
        ...project,
        id: `local-${slug}`,
        slug,
        collaborators: project.collaborators ?? [],
        year: project.date.slice(0, 4),
        cover: fallbackCover(slug),
        coverAlt: `${project.title} ${project.type === 'mobile' ? 'app' : 'website'}`,
        coverBlur: null,
        phone: project.phone ?? null,
        featured: Boolean(project.featured),
      },
    ];
  });

  // Newest first; the sort is stable, so same-month projects keep their listed order.
  return [...local, ...fromSanity].sort((a, b) => b.date.slice(0, 7).localeCompare(a.date.slice(0, 7)));
}

// Featured works lead; the rest fill up to `limit` in date order.
export const pickFeatured = (works: Work[], limit: number) =>
  [...works.filter((w) => w.featured), ...works.filter((w) => !w.featured)].slice(
    0,
    limit
  );
