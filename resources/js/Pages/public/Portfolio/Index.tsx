import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Paginated } from "@/types/pagination";
import type { Portfolio } from "@/types/models";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import { routes } from "@/utils/routes";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/Badge";

function publicPortfolioShow(slug: string) {
  return `${routes.public.portfolioIndex}/${slug}`;
}

export default function PortfolioIndex({
  items,
}: {
  items: Paginated<Portfolio>;
}) {
  return (
    <PublicLayout>
      <SeoHead title="Portfolio" description="Projects and case studies" />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Portfolio
          </h1>
          <p className="mt-1 text-sm text-muted">
            Projects and case studies.
          </p>
        </div>
      </div>

      {items.data.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No projects yet" />
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.data.map((p) => (
              <Link
                key={p.id}
                href={publicPortfolioShow(p.slug)}
                className="group rounded-2xl border border-border bg-bg p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-medium text-fg">
                      {p.title}
                    </div>

                    {p.excerpt ? (
                      <div className="mt-2 line-clamp-3 text-sm text-muted">
                        {p.excerpt}
                      </div>
                    ) : null}
                  </div>

                  <div className="shrink-0 text-muted transition group-hover:text-fg">
                    ↗
                  </div>
                </div>

                {p.tech_stack?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech_stack.slice(0, 5).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Pagination links={items.links} />
          </div>
        </>
      )}
    </PublicLayout>
  );
}
