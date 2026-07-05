'use client';

import confetti from 'canvas-confetti';

type UseConfettiResult = {
  fireOpeningConfetti: () => void;
};

export function useConfetti(): UseConfettiResult {
  const fireOpeningConfetti = () => {
    void confetti({
      particleCount: 80,
      spread: 80,
      origin: {
        y: 0.65,
      },
    });

    window.setTimeout(() => {
      void confetti({
        particleCount: 60,
        spread: 100,
        origin: {
          y: 0.45,
        },
      });
    }, 350);
  };

  return {
    fireOpeningConfetti,
  };
}