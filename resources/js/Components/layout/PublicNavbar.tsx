import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { routes } from "@/utils/routes";

const nav = [
  { label: "Home", href: routes.public.home },
  { label: "About", href: routes.public.about },
  { label: "Portfolio", href: routes.public.portfolioIndex },
  { label: "Experience", href: routes.public.experience },
  { label: "Blog", href: routes.public.blogIndex },
  { label: "Contact", href: routes.public.contact },
];

function isActivePath(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(href + "/");
}

export default function PublicNavbar() {
  const { url } = usePage();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [url]);

  return (
    <header className="sticky top-0 z-50 border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto max-w-full px-4 py-4 sm:px-6 lg:px-24">
        <div className="rounded-full border border-border bg-primary shadow-sm">
          <div className="flex items-center justify-between gap-3 px-3 py-2">
            {/* Brand */}
            <Link
              href={routes.public.home}
              className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-fg"
              aria-label="Go to home"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-highlight text-primary-fg ">
                IF
              </span>
              <span className="hidden tracking-tight sm:inline text-bg">Ilham Furqan</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 text-sm md:flex">
              {nav.map((i) => {
                const active = isActivePath(url, i.href);
                return (
                  <Link
                    key={i.href}
                    href={i.href}
                    className={[
                      "relative rounded-full px-3 py-2 transition",
                      active ? "text-highlight text-bold font-extrabold" : "text-bg hover:text-highlight",
                    ].join(" ")}
                  >
                    {i.label}
                    {active ? (
                      <span className="absolute left-1/2 top-[calc(100%-2px)] h-[3px] w-8 -translate-x-1/2 rounded-full bg-highlight" />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link
                href={routes.public.contact}
                className="hidden rounded-full bg-bg px-4 py-2 text-sm font-medium text-highlight-fg shadow-sm ring-1 ring-border transition hover:opacity-90 md:inline-flex"
              >
                Contact Me
              </Link>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-fg transition hover:bg-accent md:hidden"
                aria-label="Toggle navigation"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {open ? (
            <div className="mt-2 border-t border-border bg-bg p-2 md:hidden">
              <nav className="grid gap-1 text-sm">
                {nav.map((i) => {
                  const active = isActivePath(url, i.href);
                  return (
                    <Link
                      key={i.href}
                      href={i.href}
                      className={[
                        "rounded-xl px-3 py-2 transition",
                        active ? "bg-accent text-fg" : "text-muted hover:bg-accent hover:text-fg",
                      ].join(" ")}
                    >
                      {i.label}
                    </Link>
                  );
                })}

                <Link
                  href={routes.public.contact}
                  className="mt-1 rounded-xl bg-highlight px-3 py-2 text-center font-medium text-highlight-fg"
                >
                  Contact Me
                </Link>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
