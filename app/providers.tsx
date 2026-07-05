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
          colorPrimary: '#fb7185',
          borderRadius: 18,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        components: {
          Button: {
            controlHeight: 44,
            borderRadius: 999,
            fontWeight: 600,
          },
          Input: {
            controlHeight: 46,
            borderRadius: 999,
          },
          Modal: {
            borderRadiusLG: 28,
          },
          Card: {
            borderRadiusLG: 28,
          },
        },
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}