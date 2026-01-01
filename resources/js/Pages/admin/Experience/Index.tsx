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

type Props = { items: Paginated<Experience> };

function fmtDate(v?: string | null) {
  if (!v) return "-";
  return v.includes("T") ? v.split("T")[0] : v; // support ISO or YYYY-MM-DD
}

export default function AdminExperienceIndex({ items }: Props) {
  const confirm = useConfirm();
  const [target, setTarget] = React.useState<Experience | null>(null);
  const [loading, setLoading] = React.useState(false);

  const askDelete = (x: Experience) => {
    setTarget(x);
    confirm.confirm();
  };

  const cancelDelete = () => {
    confirm.cancel();
    setTarget(null);
  };

  const doDelete = () => {
    if (!target || loading) return;

    setLoading(true);
    router.delete(`${routes.admin.experiences}/${target.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        confirm.close();
        setTarget(null);
      },
      onFinish: () => setLoading(false),
    });
  };

  return (
    <AdminLayout>
      <SeoHead title="Admin - Experiences" />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Experiences</h1>
        <Link
          href={`${routes.admin.experiences}/create`}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          New
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-zinc-50">
            <tr>
              <th className="p-3">Company</th>
              <th className="p-3">Role</th>
              <th className="p-3">Period</th>
              <th className="p-3">Current</th>
              <th className="p-3">Sort</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.data.map((x) => (
              <tr key={x.id} className="border-b">
                <td className="p-3">{x.company}</td>
                <td className="p-3 text-zinc-700">{x.role}</td>
                <td className="p-3 text-zinc-600">
                  {fmtDate(x.start_date)} – {x.is_current ? "Present" : fmtDate(x.end_date)}
                </td>
                <td className="p-3">{x.is_current ? "Yes" : "No"}</td>
                <td className="p-3">{x.sort_order ?? 0}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link
                      className="text-zinc-900 underline"
                      href={`${routes.admin.experiences}/${x.id}/edit`}
                    >
                      Edit
                    </Link>

                    <Button
                      type="button"
                      variant="danger"
                      disabled={loading}
                      onClick={() => askDelete(x)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {items.data.length === 0 ? (
              <tr>
                <td className="p-6 text-sm text-zinc-600" colSpan={6}>
                  No experiences yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <Pagination links={items.links} />

      <ConfirmDeleteModal
        open={confirm.open}
        title="Delete experience?"
        description="This will permanently remove the experience."
        onCancel={cancelDelete}
        onConfirm={doDelete}
        loading={loading}
      />
    </AdminLayout>
  );
}
