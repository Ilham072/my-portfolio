import React from "react";
import { Link } from "@inertiajs/react";
import { routes } from "@/utils/routes";

const nav = [
  { label: "Home", href: routes.public.home },
  { label: "About", href: routes.public.about },
  { label: "Portfolio", href: routes.public.portfolioIndex },
  { label: "Experience", href: routes.public.experience },
  { label: "Blog", href: routes.public.blogIndex },
  { label: "Contact", href: routes.public.contact },
];

export default function PublicNavbar() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={routes.public.home} className="text-sm font-semibold">
          Portfolio
        </Link>

        <nav className="flex flex-wrap gap-3 text-sm text-zinc-700">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className="rounded-lg px-2 py-1 hover:bg-zinc-100">
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
