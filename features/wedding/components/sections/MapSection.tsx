'use client';

import { Button } from 'antd';
import { weddingInfo } from '../../constants/wedding';
import { WeddingIcons } from '../icons/WeddingIcons';

export function MapSection() {
  return (
    <section id="map" className="w-full px-5 pb-8 md:px-5 lg:h-full lg:px-0 lg:pb-0">
      <div className="flex h-full flex-col overflow-hidden rounded-4xl border border-rose-100 bg-white/80 shadow-sm">
        <div className="p-5">
          <h2 className="font-serif text-3xl italic text-rose-500">
            Bản đồ
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-stone-500">
            {weddingInfo.venueName}
          </p>

          <Button
            href={weddingInfo.mapDirectionUrl}
            target="_blank"
            type="primary"
            icon={<WeddingIcons.map />}
          >
            Chỉ đường
          </Button>
        </div>
        <div className="flex-1 p-4">
          <iframe
            title="Wedding location"
            src={weddingInfo.mapEmbedUrl}
            className="h-56 w-full rounded-2xl border-0 md:h-72 lg:h-full lg:min-h-[320px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}