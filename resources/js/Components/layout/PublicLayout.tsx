import React, { PropsWithChildren } from "react";
import PublicNavbar from "./PublicNavbar";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <PublicNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-500">
          © {new Date().getFullYear()} Portfolio
        </div>
      </footer>
    </div>
  );
}
