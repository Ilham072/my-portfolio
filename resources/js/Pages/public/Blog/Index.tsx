import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Paginated } from "@/types/pagination";
import type { Article } from "@/types/models";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import { routes } from "@/utils/routes";
import { formatDate } from "@/utils/format";

export default function BlogIndex({ items }: { items: Paginated<Article> }) {
  return (
    <PublicLayout>
      <SeoHead title="Blog" description="Writing and articles" />
      <h1 className="text-xl font-semibold">Blog</h1>

      {items.data.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No articles yet" />
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-3">
            {items.data.map((a) => (
              <a
                key={a.id}
                href={`${routes.public.blogIndex}/${a.slug}`}
                className="block rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-sm"
              >
                <div className="font-medium">{a.title}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {formatDate(a.published_at)} {a.reading_time_minutes ? `· ${a.reading_time_minutes} min` : ""}
                </div>
                {a.excerpt ? <div className="mt-2 text-sm text-zinc-600">{a.excerpt}</div> : null}
              </a>
            ))}
          </div>
          <Pagination links={items.links} />
        </>
      )}
    </PublicLayout>
  );
}
