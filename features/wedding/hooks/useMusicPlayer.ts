'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type UseMusicPlayerResult = {
  isPlaying: boolean;
  play: () => Promise<boolean>;
  pause: () => void;
  toggle: () => void;
};

export function useMusicPlayer(src: string): UseMusicPlayerResult {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);

    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = 'auto';

    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(async (): Promise<boolean> => {
    try {
      const audio = audioRef.current;

      if (!audio) return false;

      await audio.play();
      setIsPlaying(true);

      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
      return;
    }

    void play();
  }, [isPlaying, pause, play]);

  return {
    isPlaying,
    play,
    pause,
    toggle,
  };
}