import React from "react";
import { Link } from "@inertiajs/react";
import type { UserProfile } from "@/types/models";
import { routes } from "@/utils/routes";

type Props = {
  owner: UserProfile | null;
};

function splitFirstName(name?: string | null): { first: string; rest: string } {
  const n = (name ?? "").trim();
  if (!n) return { first: "Your", rest: "Name" };
  const parts = n.split(/\s+/);
  return { first: parts[0] ?? n, rest: parts.slice(1).join(" ") };
}

export default function HeroSection({ owner }: Props) {
  const { first, rest } = splitFirstName(owner?.name);
  const headline = owner?.headline ?? "Product Designer / Developer";
  const bio =
    owner?.bio ??
    "I build clean, scalable products and delightful interfaces for real users. Focused on performance, systems thinking, and shipping.";

  const avatarSrc = owner?.avatar_path
  ? `/${owner.avatar_path.replace(/^\/+/, "")}`
  : "/img/hero-section.png";


  const chips = ["UI/UX", "Web Apps", "Design Systems", "Dashboard"];

  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="relative mx-0 grid max-w-full items-center gap-10 py-12 sm:px-10 lg:grid-cols-2 lg:py-0">
        {/* Left */}
        <div className="relative w-[150%]">
          <div className="inline-flex items-center rounded-xl border border-border bg-bg py-2 px-2 text-sm text-fg shadow-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-highlight" />
            Hello There!
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            I’m{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">{first}</span>
              <span className="absolute -bottom-1 left-0 z-0 h-3 w-full rounded-full bg-accent" />
            </span>{" "}
            {rest ? <span className="text-fg">{rest},</span> : null}
            <br />
            <span className="text-fg">{headline}</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {bio}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Primary with play circle */}
            <Link
              href={routes.public.portfolioIndex}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-fg shadow-sm transition hover:opacity-95"
            >
              View My Portfolio
              <span className="grid h-9 w-9 place-items-center rounded-full bg-bg/15 transition group-hover:bg-bg/25">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </Link>

            {/* Secondary */}
            <Link
              href={routes.public.contact}
              className="inline-flex items-center justify-center rounded-full border border-border bg-bg px-6 py-3 text-sm font-medium text-fg shadow-sm transition hover:bg-accent"
            >
              Hire Me
            </Link>
          </div>

          {/* Small tags row */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {chips.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-medium text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          
          {/* Big accent blob */}
          <div className="absolute top-6 h-[340px] w-[340px] rounded-full bg-highlight/90 blur-0 sm:h-[380px] sm:w-[380px] lg:-right-4" />
          {/* Photo card */}
          <div className="relative ml-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-[2.25rem] shadow-sm lg:left-28">
              <img
                src={avatarSrc}
                alt={owner?.name ?? "Profile photo"}
                className="h-[420px] w-80 object-cover sm:h-[480px] z-50"
                loading="lazy"
              />
            </div>

            {/* Round “Hire me” badge */}
            <div className="absolute -right-2 top-10 grid h-20 w-20 place-items-center rounded-full border border-border bg-bg shadow-sm">
              <div className="relative grid h-14 w-14 place-items-center rounded-full bg-highlight text-highlight-fg">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2l2.39 7.26L22 9.27l-6 4.36L18.18 21 12 16.97 5.82 21 8 13.63 2 9.27l7.61-.01z" />
                </svg>
              </div>
            </div>

            {/* Pills */}
            <div className="absolute left-10 bottom-20 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg shadow-sm">
              Product Designer
            </div>

            <div className="absolute -right-4 bottom-28 rounded-full bg-highlight px-4 py-2 text-sm font-medium text-highlight-fg shadow-sm">
              UI/UX Designer
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="border-t border-border bg-highlight text-highlight-fg flex ">
        <div className="relative overflow-hidden">
          <div className="flex w-[200%] animate-[marquee_18s_linear_infinite] items-center gap-10 py-4">
            {[...Array(2)].map((_, block) => (
              <div key={block} className="flex w-1/2 items-center justify-around gap-10">
                {["App Design", "Website Design", "Dashboard", "Wireframe"].map((t) => (
                  <div key={t} className="flex items-center gap-3 text-base font-semibold sm:text-lg">
                    <span>{t}</span>
                    <span className="text-highlight-fg/80">✳</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
