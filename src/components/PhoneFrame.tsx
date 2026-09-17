import type { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full md:flex md:items-center md:justify-center md:py-6">
      <div className="relative mx-auto h-[100dvh] w-full max-w-[430px] overflow-hidden bg-paper md:h-[900px] md:max-h-[calc(100vh-3rem)] md:rounded-[44px] md:shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:ring-8 md:ring-[#1a1a1a]">
        {children}
      </div>
    </div>
  );
}
