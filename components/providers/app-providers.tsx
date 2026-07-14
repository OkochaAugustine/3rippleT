"use client";

import { LoadingScreen } from "@/components/layout/loading-screen";
import { SupportChat } from "@/components/layout/support-chat";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { ThemeProvider } from "@/providers/ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>
        <LoadingScreen />
        {children}
        <WhatsAppButton />
        <SupportChat />
      </LenisProvider>
    </ThemeProvider>
  );
}
