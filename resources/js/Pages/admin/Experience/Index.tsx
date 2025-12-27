import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Paginated } from "@/types/pagination";
import type { Experience } from "@/types/models";
import Pagination from "@/components/common/Pagination";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/Button";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useConfirm } from "@/hooks/useConfirm";
import { routes } from "@/utils/routes";

export default function AdminExperienceIndex({ items }: { items: Paginated<Experience> }) {
  const confirm = useConfirm();
  const [target, setTarget] = React.useState<Experience | null>(null);
  const [loading, setLoading] = React.useState(false);

  const askDelete = (p: Experience) => {
    setTarget(p);
    confirm.confirm();
  };

  const doDelete = () => {
    if (!target) return;
    setLoading(true);
    router.delete(`${routes.admin.experiences}/${target.id}`, {
      preserveScroll: true,
      onFinish: () => setLoading(false),
      onSuccess: () => confirm.close(),
    });
  };

  return (
    <AdminLayout>
      <SeoHead title="Admin - Experiences" />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Experiences</h1>
        <Link href={`${routes.admin.experiences}/create`} className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
          New
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-zinc-50">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.data.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.title}</td>
                <td className="p-3 text-zinc-600">{p.slug}</td>
                <td className="p-3 flex gap-2">
                  <Link className="text-zinc-900 underline" href={`${routes.admin.experiences}/${p.id}/edit`}>
                    Edit
                  </Link>
                  <Button type="button" variant="danger" onClick={() => askDelete(p)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination links={items.links} />

      <ConfirmDeleteModal
        open={confirm.open}
        title="Delete project?"
        description="This will permanently remove the project."
        onCancel={confirm.cancel}
        onConfirm={doDelete}
        loading={loading}
      />
    </AdminLayout>
  );
}
