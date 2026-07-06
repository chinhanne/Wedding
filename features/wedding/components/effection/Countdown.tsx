'use client';

import { useEffect, useMemo, useState } from 'react';

type CountdownStatus = 'before' | 'during' | 'after';

type CountdownProps = {
  startDate: string;
  endDate: string;
};

type CountdownItem = {
  label: string;
  value: number;
};

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

function getSafeTime(value: string): number | null {
  const time = new Date(value).getTime();

  if (Number.isNaN(time)) {
    return null;
  }

  return time;
}

function getCountdownStatus(
  now: number,
  startTime: number,
  endTime: number
): CountdownStatus {
  if (now < startTime) return 'before';
  if (now <= endTime) return 'during';

  return 'after';
}

export function Countdown({ startDate, endDate }: CountdownProps) {
  const startTime = useMemo(() => getSafeTime(startDate), [startDate]);
  const endTime = useMemo(() => getSafeTime(endDate), [endDate]);

  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const updateNow = () => {
      setNow(Date.now());
    };

    updateNow();

    const intervalId = window.setInterval(updateNow, ONE_SECOND);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  if (now === null || startTime === null || endTime === null) {
    return null;
  }

  const status = getCountdownStatus(now, startTime, endTime);

  if (status === 'during') {
    return (
      <div className="mt-4 rounded-3xl border border-white/40 bg-white/80 px-4 py-4 text-center shadow-sm backdrop-blur">
        <p className="text-sm uppercase tracking-[0.25em] text-rose-500">
          Today
        </p>

        <p className="mt-1 font-serif text-2xl italic text-stone-800">
          Hôm nay là ngày cưới
        </p>

        <p className="mt-1 text-sm text-stone-500">
          Cảm ơn bạn đã đến chung vui cùng tụi mình.
        </p>
      </div>
    );
  }

  if (status === 'after') {
    return (
      <div className="mt-4 rounded-3xl border border-white/40 bg-white/80 px-4 py-4 text-center shadow-sm backdrop-blur">
        <p className="font-serif text-2xl italic text-rose-500">Cảm ơn bạn</p>

        <p className="mt-1 text-sm text-stone-500">
          Ngày vui đã diễn ra, tụi mình cảm ơn bạn rất nhiều.
        </p>
      </div>
    );
  }

  const distance = Math.max(0, startTime - now);

  const items: CountdownItem[] = [
    {
      label: 'Ngày',
      value: Math.floor(distance / ONE_DAY),
    },
    {
      label: 'Giờ',
      value: Math.floor((distance / ONE_HOUR) % 24),
    },
    {
      label: 'Phút',
      value: Math.floor((distance / ONE_MINUTE) % 60),
    },
    {
      label: 'Giây',
      value: Math.floor((distance / ONE_SECOND) % 60),
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-4 gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/50 bg-white/75 py-3 text-center shadow-sm backdrop-blur"
        >
          <p className="mb-0! text-xl font-bold text-rose-500">
            {item.value.toString().padStart(2, '0')}
          </p>

          <p className="text-[11px] uppercase tracking-wide text-stone-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}