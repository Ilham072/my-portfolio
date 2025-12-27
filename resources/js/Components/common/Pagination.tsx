import React from "react";
import type { PaginationLink } from "@/types/pagination";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }: { links: PaginationLink[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.url ?? ""}
          className={[
            "rounded-xl border px-3 py-2 text-sm",
            l.active ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-900",
            !l.url ? "pointer-events-none opacity-50" : "",
          ].join(" ")}
          preserveScroll
        >
          <span dangerouslySetInnerHTML={{ __html: l.label }} />
        </Link>
      ))}
    </div>
  );
}
