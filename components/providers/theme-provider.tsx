"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        richColors
        position="top-right"
        closeButton
      />
    </ThemeProvider>
  );
}