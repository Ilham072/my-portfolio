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

function navLinkClass(active: boolean) {
  return [
    "rounded-xl px-3 py-2 transition-colors",
    active
      ? "bg-accent text-accent-fg"
      : "text-muted hover:bg-accent/60 hover:text-fg",
  ].join(" ");
}

export default function PublicNavbar() {
  const { url } = usePage();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [url]);

  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={routes.public.home} className="text-sm font-semibold tracking-tight text-fg">
          Portfolio
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className={navLinkClass(isActivePath(url, i.href))}>
              {i.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-border px-3 py-2 text-sm text-fg md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-bg md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
            <nav className="grid gap-1 text-sm">
              {nav.map((i) => (
                <Link key={i.href} href={i.href} className={navLinkClass(isActivePath(url, i.href))}>
                  {i.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
