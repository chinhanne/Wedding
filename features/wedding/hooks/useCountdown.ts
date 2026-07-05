'use client';

import { useEffect, useMemo, useState } from 'react';

const ONE_SECOND = 1000;

type CountdownResult = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
};

export function useCountdown(targetDate: string): CountdownResult {
  const targetTime = useMemo(() => {
    const parsedTime = new Date(targetDate).getTime();

    if (Number.isNaN(parsedTime)) {
      return 0;
    }

    return parsedTime;
  }, [targetDate]);

  // Pure initialization: set initial value to targetTime.
  // This will result in 0 distance initially, which is a pure stable render value.
  const [now, setNow] = useState(targetTime);

  useEffect(() => {
    // Immediately synchronize the clock once mounted on client side
    setNow(Date.now());

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, ONE_SECOND);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [targetTime]);

  const distance = Math.max(0, targetTime - now);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isExpired: distance <= 0,
  };
}