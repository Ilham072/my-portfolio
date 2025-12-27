import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import SeoHead from "@/components/common/SeoHead";
import { Card } from "@/components/ui/Card";

export default function Dashboard({ stats }: { stats: { portfolios: number; experiences: number; articles: number } }) {
  return (
    <AdminLayout>
      <SeoHead title="Admin - Dashboard" />
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-sm text-zinc-600">Portfolios</div>
          <div className="mt-1 text-2xl font-semibold">{stats.portfolios}</div>
        </Card>
        <Card>
          <div className="text-sm text-zinc-600">Experiences</div>
          <div className="mt-1 text-2xl font-semibold">{stats.experiences}</div>
        </Card>
        <Card>
          <div className="text-sm text-zinc-600">Articles</div>
          <div className="mt-1 text-2xl font-semibold">{stats.articles}</div>
        </Card>
      </div>
    </AdminLayout>
  );
}
