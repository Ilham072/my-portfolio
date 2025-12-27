import React, { PropsWithChildren } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
