import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Article, Portfolio, UserProfile } from "@/types/models";
import { Badge } from "@/components/ui/Badge";
import { routes } from "@/utils/routes";
import { Link } from "@inertiajs/react";
import Hero from "@/components/public/Hero";
import Services from "@/components/public/Services";
import Container from "@/components/common/Container";

type Props = {
  owner: UserProfile | null;
  featuredProjects: Portfolio[];
  latestArticles: Article[];
};

function publicPortfolioShow(slug: string) {
  return `${routes.public.portfolioIndex}/${slug}`;
}

function publicBlogShow(slug: string) {
  return `${routes.public.blogIndex}/${slug}`;
}

export default function Home({ owner, featuredProjects, latestArticles }: Props) {
  const name = owner?.name ?? "Your Name";
  const headline = owner?.headline ?? "Headline";
  const bio = owner?.bio ?? null;

  return (
    <PublicLayout>
      <SeoHead
        title={owner?.name ? `${owner.name} - Portfolio` : "Portfolio"}
        description={owner?.headline ?? "Professional portfolio website"}
      />

      <Hero owner={owner} />
    
      <Services />

      {/* FEATURED PROJECTS */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Featured Projects
            </h2>
            <p className="mt-1 text-sm text-muted">
              Selected work focused on impact and execution.
            </p>
          </div>

          <Link
            href={routes.public.portfolioIndex}
            className="hidden text-sm font-medium text-accent hover:underline sm:inline"
          >
            View all
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
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
                  {p.tech_stack.slice(0, 4).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}

          {featuredProjects.length === 0 ? (
            <div className="rounded-2xl border border-border bg-bg p-6 text-sm text-muted sm:col-span-2 lg:col-span-3">
              No featured projects yet. Add some from the admin dashboard and mark as featured + published.
            </div>
          ) : null}
        </div>

        <div className="mt-4 sm:hidden">
          <Link
            href={routes.public.portfolioIndex}
            className="text-sm font-medium text-accent hover:underline"
          >
            View all projects
          </Link>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Latest Articles
            </h2>
            <p className="mt-1 text-sm text-muted">
              Writing on engineering, product, and learnings.
            </p>
          </div>

          <Link
            href={routes.public.blogIndex}
            className="hidden text-sm font-medium text-accent hover:underline sm:inline"
          >
            View all
          </Link>
        </div>

        <div className="mt-5 space-y-3">
          {latestArticles.map((a) => (
            <Link
              key={a.id}
              href={publicBlogShow(a.slug)}
              className="group block rounded-2xl border border-border bg-bg p-5 transition hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-medium text-fg">
                    {a.title}
                  </div>
                  {a.excerpt ? (
                    <div className="mt-2 line-clamp-2 text-sm text-muted">
                      {a.excerpt}
                    </div>
                  ) : null}
                </div>

                <div className="shrink-0 text-muted transition group-hover:text-fg">
                  ↗
                </div>
              </div>
            </Link>
          ))}

          {latestArticles.length === 0 ? (
            <div className="rounded-2xl border border-border bg-bg p-6 text-sm text-muted">
              No published articles yet. Create one in admin and set published date.
            </div>
          ) : null}
        </div>

        <div className="mt-4 sm:hidden">
          <Link
            href={routes.public.blogIndex}
            className="text-sm font-medium text-accent hover:underline"
          >
            View all articles
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
