import React from "react";
import { Link } from "@inertiajs/react";
import type { UserProfile } from "@/types/models";
import { routes } from "@/utils/routes";

type Props = {
  owner: UserProfile | null;
};

export default function Hero({ owner }: Props) {
  const name = owner?.name ?? "Your Name";
  const headline = owner?.headline ?? "Product Designer & Developer";
  const bio =
    owner?.bio ??
    "I build clean, fast, and scalable web products. Focused on UX, performance, and maintainable code.";

  return (
    <section className="py-10 sm:py-14">
      <div className="grid items-start gap-8 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/40 px-3 py-1 text-xs text-accent-fg">
            Available for freelance • Open to full-time
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {name}
          </h1>

          <p className="mt-2 text-base text-muted sm:text-lg">{headline}</p>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-fg/80 sm:text-base">
            {bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={routes.public.portfolioIndex}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-fg hover:opacity-90"
            >
              Explore Projects
            </Link>

            <Link
              href={routes.public.contact}
              className="rounded-xl border border-border bg-bg px-4 py-2 text-sm font-medium text-fg hover:bg-accent/40"
            >
              Contact Me
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted">
            <span className="rounded-full border border-border px-3 py-1">Laravel</span>
            <span className="rounded-full border border-border px-3 py-1">Inertia</span>
            <span className="rounded-full border border-border px-3 py-1">React</span>
            <span className="rounded-full border border-border px-3 py-1">Tailwind</span>
          </div>
        </div>

        {/* Right card */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-bg p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-accent" />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-fg">{name}</div>
                <div className="truncate text-sm text-muted">{owner?.location ?? "Indonesia"}</div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border bg-accent/30 p-3">
                <div className="text-xs text-muted">Projects</div>
                <div className="mt-1 text-sm font-semibold text-fg">20+</div>
              </div>
              <div className="rounded-xl border border-border bg-accent/30 p-3">
                <div className="text-xs text-muted">Years</div>
                <div className="mt-1 text-sm font-semibold text-fg">3+</div>
              </div>
              <div className="rounded-xl border border-border bg-accent/30 p-3">
                <div className="text-xs text-muted">Clients</div>
                <div className="mt-1 text-sm font-semibold text-fg">10+</div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-bg p-4 text-sm text-muted">
              Tip: set angka/stat ini nanti dari database atau config. Untuk sekarang hardcode dulu agar layout jadi.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
