'use client';

import { FormEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { WeddingIcons } from '../icons/WeddingIcons';

type GuestGateProps = {
  onOpen: (guestName: string) => void | Promise<void>;
};

export function GuestGate({ onOpen }: GuestGateProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Cho Châu biết tên đi Châu cho 5 chục hehehe!');
      return;
    }

    void onOpen(trimmedName);
  };

  const handleChange = (value: string) => {
    setName(value);

    if (error) {
      setError('');
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#fff7ed,#ffe4e6,#fff)] px-5">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm rounded-4xl border border-white/70 bg-white/75 p-6 text-center shadow-2xl backdrop-blur-md"
      >
        <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-rose-100 text-5xl text-rose-400 shadow-inner">
          <WeddingIcons.heart />
        </div>

        <p className="mb-2 font-serif text-3xl italic text-rose-500">
          Thiệp mời
        </p>

        <h1 className="mb-6 text-balance text-xl font-semibold text-stone-700">
          Tụi mình trân trọng mời bạn đến chung vui
        </h1>

        <Input
          value={name}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Nhập tên của bạn"
          prefix={<WeddingIcons.user className="text-rose-300" />}
          status={error ? 'error' : undefined}
          className="mb-1"
        />

        {error ? (
          <p className="mb-3 animate-pulse text-xs text-red-500">{error}</p>
        ) : (
          <div className="mb-4" />
        )}

        <Button
          htmlType="submit"
          type="primary"
          block
          icon={<WeddingIcons.heart />}
          className="shadow-lg shadow-rose-200"
        >
          Mở thiệp
        </Button>

        <p className="mt-5 text-xs text-stone-500">
          Nhập tên để thiệp hiển thị lời mời riêng cho bạn nha.
        </p>
      </form>
    </section>
  );
}