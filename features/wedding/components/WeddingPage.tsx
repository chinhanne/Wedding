'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useConfetti } from '../hooks/useConfetti';
import { useGuestName } from '../hooks/useGuestName';
import { useMusicPlayer } from '../hooks/useMusicPlayer';
import { useWeddingWishes } from '../hooks/useWeddingWish';
import { weddingInfo } from '../constants/wedding';
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
  const weddingWishes = useWeddingWishes(isInvitationOpened);

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

  // Attempt initial auto play once opened
  useEffect(() => {
    if (!isReady || !isInvitationOpened) return;
    if (hasTriedAutoPlayRef.current) return;

    hasTriedAutoPlayRef.current = true;
    void startMusic();
  }, [isReady, isInvitationOpened, startMusic]);

  // If autoplay was prevented by browser policy, listen to any user touch/click to unlock audio
  useEffect(() => {
    if (!isInvitationOpened || music.isPlaying) return;

    const handleFirstGesture = () => {
      void startMusic();
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('click', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
    };
  }, [isInvitationOpened, music.isPlaying, startMusic]);

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf5f0]">
        <Spin size="large" />
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
    <main className="relative min-h-screen bg-gradient-to-b from-[#faf5f0] via-[#fff7f8] to-[#faf5f0] text-stone-800 px-1 py-2 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-10 overflow-x-hidden">
      <PetalLayer active={showPetals} />
      <SideFireworks active={isInvitationOpened} intervalMs={3500} />
      
      {/* Gentle music notification banner if user gesture is needed */}
      {needsMusicGesture && !music.isPlaying && (
        <div className="fixed left-1/2 top-4 z-60 -translate-x-1/2 rounded-full border border-white/60 bg-black/75 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-2xl backdrop-blur-md animate-bounce max-w-[90vw] text-center">
          🎵 Chạm nhẹ vào màn hình để bật nhạc cưới bạn nha!
        </div>
      )}

      <div className="wedding-shell mx-auto min-h-screen w-full max-w-full sm:max-w-md md:max-w-3xl lg:max-w-[1240px] overflow-hidden rounded-[24px] sm:rounded-[36px]">
        
        {/* 1. Hero Section */}
        <HeroSection
          guestName={guestName}
          isMusicPlaying={music.isPlaying}
          onToggleMusic={music.toggle}
        />

        {/* 2. Formal Personalized Invitation Card */}
        <section className="px-2 pt-4 sm:px-6 md:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-rose-100/90 bg-white/95 p-4 text-center shadow-xs backdrop-blur-md sm:p-7 md:p-8">
            
            {/* Romantic Poetic Verse Header */}
            <div className="mb-3 inline-block w-full max-w-xl rounded-2xl bg-rose-50/70 px-3 py-2.5 sm:px-7 sm:py-3.5 border border-rose-100/80 shadow-xs">
              <p className="font-cormorant text-base sm:text-lg italic text-[#be123c] font-semibold leading-relaxed">
                “Trăm năm một chữ đồng lòng,<br className="sm:hidden" /> Nắm tay đi hết bão giông cuộc đời.<br />
                Hôm nay ngày lành hoa nở rộ,<br className="sm:hidden" /> Mời người thương đến sẻ chia nụ cười.”
              </p>
            </div>

            <div className="mx-auto mb-1 flex items-center justify-center gap-2 sm:gap-3">
              <span className="h-[1px] w-8 sm:w-20 bg-gradient-to-r from-transparent to-rose-300" />
              <p className="font-script text-2xl sm:text-4xl text-[#be123c]">
                Trân trọng kính mời
              </p>
              <span className="h-[1px] w-8 sm:w-20 bg-gradient-to-l from-transparent to-rose-300" />
            </div>

            <h2 className="font-playfair text-xl sm:text-3xl font-bold uppercase tracking-wider text-stone-800 my-1 break-words">
              {guestName ? guestName : 'Quý Khách & Người Thương'}
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-stone-700 font-normal">
              Đến dự bữa tiệc thân mật và cùng chúng tôi nâng ly chúc phúc cho ngày khởi đầu tổ ấm tại:
            </p>

            <div className="mx-auto mt-3 max-w-md rounded-2xl border border-rose-200/80 bg-rose-50/60 p-3.5 sm:p-4 shadow-xs">
              <p className="font-playfair text-base sm:text-lg font-bold tracking-wider text-[#be123c]">
                TƯ GIA
              </p>
              <p className="mt-1 text-base text-stone-800 leading-relaxed font-medium break-words">
                {weddingInfo.venueName}
              </p>
            </div>

            <p className="mt-4 text-sm sm:text-base text-stone-600 italic font-medium leading-relaxed max-w-xl mx-auto">
              Sự hiện diện và lời chúc phúc của bạn chính là món quà vô giá nhất, làm trọn vẹn niềm hạnh phúc trong ngày trọng đại của tụi mình! ❤️
            </p>
          </div>
        </section>

        {/* 3. Main Content Sections Grid */}
        <div className="p-2 sm:p-4 md:px-6 lg:p-6 grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
          
          {/* Timeline Section */}
          <div className="flex flex-col min-w-0">
            <TimelineSection />
          </div>

          {/* Wishes Section */}
          <div className="flex flex-col min-w-0">
            <WishesSection
              guestName={guestName}
              wishController={weddingWishes}
            />
          </div>

          {/* Mini Game Section */}
          <div className="flex flex-col min-w-0">
            <MiniGameSection />
          </div>

          {/* Map Section */}
          <div className="flex flex-col min-w-0">
            <MapSection />
          </div>

        </div>

        {/* 4. Heartfelt Footer */}
        <footer className="px-3 py-6 text-center sm:px-6 md:px-8">
          <div className="mx-auto max-w-xl rounded-2xl sm:rounded-3xl border border-rose-100/70 bg-white/90 p-4 sm:p-5 shadow-xs backdrop-blur-sm">
            <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-lg text-rose-500">
              <WeddingIcons.heart />
            </div>

            <p className="font-playfair text-base sm:text-lg font-bold italic tracking-wide text-[#be123c]">
              CẢM ƠN BẠN ĐÃ ĐẾN CHUNG VUI CÙNG TỤI MÌNH
            </p>

            <p className="mt-1 text-sm text-stone-500 font-medium">
              Ngọc Châu & Minh Đức · 19.09.2026
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}
