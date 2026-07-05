'use client';

import { FormEvent, useMemo, useState } from 'react';
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
  });
}

export function WishesSection({ guestName }: WishesSectionProps) {
  const [message, setMessage] = useState('');
  const [marqueeKey, setMarqueeKey] = useState(0);

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

  const shouldAutoScroll = wishes.length > 1;

  const displayWishes = useMemo(() => {
    if (!shouldAutoScroll) return wishes;

    const baseWishes =
      wishes.length % 2 === 1 ? [...wishes, wishes[0]] : wishes;

    return [...baseWishes, ...baseWishes];
  }, [shouldAutoScroll, wishes]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await submitWish(guestName, message);

    if (success) {
      setMessage('');
      setMarqueeKey((prev) => prev + 1);
    }
  };

  const handleLoadMore = async () => {
    if (!hasMore || isLoadingMore) return;

    await loadMoreWishes();

    setMarqueeKey((prev) => prev + 1);
  };

  return (
    <section
      id="wishes"
      className="w-full px-5 pb-8 md:px-5 lg:h-full lg:px-0 lg:pb-0"
    >
      <div className="wish-compact-board relative flex h-full flex-col overflow-hidden rounded-4xl border border-rose-100 p-5 shadow-sm md:p-6 lg:p-8">
        <div className="wish-board-dot wish-board-dot-top" />
        <div className="wish-board-dot wish-board-dot-bottom" />

        <div className="relative z-10">

          <h2 className="section-title mb-6 text-center text-3xl md:text-4xl">
            Gửi lời chúc
          </h2>

          <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-stone-500">
            Hãy để lại lời chúc tốt đẹp nhất cho tụi mình nhé!
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-5 flex max-w-xl items-center gap-3"
          >
            <Input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={300}
              placeholder="Nhập lời chúc..."
              disabled={isSubmitting}
              className="h-11! rounded-full! border-rose-100! bg-white/95! px-4! text-sm! shadow-sm!"
            />

            <Button
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              icon={!isSubmitting ? <WeddingIcons.send /> : undefined}
              className="h-11! w-11! shrink-0 rounded-full! border-0! bg-rose-400! shadow-lg! shadow-rose-200!"
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

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-stone-700">
              Lời chúc yêu thương
            </p>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-rose-500 shadow-sm">
              {wishes.length} đã tải
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-4 flex min-h-0 flex-1 flex-col">
          {isInitialLoading ? (
            <div className="flex w-full justify-center rounded-3xl bg-white/70 py-8">
              <Spin />
            </div>
          ) : wishes.length === 0 ? (
            <div className="w-full rounded-3xl border border-dashed border-rose-200 bg-white/70 px-4 py-6 text-center">
              <p className="text-sm text-stone-500">
                Chưa có lời chúc nào. Bạn là người đầu tiên gửi lời chúc nha.
              </p>
            </div>
          ) : (
            <>
              <div className="wish-marquee-two-row w-full overflow-hidden">
                <div
                  key={marqueeKey}
                  className={
                    shouldAutoScroll
                      ? 'wish-marquee-track-two-row'
                      : 'wish-static-two-row'
                  }
                >
                  {displayWishes.map((wish, index) => (
                    <article
                      key={`${wish.id}-${index}`}
                      className="wish-float-card h-[92px] rounded-3xl border border-rose-100 bg-white/90 px-4 py-3 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-stone-800">
                          {wish.guestName}
                        </p>

                        <time className="shrink-0 text-[10px] text-stone-400">
                          {formatWishTime(wish.createdAt)}
                        </time>
                      </div>

                      <p className="mt-2 max-h-[38px] overflow-hidden whitespace-pre-line break-words text-xs leading-relaxed text-stone-600">
                        {wish.message}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex justify-center">
                {hasMore ? (
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="cursor-pointer text-xs font-semibold text-rose-500 underline-offset-4 hover:text-rose-600 hover:underline disabled:cursor-not-allowed disabled:text-stone-400"
                  >
                    {isLoadingMore ? 'Đang tải thêm...' : 'Xem thêm'}
                  </button>
                ) : (
                  <p className="text-xs text-stone-400">
                    Đã xem hết lời chúc rồi nha.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}