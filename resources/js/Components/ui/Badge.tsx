import React from "react";

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700">{children}</span>;
}
