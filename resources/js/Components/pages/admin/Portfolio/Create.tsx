import React, { useMemo } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import SeoHead from "@/components/common/SeoHead";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { required, maxLen } from "@/utils/validators";
import { toSlug } from "@/hooks/useSlug";

type FormData = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  project_url: string;
  repository_url: string;
  tech_stack: string; // comma-separated (UI), dikonversi saat submit
  featured: boolean;
  sort_order: number;
  published_at: string; // datetime-local string
};

export default function Create() {
  const initial: FormData = useMemo(
    () => ({
      title: "",
      slug: "",
      excerpt: "",
      body: "",
      project_url: "",
      repository_url: "",
      tech_stack: "",
      featured: false,
      sort_order: 0,
      published_at: "",
    }),
    []
  );

  const { form, submitValidated } = useValidatedForm<FormData>(initial, (data) => {
    const errors: Record<string, string> = {};
    const t1 = required(data.title, "Title is required.");
    if (t1) errors.title = t1;

    const t2 = maxLen(data.excerpt, 280, "Excerpt max 280 chars.");
    if (t2) errors.excerpt = t2;

    return errors as never;
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitValidated(() => {
      const tech = form.data.tech_stack
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      form.post("/admin/portfolios", {
        preserveScroll: true,
        onBefore: () => {
          form.clearErrors();
          if (!form.data.slug && form.data.title) {
            form.setData("slug", toSlug(form.data.title));
          }
        },
        data: {
          ...form.data,
          tech_stack: tech as unknown as string, // dikirim sebagai array via transform
        } as never,
        transform: (data) => ({
          ...data,
          tech_stack: tech,
          published_at: data.published_at ? new Date(data.published_at).toISOString() : null,
        }),
      });
    });
  };

  return (
    <AdminLayout>
      <SeoHead title="Admin - Create Project" />

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Create Project</h1>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input
            label="Title"
            value={form.data.title}
            onChange={(e) => form.setData("title", e.target.value)}
            error={form.errors.title}
          />

          <Input
            label="Slug (optional)"
            value={form.data.slug}
            onChange={(e) => form.setData("slug", e.target.value)}
            hint="Leave empty to auto-generate from title."
            error={form.errors.slug}
          />

          <Textarea
            label="Excerpt"
            value={form.data.excerpt}
            onChange={(e) => form.setData("excerpt", e.target.value)}
            error={form.errors.excerpt}
          />

          <Textarea
            label="Body"
            value={form.data.body}
            onChange={(e) => form.setData("body", e.target.value)}
            error={form.errors.body}
          />

          <Input
            label="Tech Stack (comma separated)"
            value={form.data.tech_stack}
            onChange={(e) => form.setData("tech_stack", e.target.value)}
            error={form.errors.tech_stack}
          />

          <div className="flex gap-3">
            <Button type="submit" loading={form.processing}>
              Save
            </Button>
            <Button type="button" variant="secondary" onClick={() => (window.location.href = "/admin/portfolios")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
