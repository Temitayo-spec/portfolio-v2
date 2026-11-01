import Image from 'next/image';
import type { Work } from '@/src/lib/works';
import { workTypes } from '@/src/constants';

const glow =
  'radial-gradient(70% 85% at 50% 118%, color-mix(in srgb, var(--accent) 60%, transparent), transparent 70%), var(--bg-soft)';

/** A phone rising from the bottom of the card, showing the app's splash screen. */
const Phone = ({ work, phone }: { work: Work; phone: NonNullable<Work['phone']> }) => (
  <div className="@container absolute inset-0 overflow-hidden" style={{ background: glow }}>
    <div className="absolute top-[13%] left-1/2 aspect-[9/19.5] w-[30cqw] -translate-x-1/2 rounded-[4.8cqw] border border-white/15 bg-[#050505] p-[0.9cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.55)]">
      <div
        className="relative flex size-full items-center justify-center overflow-hidden rounded-[4cqw]"
        style={{ background: phone.background }}
      >
        <span aria-hidden className="absolute top-[2.4%] left-1/2 h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        {phone.image ? (
          <Image
            src={phone.image}
            alt={work.coverAlt}
            width={512}
            height={512}
            sizes="12rem"
            className={phone.wordmark ? 'h-auto w-[72%]' : 'h-auto w-[38%] rounded-[22%]'}
          />
        ) : (
          <span className="serif-swap text-[9cqw] leading-none text-ink">{work.title.charAt(0)}</span>
        )}
        <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
      </div>
    </div>
  </div>
);

/**
 * The visual for a work: its cover image, a phone mockup for mobile apps, or
 * a lettered tile. Fills its (relatively positioned) parent.
 */
const WorkCover = ({ work, sizes, priority = false }: { work: Work; sizes: string; priority?: boolean }) => {
  if (work.cover)
    return (
      <Image
        src={work.cover}
        alt={work.coverAlt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder={work.coverBlur ? 'blur' : 'empty'}
        blurDataURL={work.coverBlur ?? undefined}
        className="object-cover object-top"
      />
    );

  if (work.phone) return <Phone work={work} phone={work.phone} />;

  return (
    <div
      className="@container absolute inset-0 flex flex-col items-center justify-center gap-[2cqw] p-6 text-center"
      style={{ background: glow }}
    >
      <span className="serif-swap text-[16cqw] leading-none text-accent">{work.title.charAt(0)}</span>
      <span className="meta text-muted">
        {workTypes[work.type]} · {work.stack.slice(0, 2).join(' / ')}
      </span>
    </div>
  );
};

export default WorkCover;
