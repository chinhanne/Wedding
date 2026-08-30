'use client';

import { FormEvent, useRef, useState } from 'react';
import { Alert, Button, Input, Spin } from 'antd';
import { MAX_WISH_LENGTH } from '../../constants/validation';
import type { UseWeddingWishesResult } from '../../hooks/useWeddingWish';
import { WeddingIcons } from '../icons/WeddingIcons';

type WishesSectionProps = {
  guestName: string;
  wishController: UseWeddingWishesResult;
};

const QUICK_PRESETS = [
  'Chúc trăm năm hạnh phúc!',
  'Mãi mãi bên nhau nha!',
  'Hạnh phúc viên mãn!',
  'Chúc mừng hai bạn!',
];

export function WishesSection({
  guestName,
  wishController,
}: WishesSectionProps) {
  const [message, setMessage] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    wishes,
    totalWishCount,
    isInitialLoading,
    isLoadingMore,
    isSubmitting,
    errorMessage,
    hasMore,
    submitWish,
    loadMoreWishes,
  } = wishController;

  // Infinite scroll trigger on scroll near bottom
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || !hasMore || isLoadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 60) {
      void loadMoreWishes();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await submitWish(guestName, message);
    if (success) {
      setMessage('');
      setIsComposerOpen(false);
    }
  };

  const handleAddPreset = (preset: string) => {
    if (message.length + preset.length <= MAX_WISH_LENGTH) {
      setMessage((prev) => (prev ? `${prev} ${preset}` : preset));
    }
  };

  const formatWishDate = (value: Date) =>
    value.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    });

  return (
    <section id="wishes" className="w-full min-w-0 max-w-full lg:h-full">
      <div className="section-card flex w-full max-w-full min-w-0 lg:h-full flex-col justify-between p-3.5 sm:p-6 overflow-hidden">

        {/* 1. Header */}
        <div className="text-center mb-3">
          <p className="font-script text-2xl sm:text-3xl text-rose-500">
            Sổ lưu bút
          </p>
          <h2 className="section-title text-2xl sm:text-3xl font-bold tracking-tight">
            Lời Chúc Yêu Thương
          </h2>
        </div>

        {/* 2. Compose Wish Trigger / Form */}
        <div className="mb-3 w-full">
          {!isComposerOpen ? (
            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="group flex w-full items-center gap-2.5 rounded-2xl border border-rose-200/80 bg-rose-50/50 p-2.5 sm:p-3 text-left shadow-xs transition-all hover:border-rose-300 hover:bg-rose-50/80"
            >
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-xs font-bold text-white shadow-xs">
                {guestName ? guestName.trim().charAt(0).toUpperCase() : 'G'}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-stone-800 truncate">
                  Viết lời chúc của bạn...
                </p>
                <p className="truncate text-xs text-stone-500 font-normal">
                  Gửi với tên: <span className="font-bold text-rose-600">{guestName || 'Khách quý'}</span>
                </p>
              </div>
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white text-rose-500 shadow-xs transition group-hover:scale-105">
                <WeddingIcons.send className="h-3.5 w-3.5" />
              </div>
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-rose-200 bg-white p-3 sm:p-3.5 shadow-md w-full"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-stone-600 font-medium truncate">
                  Người gửi:{' '}
                  <strong className="font-bold text-rose-600">
                    {guestName || 'Khách quý'}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="text-stone-400 hover:text-rose-500 text-xs transition shrink-0 ml-2"
                >
                  Đóng
                </button>
              </div>

              <Input.TextArea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={MAX_WISH_LENGTH}
                autoSize={{ minRows: 2, maxRows: 3 }}
                placeholder="Chúc hai bạn trăm năm hạnh phúc, mãi mãi bên nhau..."
                disabled={isSubmitting}
                autoFocus
                className="rounded-xl! border-rose-200! text-base! focus:border-rose-400!"
              />

              {/* Quick Preset Wish Buttons */}
              <div className="mt-2 flex items-center justify-between flex-wrap gap-1">
                <div className="flex items-center gap-1 flex-wrap">
                  {QUICK_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAddPreset(preset)}
                      className="rounded-lg bg-rose-50 border border-rose-200/60 px-2 py-0.5 text-xs font-medium text-stone-700 hover:bg-rose-100 hover:text-rose-700 transition active:scale-95"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-stone-500 tabular-nums font-medium">
                  {message.length}/{MAX_WISH_LENGTH}
                </span>
              </div>

              <Button
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
                disabled={!message.trim()}
                block
                className="
                  mt-3!
                  h-10!
                  rounded-full!
                  bg-gradient-to-r!
                  from-rose-500!
                  to-pink-600!
                  text-sm!
                  font-bold!
                  text-white!
                  shadow-md!
                "
              >
                Gửi Lời Chúc Phúc
              </Button>
            </form>
          )}

          {errorMessage && isComposerOpen && (
            <Alert
              type="error"
              title={errorMessage}
              showIcon
              className="mt-2 rounded-xl!"
            />
          )}
        </div>

        {/* 3. Vertical Infinite Scroll Wishes Feed */}
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
          <div className="flex items-center justify-between border-t border-rose-100/80 pt-2 pb-2 text-xs">
            <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-rose-600 text-xs truncate">
              <WeddingIcons.heart className="text-xs shrink-0" /> Lời chúc ({wishes.length} / {totalWishCount ?? wishes.length})
            </span>
            {hasMore && (
              <span className="text-[10px] sm:text-[11px] text-stone-400 shrink-0 ml-1">Cuộn để xem thêm</span>
            )}
          </div>

          {isInitialLoading ? (
            <div className="flex flex-1 items-center justify-center py-8">
              <Spin size="medium" />
            </div>
          ) : wishes.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-rose-200 bg-rose-50/20 p-5 text-center">
              <WeddingIcons.heart className="text-3xl text-rose-300" />
              <p className="mt-2 text-sm font-semibold text-stone-700">
                Chưa có lời chúc nào
              </p>
              <p className="mt-0.5 text-xs text-stone-500">
                Hãy là người đầu tiên gửi trao lời chúc mừng nhé!
              </p>
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] min-h-[300px] overflow-y-auto space-y-2.5 pr-1 custom-scrollbar w-full"
              aria-label="Danh sách lời chúc công khai"
            >
              {wishes.map((wish) => (
                <article
                  key={wish.id}
                  className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white via-rose-50/20 to-amber-50/10 p-3 sm:p-3.5 shadow-xs transition hover:border-rose-200 w-full overflow-hidden break-words"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 max-w-[85%] min-w-0">
                      <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-xs font-bold text-white shadow-xs">
                        {wish.guestName.trim().charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-stone-800 leading-tight truncate">
                          {wish.guestName}
                        </h3>
                        <time className="text-[10px] text-stone-400 tabular-nums block">
                          {formatWishDate(wish.createdAt)}
                        </time>
                      </div>
                    </div>
                    <WeddingIcons.heart className="text-xs text-rose-400 shrink-0" />
                  </div>

                  <p className="whitespace-pre-line break-words text-base text-stone-700 font-normal leading-relaxed pl-1 sm:pl-9">
                    {wish.message}
                  </p>
                </article>
              ))}

              {/* Infinite Scroll Loading Indicator */}
              <div className="py-2 text-center text-xs text-stone-500">
                {isLoadingMore ? (
                  <span className="inline-flex items-center gap-2 font-semibold text-rose-600">
                    <Spin size="small" /> Đang tải 10 lời chúc tiếp theo ({wishes.length}/{totalWishCount})...
                  </span>
                ) : hasMore ? (
                  <button
                    type="button"
                    onClick={() => void loadMoreWishes()}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
                  >
                    ✦ Cuộn hoặc bấm vào đây để tải thêm 10 lời chúc ({wishes.length}/{totalWishCount}) ✦
                  </button>
                ) : (
                  <span className="text-stone-400 italic">
                    ✦ Đã hiển thị tất cả {wishes.length}/{totalWishCount ?? wishes.length} lời chúc ✦
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
