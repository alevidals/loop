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
        <div className="text-center">
          <p>~ LOOP ~</p>
          <p>
            Done by{" "}
            <a
              className="underline"
              href="https://github.com/alevidals"
              target="_blank"
              rel="noreferrer"
            >
              Alejandro Vidal
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
