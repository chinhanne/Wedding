'use client';

import { Timeline } from 'antd';
import { timelineItems } from '../../constants/wedding';
import { WeddingIcons } from '../icons/WeddingIcons';

export function TimelineSection() {
  return (
    <section id="timeline" className="w-full min-w-0 max-w-full lg:h-full">
      <div className="section-card flex w-full max-w-full min-w-0 lg:h-full flex-col justify-between p-3.5 sm:p-6 overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-3">
          <p className="font-script text-2xl sm:text-3xl text-rose-500">
            Chương trình
          </p>
          <h2 className="section-title text-2xl sm:text-3xl font-bold tracking-tight">
            Lịch Cưới
          </h2>
          <p className="mt-0.5 text-sm text-stone-500 font-normal">
            Hãy cùng chúng tôi lưu lại những khoảnh khắc đáng nhớ
          </p>
        </div>

        {/* Timeline list - Compact & Responsive */}
        <div className="py-1 my-auto w-full max-w-full overflow-hidden pl-5 sm:pl-6">
          <Timeline
            className="wedding-timeline-compact"
            items={timelineItems.map((item) => {
              const Icon = WeddingIcons[item.iconKey];

              return {
                icon: (
                  <span className="flex items-center justify-center text-rose-600 text-lg sm:text-xl bg-white p-0.5 rounded-full">
                    <Icon />
                  </span>
                ),
                content: (
                  <div className="mb-2.5 ml-1 sm:ml-2 rounded-2xl border border-rose-100/90 bg-white/95 p-3 sm:p-3.5 shadow-xs transition hover:border-rose-200 break-words overflow-hidden">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      {item.time}
                    </div>

                    <h3 className="mt-1 font-playfair text-base font-bold text-stone-800 break-words">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 text-base text-stone-600 leading-snug font-normal break-words">
                      {item.description}
                    </p>
                  </div>
                ),
              };
            })}
          />
        </div>

        {/* Footer note */}
        <div className="text-center pt-1 mt-auto">
          <p className="text-xs text-stone-400 italic">
            ✦ Rất mong được đón tiếp quý khách đúng giờ ✦
          </p>
        </div>

      </div>
    </section>
  );
}