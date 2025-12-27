import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Portfolio } from "@/types/models";

export default function PortfolioShow({ item }: { item: Portfolio }) {
  return (
    <PublicLayout>
      <SeoHead title={item.title} description={item.excerpt ?? undefined} />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">{item.title}</h1>
        {item.excerpt ? <p className="mt-2 text-sm text-zinc-600">{item.excerpt}</p> : null}
        {item.body ? <div className="mt-6 whitespace-pre-wrap text-sm text-zinc-800">{item.body}</div> : null}
      </div>
    </PublicLayout>
  );
}
