'use client';

import { Button } from 'antd';
import { weddingImages, weddingInfo } from '../../constants/wedding';
import { Countdown } from '../effection/Countdown';
import { PhotoSwiper } from '../effection/PhotoSwiper';
import { WeddingIcons } from '../icons/WeddingIcons';

type HeroSectionProps = {
  guestName: string;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
};

export function HeroSection({}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-b-[32px] md:rounded-t-[36px]">
      {/* Background Photo Slider */}
      <PhotoSwiper images={weddingImages} />

      {/* Gentle Vignettes at extreme top and bottom ONLY */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
        <div className="h-44 bg-gradient-to-b from-black/75 via-black/30 to-transparent sm:h-52" />
        <div className="h-68 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:h-76" />
      </div>

      {/* Hero Content - Placed at Top and Bottom */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8">
        
        {/* Top Header: Couple Names */}
        <div className="text-center pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-300/70 bg-black/30 px-4 py-0.5 sm:py-1 backdrop-blur-xs shadow-md">
            <span className="text-amber-300 text-xs">✦</span>
            <p className="font-playfair text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber-100 font-semibold">
              The Wedding Celebration
            </p>
            <span className="text-amber-300 text-xs">✦</span>
          </div>

          <h1 className="mt-2 text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <span className="block font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white">
              {weddingInfo.groomName}
            </span>
            <span className="my-0.5 block font-script text-3xl sm:text-4xl md:text-5xl text-rose-200 drop-shadow-md">
              &
            </span>
            <span className="block font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white">
              {weddingInfo.brideName}
            </span>
          </h1>
        </div>

        {/* Bottom Section: Date, Countdown, Quick Navigation Buttons */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto text-center pb-6 sm:pb-7">
          
          {/* Wedding Date Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-black/50 px-5 py-1.5 backdrop-blur-xs shadow-lg">
            <WeddingIcons.calendar style={{ color: '#fde047', fontSize: 16 }} />
            <span className="font-sans text-xs sm:text-sm md:text-base font-bold tracking-wide text-amber-200">
              {weddingInfo.displayDate}
            </span>
          </div>

          {/* Compact Countdown Clock */}
          <Countdown
            startDate={weddingInfo.weddingStartDate}
            endDate={weddingInfo.weddingEndDate}
          />

          {/* Quick Action Navigation Buttons */}
          <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:gap-3">
            <Button
              href="#timeline"
              icon={<WeddingIcons.calendar style={{ color: '#ffffff', fontSize: 14 }} />}
              className="
                h-11! sm:h-12!
                rounded-full!
                border-0!
                bg-gradient-to-r!
                from-rose-500!
                to-pink-600!
                text-xs! sm:text-sm!
                font-bold!
                text-white!
                shadow-lg!
                shadow-rose-950/40!
                hover:scale-[1.03]!
                active:scale-[0.98]!
                transition-all!
              "
            >
              Lịch Cưới
            </Button>

            <Button
              href="#map"
              icon={<WeddingIcons.map style={{ color: '#ffffff', fontSize: 14 }} />}
              className="
                h-11! sm:h-12!
                rounded-full!
                border-2!
                border-white/70!
                bg-black/45!
                text-xs! sm:text-sm!
                font-bold!
                text-white!
                shadow-lg!
                shadow-black/40!
                hover:bg-black/60!
                hover:scale-[1.03]!
                active:scale-[0.98]!
                transition-all!
              "
            >
              Bản Đồ Chỉ Đường
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}