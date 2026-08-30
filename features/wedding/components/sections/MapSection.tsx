'use client';

import { Button } from 'antd';
import { weddingInfo } from '../../constants/wedding';
import { WeddingIcons } from '../icons/WeddingIcons';

export function MapSection() {
  return (
    <section id="map" className="w-full min-w-0 max-w-full lg:h-full">
      <div className="section-card flex w-full max-w-full min-w-0 lg:h-full flex-col justify-between overflow-hidden p-3.5 sm:p-6">
        
        {/* Header Title & Address Details */}
        <div className="text-center mb-2 w-full">
          <p className="font-script text-2xl sm:text-3xl text-rose-500">
            Địa điểm
          </p>
          <h2 className="section-title text-2xl sm:text-3xl font-bold tracking-tight">
            Bản Đồ Chỉ Đường
          </h2>

          <div className="mx-auto mt-2 max-w-md rounded-2xl border border-rose-200/80 bg-rose-50/60 p-3 shadow-xs w-full overflow-hidden break-words">
            <p className="font-playfair text-base font-bold text-[#be123c]">
              TƯ GIA
            </p>
            <p className="mt-0.5 text-base text-stone-800 leading-snug font-medium break-words">
              {weddingInfo.venueName}
            </p>
          </div>

          <div className="mt-2.5 w-full">
            <Button
              href={weddingInfo.mapDirectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              type="primary"
              icon={<WeddingIcons.map style={{ color: '#ffffff' }} />}
              className="
                h-10! sm:h-11!
                rounded-full!
                border-0!
                bg-gradient-to-r!
                from-rose-500!
                to-pink-600!
                px-5! sm:px-6!
                text-base!
                font-bold!
                shadow-md!
                hover:scale-105!
                transition-all!
                max-w-full!
                truncate!
              "
            >
              Mở Google Maps Chỉ Đường
            </Button>
          </div>
        </div>

        {/* Google Map Embedded Frame */}
        <div className="mt-3 flex-1 overflow-hidden rounded-2xl border border-rose-100/90 shadow-inner min-h-[180px] w-full">
          <iframe
            title="Wedding location map"
            src={weddingInfo.mapEmbedUrl}
            className="h-44 sm:h-56 w-full rounded-2xl border-0 md:h-64 lg:h-full lg:min-h-[220px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}