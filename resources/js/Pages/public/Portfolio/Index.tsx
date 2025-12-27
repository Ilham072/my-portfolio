import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Paginated } from "@/types/pagination";
import type { Portfolio } from "@/types/models";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import { routes } from "@/utils/routes";

export default function PortfolioIndex({ items }: { items: Paginated<Portfolio> }) {
  return (
    <PublicLayout>
      <SeoHead title="Portfolio" description="Projects and case studies" />
      <h1 className="text-xl font-semibold">Portfolio</h1>

      {items.data.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No projects yet" />
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.data.map((p) => (
              <a
                key={p.id}
                href={`${routes.public.portfolioIndex}/${p.slug}`}
                className="rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-sm"
              >
                <div className="font-medium">{p.title}</div>
                {p.excerpt ? <div className="mt-2 text-sm text-zinc-600">{p.excerpt}</div> : null}
              </a>
            ))}
          </div>
          <Pagination links={items.links} />
        </>
      )}
    </PublicLayout>
  );
}
