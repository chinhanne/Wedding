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
    // Create audio instance
    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.volume = 0.7;
    audio.preload = 'auto';

    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(async (): Promise<boolean> => {
    try {
      const audio = audioRef.current;
      if (!audio) return false;

      // In case source needs to be set
      if (!audio.src || !audio.src.includes(src)) {
        audio.src = src;
      }

      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, [src]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying || !audio.paused) {
      pause();
    } else {
      void play();
    }
  }, [isPlaying, pause, play]);

  return {
    isPlaying,
    play,
    pause,
    toggle,
  };
}