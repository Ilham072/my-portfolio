import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import type { UserProfile } from "@/types/models";

export default function About({ owner }: { owner: UserProfile | null }) {
  return (
    <PublicLayout>
      <SeoHead title="About" description="About me" />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">About Me</h1>
        <div className="mt-3 text-sm text-zinc-700">
          <div className="font-medium">{owner?.name ?? "Your Name"}</div>
          {owner?.bio ? <p className="mt-2 whitespace-pre-wrap">{owner.bio}</p> : <p className="mt-2">No bio yet.</p>}
        </div>
      </div>
    </PublicLayout>
  );
}
