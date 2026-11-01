'use client';
import { useEffect, useState } from 'react';
import { site } from '@/src/constants';

const format = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timeZone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

/** Live clock in Lagos time. Renders a placeholder until mounted to avoid a hydration mismatch. */
const LocalTime = ({ className = '' }: { className?: string }) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? '--:--'} {site.timeZoneLabel}
    </span>
  );
};

export default LocalTime;
