'use client';

import { useEffect, useState } from 'react';
import { MAX_GUEST_NAME_LENGTH } from '../constants/validation';

const GUEST_NAME_KEY = 'wedding_guest_name';

function normalizeGuestName(name: string): string {
  return name.trim().slice(0, MAX_GUEST_NAME_LENGTH);
}

type GuestNameState = {
  name: string;
  isReady: boolean;
};

type UseGuestNameResult = {
  guestName: string;
  isReady: boolean;
  setGuestName: (name: string) => void;
  clearGuestName: () => void;
};

// Always start with isReady: false to match server render.
// localStorage is read in useEffect after hydration.
const INITIAL_STATE: GuestNameState = { name: '', isReady: false };

export function useGuestName(): UseGuestNameResult {
  const [state, setState] = useState<GuestNameState>(INITIAL_STATE);

  // Hydrate from localStorage after mount (client-only)
  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      const saved = window.localStorage.getItem(GUEST_NAME_KEY);
      setState({ name: normalizeGuestName(saved ?? ''), isReady: true });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const setGuestName = (name: string) => {
    const trimmedName = normalizeGuestName(name);
    setState({ name: trimmedName, isReady: true });
    window.localStorage.setItem(GUEST_NAME_KEY, trimmedName);
  };

  const clearGuestName = () => {
    setState({ name: '', isReady: true });
    window.localStorage.removeItem(GUEST_NAME_KEY);
  };

  return {
    guestName: state.name,
    isReady: state.isReady,
    setGuestName,
    clearGuestName,
  };
}
