'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Alert, Button, Input, Spin } from 'antd';
import { useWeddingWishes } from '../../hooks/useWeddingWish';
import { WeddingIcons } from '../icons/WeddingIcons';

type WishesSectionProps = {
  guestName: string;
};

function formatWishTime(value: Date): string {
  return value.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function WishesSection({ guestName }: WishesSectionProps) {
  const [message, setMessage] = useState('');

  const wishListRef = useRef<HTMLDivElement | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  const {
    wishes,
    isInitialLoading,
    isLoadingMore,
    isSubmitting,
    errorMessage,
    hasMore,
    submitWish,
    loadMoreWishes,
  } = useWeddingWishes();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await submitWish(guestName, message);

    if (success) {
      setMessage('');
    }
  };

  useEffect(() => {
    const scrollRoot = wishListRef.current;
    const trigger = loadMoreTriggerRef.current;

    if (!scrollRoot || !trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (!firstEntry?.isIntersecting) return;
        if (!hasMore || isLoadingMore || isInitialLoading) return;

        void loadMoreWishes();
      },
      {
        root: scrollRoot,
        threshold: 0.8,
      }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isInitialLoading, isLoadingMore, loadMoreWishes]);

  return (
    <section id="wishes" className="w-full px-5 pb-8 md:px-5 lg:h-full lg:px-0 lg:pb-0">
      <div className="hflex h-full flex-col rounded-4xl border border-rose-100 bg-white/85 p-5 shadow-sm backdrop-blur md:p-7 lg:p-8">
        <h2 className="text-center font-serif text-3xl italic text-rose-500">
          Gửi lời chúc
        </h2>

        <p className="mt-2 text-center text-sm leading-relaxed text-stone-500">
          Lời chúc của bạn sẽ được lưu lại để mọi người cùng xem.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
          <Input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={300}
            placeholder="Nhập lời chúc của bạn..."
            disabled={isSubmitting}
            className="h-12!"
          />

          <Button
            htmlType="submit"
            type="primary"
            loading={isSubmitting}
            icon={!isSubmitting ? <WeddingIcons.send /> : undefined}
            className="h-12! w-12! shrink-0"
          />
        </form>

        {errorMessage && (
          <Alert
            type="error"
            message={errorMessage}
            showIcon
            className="mt-4"
          />
        )}

        <div className="mt-5 flex flex-1 flex-col">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-stone-700">
              Lời chúc từ mọi người
            </p>

            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-500">
              {wishes.length} đã tải
            </span>
          </div>

          {isInitialLoading ? (
            <div className="flex justify-center rounded-3xl bg-rose-50/70 py-8">
              <Spin />
            </div>
          ) : wishes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-rose-200 bg-rose-50/70 px-4 py-6 text-center">
              <p className="text-sm text-stone-500">
                Chưa có lời chúc nào. Bạn là người đầu tiên gửi lời chúc nha.
              </p>
            </div>
          ) : (
            <div
              ref={wishListRef}
              className="wish-list max-h-[380px] space-y-3 overflow-y-auto pr-1 md:max-h-[460px] lg:max-h-none lg:flex-1"
            >
              {wishes.map((wish) => (
                <article
                  key={wish.id}
                  className="rounded-3xl border border-rose-100 bg-rose-50/80 px-4 py-3 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-stone-800">
                        {wish.guestName}
                      </p>
                    </div>

                    <time className="shrink-0 text-[11px] text-stone-400">
                      {formatWishTime(wish.createdAt)}
                    </time>
                  </div>

                  <p className="mt-2 whitespace-pre-line wrap-break-word text-sm leading-relaxed text-stone-600">
                    {wish.message}
                  </p>
                </article>
              ))}

              <div ref={loadMoreTriggerRef} className="min-h-8">
                {isLoadingMore && (
                  <div className="flex justify-center py-3">
                    <Spin size="small" />
                  </div>
                )}

                {!hasMore && (
                  <p className="py-3 text-center text-xs text-stone-400">
                    Đã xem hết lời chúc rồi nha.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}