'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export type WeddingImageItem = {
  src: string;
  objectPosition?: string;
};

type PhotoSwiperProps = {
  images: (string | WeddingImageItem)[];
};

export function PhotoSwiper({ images }: PhotoSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="h-[580px] sm:h-[640px] md:h-[720px] lg:h-[750px] rounded-b-4xl bg-gradient-to-br from-rose-100 to-amber-50" />
    );
  }

  const normalizedImages = images.map((img) =>
    typeof img === 'string'
      ? { src: img, objectPosition: 'center 20%' }
      : { src: img.src, objectPosition: img.objectPosition ?? 'center 20%' }
  );

  return (
    <div className="relative h-[600px] sm:h-[660px] md:h-[720px] lg:h-[750px] w-full overflow-hidden bg-stone-900">
      {normalizedImages.map((imageItem, index) => (
        <Image
          key={imageItem.src}
          src={imageItem.src}
          alt="Ảnh cưới cô dâu & chú rể"
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1280px"
          style={{ objectPosition: imageItem.objectPosition }}
          className={`object-cover transition-all duration-1000 ${
            index === activeIndex
              ? 'scale-100 opacity-100'
              : 'scale-105 opacity-0 pointer-events-none'
          }`}
        />
      ))}

      {/* Centered Dots Indicator located below the 2 action buttons */}
      <div className="absolute bottom-2.5 left-1/2 z-30 -translate-x-1/2 flex items-center justify-center gap-1.5">
        {normalizedImages.map((imageItem, index) => (
          <span
            key={imageItem.src}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === activeIndex ? 'w-6 bg-white shadow-md' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}