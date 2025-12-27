import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Article } from "@/types/models";
import { formatDate } from "@/utils/format";

export default function BlogShow({ item }: { item: Article }) {
  return (
    <PublicLayout>
      <SeoHead title={item.title} description={item.excerpt ?? undefined} />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">{item.title}</h1>
        <div className="mt-2 text-xs text-zinc-500">
          {formatDate(item.published_at)} {item.reading_time_minutes ? `· ${item.reading_time_minutes} min` : ""}
        </div>
        {item.body ? <div className="mt-6 whitespace-pre-wrap text-sm text-zinc-800">{item.body}</div> : null}
      </div>
    </PublicLayout>
  );
}
