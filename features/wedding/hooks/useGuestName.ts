'use client';

import { useEffect, useState } from 'react';

const GUEST_NAME_KEY = 'wedding_guest_name';

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
    const saved = window.localStorage.getItem(GUEST_NAME_KEY);
    setState({ name: saved ?? '', isReady: true });
  }, []);

  const setGuestName = (name: string) => {
    const trimmedName = name.trim();
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