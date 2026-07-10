"use client";

import { LoadingScreen } from "@/components/layout/loading-screen";
import { LenisProvider } from "@/components/providers/lenis-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <LoadingScreen />
      {children}
    </LenisProvider>
  );
}
