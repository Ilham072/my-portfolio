import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Article, Portfolio, UserProfile } from "@/types/models";
import { Badge } from "@/components/ui/Badge";
import { routes } from "@/utils/routes";

type Props = {
  owner: UserProfile | null;
  featuredProjects: Portfolio[];
  latestArticles: Article[];
};

export default function Home({ owner, featuredProjects, latestArticles }: Props) {
  return (
    <PublicLayout>
      <SeoHead
        title={owner?.name ? `${owner.name} - Portfolio` : "Portfolio"}
        description={owner?.headline ?? "Professional portfolio website"}
      />

      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{owner?.name ?? "Your Name"}</h1>
        <p className="text-zinc-600">{owner?.headline ?? "Headline"}</p>
        {owner?.bio ? <p className="max-w-3xl text-zinc-700">{owner.bio}</p> : null}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <a
              key={p.id}
              href={`${routes.public.portfolioIndex}/${p.slug}`}
              className="rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-sm"
            >
              <div className="font-medium">{p.title}</div>
              {p.excerpt ? <div className="mt-2 text-sm text-zinc-600">{p.excerpt}</div> : null}
              {p.tech_stack?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech_stack.slice(0, 4).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              ) : null}
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Latest Articles</h2>
        <div className="mt-4 space-y-3">
          {latestArticles.map((a) => (
            <a
              key={a.id}
              href={`${routes.public.blogIndex}/${a.slug}`}
              className="block rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-sm"
            >
              <div className="font-medium">{a.title}</div>
              {a.excerpt ? <div className="mt-2 text-sm text-zinc-600">{a.excerpt}</div> : null}
            </a>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
