import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import SeoHead from "@/components/common/SeoHead";
import type { Paginated } from "@/types/pagination";
import type { Article } from "@/types/models";
import Pagination from "@/components/common/Pagination";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/Button";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useConfirm } from "@/hooks/useConfirm";
import { routes } from "@/utils/routes";

type Props = { items: Paginated<Article> };

function fmtDate(v?: string | null) {
  if (!v) return "-";
  return v.includes("T") ? v.split("T")[0] : v;
}

export default function AdminArticleIndex({ items }: Props) {
  const confirm = useConfirm();
  const [target, setTarget] = React.useState<Article | null>(null);
  const [loading, setLoading] = React.useState(false);

  const askDelete = (a: Article) => {
    setTarget(a);
    confirm.confirm();
  };

  const cancelDelete = () => {
    confirm.cancel();
    setTarget(null);
  };

  const doDelete = () => {
    if (!target || loading) return;

    setLoading(true);
    router.delete(`${routes.admin.articles}/${target.id}`, {
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
      <SeoHead title="Admin - Articles" />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Articles</h1>
        <Link
          href={`${routes.admin.articles}/create`}
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          New
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-zinc-50">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Published</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.data.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="p-3">{a.title}</td>
                <td className="p-3 text-zinc-600">{a.slug}</td>
                <td className="p-3">{a.featured ? "Yes" : "No"}</td>
                <td className="p-3">{fmtDate(a.published_at)}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link
                      className="text-zinc-900 underline"
                      href={`${routes.admin.articles}/${a.id}/edit`}
                    >
                      Edit
                    </Link>

                    <Button
                      type="button"
                      variant="danger"
                      disabled={loading}
                      onClick={() => askDelete(a)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {items.data.length === 0 ? (
              <tr>
                <td className="p-6 text-sm text-zinc-600" colSpan={5}>
                  No articles yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <Pagination links={items.links} />

      <ConfirmDeleteModal
        open={confirm.open}
        title="Delete article?"
        description="This will permanently remove the article."
        onCancel={cancelDelete}
        onConfirm={doDelete}
        loading={loading}
      />
    </AdminLayout>
  );
}
