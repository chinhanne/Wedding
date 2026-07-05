'use client';

import { Button } from 'antd';
import { weddingInfo } from '../../constants/wedding';
import { WeddingIcons } from '../icons/WeddingIcons';

export function MapSection() {
  return (
    <section
      id="map"
      className="w-full px-5 pb-8 md:px-5 lg:h-full lg:px-0 lg:pb-0"
    >
      <div className="section-card decorated-section-card flex h-full flex-col overflow-hidden rounded-4xl">
        <div className="decorated-section-content flex h-full flex-col">
          <div className="p-5 text-center md:p-6 lg:p-8 lg:pb-5">
            <h2 className="section-title text-center text-3xl md:text-4xl">
              Bản đồ
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-500">
              {weddingInfo.venueName}
            </p>

            <Button
              href={weddingInfo.mapDirectionUrl}
              target="_blank"
              type="primary"
              icon={<WeddingIcons.map />}
              className="mt-4 h-11! rounded-full! border-0! bg-rose-400! px-6! font-semibold! shadow-lg! shadow-rose-200!"
            >
              Chỉ đường
            </Button>
          </div>

          <div className="flex-1 p-4 pt-0 md:p-5 md:pt-0 lg:p-6 lg:pt-0">
            <iframe
              title="Wedding location"
              src={weddingInfo.mapEmbedUrl}
              className="h-56 w-full rounded-3xl border-0 shadow-sm md:h-72 lg:h-full lg:min-h-[320px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}