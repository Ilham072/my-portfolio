import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Experience } from "@/types/models";
import { formatDate } from "@/utils/format";
import EmptyState from "@/components/common/EmptyState";

export default function ExperiencePage({ items }: { items: Experience[] }) {
  return (
    <PublicLayout>
      <SeoHead title="Experience" description="Work history and resume" />
      <h1 className="text-xl font-semibold">Experience</h1>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No experience yet" />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map((e) => (
            <div key={e.id} className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="font-medium">{e.role}</div>
              <div className="text-sm text-zinc-600">
                {e.company} · {formatDate(e.start_date)} — {e.is_current ? "Present" : formatDate(e.end_date)}
              </div>
              {e.description ? <div className="mt-3 whitespace-pre-wrap text-sm text-zinc-700">{e.description}</div> : null}
            </div>
          ))}
        </div>
      )}
    </PublicLayout>
  );
}
