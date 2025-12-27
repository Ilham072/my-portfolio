import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { routes } from "@/utils/routes";

type NavItem = { label: string; href: string };

const items: NavItem[] = [
  { label: "Dashboard", href: routes.admin.dashboard },
  { label: "Profile", href: routes.admin.profileEdit },
  { label: "Portfolios", href: routes.admin.portfolios },
  { label: "Experiences", href: routes.admin.experiences },
  { label: "Articles", href: routes.admin.articles },
];

export default function AdminSidebar() {
  const page = usePage();
  const url = page.url;

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white p-4">
      <div className="text-sm font-semibold">Admin</div>

      <nav className="mt-4 space-y-1">
        {items.map((i) => {
          const active = url.startsWith(i.href);
          return (
            <Link
              key={i.href}
              href={i.href}
              className={[
                "block rounded-xl px-3 py-2 text-sm",
                active ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100",
              ].join(" ")}
            >
              {i.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
