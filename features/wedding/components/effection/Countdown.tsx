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
      <div className="my-2 rounded-xl border border-amber-300/80 bg-black/55 px-4 py-2 text-center shadow-lg backdrop-blur-xs">
        <p className="font-playfair text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold">
          ✦ Happy Wedding Day ✦
        </p>
        <p className="font-cormorant text-lg sm:text-xl font-bold italic text-white">
          Hôm nay là ngày hôn lễ
        </p>
      </div>
    );
  }

  if (status === 'after') {
    return (
      <div className="my-2 rounded-xl border border-rose-300/80 bg-black/55 px-4 py-2 text-center shadow-lg backdrop-blur-xs">
        <p className="font-script text-2xl text-rose-200">Cảm ơn bạn</p>
        <p className="text-xs text-stone-200 font-light">
          Ngày vui đã diễn ra trọn vẹn!
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
    <div className="my-2 grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-[300px] sm:max-w-xs mx-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/40 bg-black/45 px-1 py-1.5 sm:py-2 text-center shadow-lg backdrop-blur-xs transition-all hover:bg-black/60"
        >
          {/* Subtle Golden Top Border */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          
          <p className="mb-0 font-cormorant text-xl sm:text-2xl font-bold leading-tight text-amber-200 tabular-nums drop-shadow">
            {item.value.toString().padStart(2, '0')}
          </p>

          <p className="mt-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}