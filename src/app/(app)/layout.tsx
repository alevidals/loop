import { Header } from "@/app/(app)/[gender]/_components/header";
import type { ReactNode } from "react";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <footer className="mt-2 h-24 flex items-center justify-center font-bold">
        ~ LOOP Copyright {new Date().getFullYear()} &copy; ~
      </footer>
    </div>
  );
}
