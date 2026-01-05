import React, { PropsWithChildren } from "react";
import PublicNavbar from "./PublicNavbar";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <PublicNavbar />

      <main className="mx-auto w-full max-w-full px-4 py-10 sm:px-6 lg:px-24">
        {children}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-full px-4 py-10 text-sm text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Portfolio
        </div>
      </footer>
    </div>
  );
}
