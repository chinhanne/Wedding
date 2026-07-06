'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useConfetti } from '../hooks/useConfetti';
import { useGuestName } from '../hooks/useGuestName';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { GuestGate } from './effection/GuestGate';
import { PetalLayer } from './effection/PetalLayer';
import { WeddingIcons } from './icons/WeddingIcons';
import { HeroSection } from './sections/HeroSection';
import { MapSection } from './sections/MapSection';
import { MiniGameSection } from './sections/MiniGameSection';
import { TimelineSection } from './sections/TimeLineSection';
import { WishesSection } from './sections/WishesSection';
import { SideFireworks } from './effection/SideFireworks';

export function WeddingPage() {
  const { guestName, isReady, setGuestName } = useGuestName();

  const music = useMusicPlayer('/musics/wedding.mp3');
  const confetti = useConfetti();

  const [isOpened, setIsOpened] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [needsMusicGesture, setNeedsMusicGesture] = useState(false);

  const hasTriedAutoPlayRef = useRef(false);

  const isInvitationOpened = isOpened || Boolean(guestName);

  const startMusic = useCallback(async () => {
    const played = await music.play();

    setNeedsMusicGesture(!played);
  }, [music]);

  const handleOpenInvitation = async (name: string) => {
    setGuestName(name);
    setIsOpened(true);
    setShowPetals(true);

    confetti.fireOpeningConfetti();

    hasTriedAutoPlayRef.current = true;
    await startMusic();

    window.setTimeout(() => {
      setShowPetals(false);
    }, 5000);
  };

  useEffect(() => {
    if (!isReady) return;
    if (!isInvitationOpened) return;
    if (hasTriedAutoPlayRef.current) return;

    hasTriedAutoPlayRef.current = true;

    void startMusic();
  }, [isReady, isInvitationOpened, startMusic]);

  useEffect(() => {
    if (!isInvitationOpened || music.isPlaying || !needsMusicGesture) return;

    const handleFirstGesture = () => {
      void startMusic();
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [isInvitationOpened, music.isPlaying, needsMusicGesture, startMusic]);

  useEffect(() => {
    if (!isInvitationOpened) return;

    const handleVisibleAgain = () => {
      if (document.visibilityState === 'visible') {
        void startMusic();
      }
    };

    document.addEventListener('visibilitychange', handleVisibleAgain);
    window.addEventListener('focus', handleVisibleAgain);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibleAgain);
      window.removeEventListener('focus', handleVisibleAgain);
    };
  }, [isInvitationOpened, startMusic]);

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rose-50">
        <Spin />
      </main>
    );
  }

  if (!isInvitationOpened) {
    return (
      <>
        <PetalLayer active />
        <GuestGate onOpen={handleOpenInvitation} />
      </>
    );
  }

  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#fff7ed,#fff1f2,#ffffff)] text-stone-800 md:bg-[radial-gradient(circle_at_top_left,#ffe4e6,transparent_35%),radial-gradient(circle_at_top_right,#fed7aa,transparent_32%),linear-gradient(180deg,#fff7ed,#fff1f2,#ffffff)] md:px-6 md:py-8 lg:px-10">
      <PetalLayer active={showPetals} />
      <SideFireworks active={isInvitationOpened} intervalMs={3500} />

      {needsMusicGesture && !music.isPlaying && (
        <div className="fixed left-1/2 top-4 z-60 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md">
          Chạm vào thiệp để bật nhạc nền
        </div>
      )}

      <div className="wedding-shell mx-auto min-h-screen max-w-md overflow-hidden rounded-4xl md:max-w-3xl lg:max-w-[1280px]">
        <HeroSection
          guestName={guestName}
          isMusicPlaying={music.isPlaying}
          onToggleMusic={music.toggle}
        />

        <section className="px-5 pt-8 md:px-8 lg:px-10">
          <div className="rounded-4xl border border-rose-100 bg-white/80 p-5 text-center shadow-sm md:mx-auto md:max-w-3xl md:p-7">
            <p className="mb-4! font-serif text-3xl italic text-rose-500 md:text-4xl">
              Trân trọng kính mời
            </p>

            <p className="mt-3 text-sm leading-relaxed text-stone-600 md:text-base">
              Sự hiện diện của bạn là niềm vui và là món quà ý nghĩa nhất đối
              với tụi mình trong ngày đặc biệt này.
            </p>
          </div>
        </section>

        <div className="md:px-3 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-8 lg:px-8 lg:py-8">
          <div className="lg:order-1 lg:flex">
            <TimelineSection />
          </div>

          <div className="lg:order-2 lg:flex">
            <WishesSection guestName={guestName} />
          </div>

          <div className="lg:order-3 lg:flex">
            <MiniGameSection />
          </div>

          <div className="lg:order-4 lg:flex">
            <MapSection />
          </div>
        </div>

        <footer className="px-5 pb-10 text-center md:px-8 lg:pb-12">
          <p className="mx-auto max-w-3xl text-center font-serif text-xl italic text-rose-500 md:text-2xl">
            CẢM ƠN BẠN ĐÃ ĐẾN CHUNG VUI CÙNG TỤI MÌNH <WeddingIcons.heart />
          </p>
        </footer>
      </div>
    </main>
  );
}