import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Portfolio } from "@/types/models";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@inertiajs/react";
import { routes } from "@/utils/routes";

type Props = { item: Portfolio };

function toDateLabel(v: string | null | undefined): string | null {
  if (!v) return null;
  return v.split("T")[0] ?? null;
}

export default function PortfolioShow({ item }: Props) {
  const published = toDateLabel((item as any).published_at); // kalau type Portfolio Anda belum punya published_at, silakan tambahkan di types/models.ts
  const tech = item.tech_stack ?? [];

  return (
    <PublicLayout>
      <SeoHead title={item.title} description={item.excerpt ?? undefined} />

      <div className="mb-6">
        <Link
          href={routes.public.portfolioIndex}
          className="text-sm font-medium text-accent hover:underline"
        >
          ← Back to Portfolio
        </Link>
      </div>

      <article className="rounded-2xl border border-border bg-bg p-6 sm:p-8">
        <header className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {item.title}
          </h1>

          {item.excerpt ? (
            <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              {item.excerpt}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 pt-1 text-sm">
            {published ? (
              <span className="text-muted">Published: {published}</span>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {item.project_url ? (
                <a
                  href={item.project_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-fg hover:opacity-90"
                >
                  Live Project
                </a>
              ) : null}

              {item.repository_url ? (
                <a
                  href={item.repository_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-bg px-3 py-2 text-sm font-medium text-fg hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  Repository
                </a>
              ) : null}
            </div>
          </div>

          {tech.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          ) : null}
        </header>

        {item.body ? (
          <section className="mt-8">
            <div className="prose prose-zinc max-w-none dark:prose-invert">
              {/* jika body Anda plain text, ini tetap tampil baik.
                  kalau body markdown/HTML, nanti kita perlu renderer terpisah. */}
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg/90 sm:text-base">
                {item.body}
              </p>
            </div>
          </section>
        ) : null}
      </article>
    </PublicLayout>
  );
}
