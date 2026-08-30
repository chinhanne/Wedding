'use client';

import { FormEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { MAX_GUEST_NAME_LENGTH } from '../../constants/validation';
import { WeddingIcons } from '../icons/WeddingIcons';

type GuestGateProps = {
  onOpen: (guestName: string) => void | Promise<void>;
};

export function GuestGate({ onOpen }: GuestGateProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Bạn nhớ nhập tên để tụi mình đón tiếp chu đáo nha!');
      return;
    }

    if (trimmedName.length > MAX_GUEST_NAME_LENGTH) {
      setError(`Tên tối đa ${MAX_GUEST_NAME_LENGTH} ký tự thôi nha.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await onOpen(trimmedName);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (value: string) => {
    setName(value);
    if (error) {
      setError('');
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-8">
      {/* Decorative soft circles */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-rose-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-pink-100/60 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-50/80 blur-2xl" />

      {/* Corner Hearts */}
      <div className="pointer-events-none absolute left-6 top-6 select-none opacity-30 text-rose-400 text-2xl">
        <WeddingIcons.heart />
      </div>
      <div className="pointer-events-none absolute right-6 bottom-6 select-none opacity-30 text-rose-400 text-2xl">
        <WeddingIcons.heart />
      </div>

      {/* Gate Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <div className="envelope-card relative overflow-hidden bg-white p-2 shadow-xl border border-rose-100 rounded-[32px] sm:rounded-[36px]">
          <div className="envelope-inner-border relative p-6 sm:p-8 text-center rounded-[26px] sm:rounded-[30px]">

            {/* Wax Seal */}
            <div className="mx-auto mb-4 flex justify-center">
              <div className="wax-seal group cursor-pointer h-16 w-16 sm:h-20 sm:w-20">
                <div className="flex flex-col items-center justify-center leading-none">
                  <span className="font-script text-2xl sm:text-3xl tracking-wide text-rose-100">M & N</span>
                  <WeddingIcons.heart className="h-3.5 w-3.5 text-rose-200 mt-0.5" />
                </div>
              </div>
            </div>

            <p className="font-script text-3xl sm:text-4xl text-rose-600 mb-1">
              Save the Date
            </p>

            <h1 className="font-playfair text-xl sm:text-2xl font-bold uppercase tracking-[0.18em] text-stone-800">
              Thiệp Mời Cưới
            </h1>

            <div className="my-3 flex items-center justify-center gap-2">
              <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-rose-300" />
              <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">Minh Đức & Ngọc Châu</span>
              <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-rose-300" />
            </div>

            <p className="mb-6 text-sm text-stone-500 leading-relaxed">
              Trân trọng kính mời quý khách đến chung vui trong ngày trọng đại của tụi mình!
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <div>
                <label
                  htmlFor="guest-name-input"
                  className="mb-1.5 block text-center text-xs uppercase tracking-wider text-rose-500 font-bold"
                >
                  Vui lòng nhập tên quý khách
                </label>

                <Input
                  id="guest-name-input"
                  value={name}
                  onChange={(event) => handleChange(event.target.value)}
                  maxLength={MAX_GUEST_NAME_LENGTH}
                  placeholder="Ví dụ: Anh Nam, Chị Linh..."
                  disabled={isSubmitting}
                  autoFocus
                  size="large"
                  className="
                    h-12!
                    rounded-full!
                    border-rose-200!
                    px-5!
                    text-center!
                    text-base!
                    font-medium!
                    focus:border-rose-400!
                    focus:shadow-md!
                  "
                />

                {error && (
                  <p className="mt-2 text-center text-xs font-semibold text-rose-500">
                    {error}
                  </p>
                )}
              </div>

              <Button
                htmlType="submit"
                type="primary"
                loading={isSubmitting}
                block
                className="
                  h-12!
                  rounded-full!
                  border-0!
                  bg-gradient-to-r!
                  from-rose-500!
                  to-pink-600!
                  text-base!
                  font-bold!
                  tracking-wide!
                  text-white!
                  shadow-lg!
                  shadow-rose-200!
                  hover:scale-[1.02]!
                  active:scale-[0.98]!
                  transition-all!
                "
              >
                Mở Thiệp Mời Cưới
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
