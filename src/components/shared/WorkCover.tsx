import Image from 'next/image';
import type { Work } from '@/src/lib/works';
import { workTypes } from '@/src/constants';

type PhoneData = NonNullable<Work['phone']>;

const glow =
  'radial-gradient(70% 85% at 50% 118%, color-mix(in srgb, var(--accent) 60%, transparent), transparent 70%), var(--bg-soft)';

/** One handset: a real screen when there is one, otherwise the app's splash screen. */
const Handset = ({
  work,
  phone,
  screen,
  decorative = false,
  className,
}: {
  work: Work;
  phone: PhoneData;
  screen?: string;
  decorative?: boolean;
  className: string;
}) => (
  <div
    className={`absolute aspect-[9/19.5] -translate-x-1/2 rounded-[4.8cqw] border border-white/15 bg-[#050505] p-[0.9cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.55)] ${className}`}
  >
    <div
      className="relative flex size-full items-center justify-center overflow-hidden rounded-[4cqw]"
      style={{ background: phone.background }}
    >
      {screen ? (
        <Image
          src={screen}
          alt={decorative ? '' : `${work.title} app screen`}
          fill
          sizes="(min-width: 768px) 16vw, 32vw"
          className="object-cover object-top"
        />
      ) : phone.image ? (
        <Image
          src={phone.image}
          alt={work.coverAlt}
          width={512}
          height={512}
          sizes="12rem"
          className={phone.wordmark ? 'h-auto w-[72%]' : 'h-auto w-[38%] rounded-[22%]'}
        />
      ) : (
        <span className="display text-[9cqw] leading-none text-ink">{work.title.charAt(0)}</span>
      )}
      {/* Sized to sit over the island in iPhone captures. */}
      <span aria-hidden className="absolute top-[1.6%] left-1/2 h-[4.1%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
    </div>
  </div>
);

/** Phones rising from the bottom of the card; a second screen tilts in behind the first. */
const Phone = ({ work, phone }: { work: Work; phone: PhoneData }) => {
  const [front, back] = phone.screens ?? [];
  return (
    <div className="@container absolute inset-0 overflow-hidden" style={{ background: glow }}>
      {back && (
        <Handset
          work={work}
          phone={phone}
          screen={back}
          decorative
          className="top-[22%] left-[63%] w-[26cqw] rotate-[6deg] brightness-[0.8]"
        />
      )}
      <Handset
        work={work}
        phone={phone}
        screen={front}
        className={`top-[13%] w-[30cqw] ${back ? 'left-[39%]' : 'left-1/2'}`}
      />
    </div>
  );
};

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
      <span className="display text-[16cqw] leading-none text-accent">{work.title.charAt(0)}</span>
      <span className="meta text-muted">
        {workTypes[work.type]} · {work.stack.slice(0, 2).join(' / ')}
      </span>
    </div>
  );
};

export default WorkCover;
