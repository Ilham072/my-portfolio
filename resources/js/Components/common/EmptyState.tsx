import React from "react";

export default function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
      <div className="text-base font-semibold">{title}</div>
      {description ? <div className="mt-2 text-sm text-zinc-600">{description}</div> : null}
    </div>
  );
}
