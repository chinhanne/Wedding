'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type PhotoSwiperProps = {
  images: string[];
};

export function PhotoSwiper({ images }: PhotoSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="h-[620px] rounded-b-4xl bg-linear-to-br from-rose-100 to-orange-100 md:h-[760px] lg:h-[760px]" />
    );
  }

  return (
    <div className="relative h-[720px] w-full overflow-hidden bg-stone-200 md:h-[820px] lg:h-[760px]">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt="Ảnh cưới"
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1280px"
          className={`object-cover object-center transition duration-1000 lg:object-[center_35%] ${index === activeIndex
              ? 'scale-100 opacity-100'
              : 'scale-105 opacity-0'
            }`}
        />
      ))}

      <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/40" />

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((image, index) => (
          <span
            key={image}
            className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
}