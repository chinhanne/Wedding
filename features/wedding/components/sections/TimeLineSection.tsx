'use client';

import { Timeline } from 'antd';
import { timelineItems } from '../../constants/wedding';
import { WeddingIcons } from '../icons/WeddingIcons';

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="w-full px-5 py-8 md:px-5 lg:h-full lg:px-0 lg:py-0"
    >
      <div className="section-card decorated-section-card h-full rounded-4xl p-5 md:p-7 lg:p-8">
        <div className="decorated-section-content">

          <h2 className="section-title mb-7 text-center text-3xl md:text-4xl">
            Lịch cưới
          </h2>

          <Timeline
            items={timelineItems.map((item) => {
              const Icon = WeddingIcons[item.iconKey];

              return {
                icon: (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-lg text-rose-500 shadow-sm">
                    <Icon />
                  </div>
                ),
                content: (
                  <div className="pb-4 pl-2">
                    <p className="text-sm font-semibold text-rose-500">
                      {item.time}
                    </p>

                    <h3 className="font-semibold text-stone-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-stone-500">
                      {item.description}
                    </p>
                  </div>
                ),
              };
            })}
          />
        </div>
      </div>
    </section>
  );
}