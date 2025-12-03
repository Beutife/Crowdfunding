'use client';

import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/NavBar";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider>
      <Navbar />
      {children}
    </ThirdwebProvider>
  );
}
