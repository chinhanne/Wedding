'use client';

import { App as AntdApp, ConfigProvider } from 'antd';
import type { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#e11d48',
          colorInfo: '#d4af37',
          colorSuccess: '#059669',
          borderRadius: 16,
          fontFamily:
            'var(--font-sans), Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          colorText: '#3b2f2f',
          colorTextSecondary: '#786565',
        },
        components: {
          Button: {
            controlHeight: 46,
            borderRadius: 999,
            fontWeight: 600,
            primaryShadow: '0 8px 20px -4px rgba(225, 29, 72, 0.35)',
            defaultBorderColor: 'rgba(225, 29, 72, 0.2)',
            defaultColor: '#4a3b32',
          },
          Input: {
            controlHeight: 48,
            borderRadius: 16,
            colorBorder: '#f0dcd9',
            activeBorderColor: '#e11d48',
            hoverBorderColor: '#fda4af',
          },
          Modal: {
            borderRadiusLG: 24,
          },
          Card: {
            borderRadiusLG: 24,
          },
        },
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}