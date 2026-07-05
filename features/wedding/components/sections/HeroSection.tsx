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

export function HeroSection({
  guestName,
  isMusicPlaying,
  onToggleMusic,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-b-4xl md:rounded-t-4xl">
      <PhotoSwiper images={weddingImages} />

      <div className="absolute inset-0 rounded-b-4xl bg-linear-to-b from-black/5 via-black/10 to-black/40 md:rounded-t-4xl" />

      <div className="absolute inset-0 flex items-center px-5 md:justify-center md:px-8 lg:px-10">
        <div className="w-full rounded-4xl border border-white/25 bg-black/35 p-5 shadow-2xl md:max-w-xl md:p-7 lg:max-w-2xl lg:bg-black/30 lg:p-8">
          <p className="mb-2 text-center text-sm uppercase tracking-[0.3em] text-white/80 drop-shadow md:text-base">
            The Wedding Of
          </p>

          <h2
            className="text-center font-serif text-4xl italic leading-snug md:text-5xl lg:text-6xl"
            style={{
              textShadow:
                '0 2px 12px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.5)',
            }}
          >
            <span className="block text-white">{weddingInfo.groomName}</span>
            <span className="my-1 block text-2xl text-white md:text-3xl">&</span>
            <span className="block text-white">{weddingInfo.brideName}</span>
          </h2>

          <p
            className="mt-3 text-center text-lg font-bold text-[#f0b4bb] md:text-xl"
            style={{
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
            }}
          >
            {weddingInfo.displayDate}
          </p>

          <Countdown
            startDate={weddingInfo.weddingStartDate}
            endDate={weddingInfo.weddingEndDate}
          />

          <p className="mt-3! mb-1! text-center text-base text-white md:mt-5! md:text-lg">
            Thân mời{' '}
            <span className="font-semibold text-[#f0b4bb]">{guestName}</span>{' '}
            đến dự tiệc rượu chung vui cùng gia đình chúng tôi tại:
          </p>

          <p className="mb-1! text-center text-xl font-bold text-white md:text-2xl">
            TƯ GIA
          </p>

          <p className="text-center text-base font-bold leading-relaxed text-white md:text-lg">
            Ấp Bình Linh, Xã Mỹ Hiệp, Tỉnh Đồng Tháp
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 md:mx-auto md:mt-7 md:max-w-md">
            <Button
              href="#timeline"
              icon={<WeddingIcons.calendar />}
              className="
              h-12!
              rounded-full!
              border-white/30!
              bg-linear-to-r!
              from-rose-400/90!
              to-pink-300/90!
              font-semibold!
              text-white!
              shadow-lg!
              shadow-rose-950/20!
              md:h-13!
            "
            >
              Lịch cưới
            </Button>

            <Button
              href="#map"
              icon={<WeddingIcons.map />}
              className="
              h-12!
              rounded-full!
              border-white/30!
              bg-white/20!
              font-semibold!
              text-white!
              shadow-lg!
              shadow-black/20!
              md:h-13!
            "
            >
              Bản đồ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}