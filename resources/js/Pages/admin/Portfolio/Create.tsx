import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import SeoHead from "@/components/common/SeoHead";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { required, maxLen } from "@/utils/validators";
import { toSlug } from "@/hooks/useSlug";

type FormData = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_path: string;
  project_url: string;
  repository_url: string;
  tech_stack: string;   // UI string
  featured: boolean;
  sort_order: number;
  published_at: string; // ISO string atau "" di form
};



export default function Create() {
  const { form, submitValidated } = useValidatedForm<FormData>(
    {
      title: "",
      slug: "",
      excerpt: "",
      body: "",
      cover_image_path: "",
      project_url: "",
      repository_url: "",
      tech_stack: "",
      featured: false,
      sort_order: 0,
      published_at: "",
    },
    (d) => {
      const errors: Record<string, string> = {};
      const r = required(d.title, "Title is required.");
      if (r) errors.title = r;

      const m = maxLen(d.excerpt, 280, "Excerpt max 280 chars.");
      if (m) errors.excerpt = m;

      return errors as never;
    }
  );

 const onSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  submitValidated(() => {
    const tech = form.data.tech_stack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    form.transform((data) => ({
      ...data,
      slug: data.slug || toSlug(data.title),
      tech_stack: tech,
      sort_order: Number(data.sort_order || 0),
      featured: Boolean(data.featured),
      published_at: data.published_at ? data.published_at : null,
    }));

    form.post("/admin/portfolios", {
      preserveScroll: true,
      onFinish: () => {
        // optional: reset transform agar tidak “nempel” ke submit berikutnya
        form.transform((d) => d);
      },
    });
  });
};

  const togglePublished = (checked: boolean) => {
  form.setData("published_at", checked ? new Date().toISOString() : "");
};


  return (
    <AdminLayout>
      <SeoHead title="Admin - Create Portfolio" />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Create Portfolio</h1>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input label="Title" value={form.data.title} onChange={(e) => form.setData("title", e.target.value)} error={form.errors.title} />
          <Input label="Slug (optional)" value={form.data.slug} onChange={(e) => form.setData("slug", e.target.value)} error={form.errors.slug} />
          <Textarea label="Excerpt" value={form.data.excerpt} onChange={(e) => form.setData("excerpt", e.target.value)} error={form.errors.excerpt} />
          <Textarea label="Body" value={form.data.body} onChange={(e) => form.setData("body", e.target.value)} error={form.errors.body} />

          <Input label="Cover Image Path" value={form.data.cover_image_path} onChange={(e) => form.setData("cover_image_path", e.target.value)} />
          <Input label="Project URL" value={form.data.project_url} onChange={(e) => form.setData("project_url", e.target.value)} />
          <Input label="Repository URL" value={form.data.repository_url} onChange={(e) => form.setData("repository_url", e.target.value)} />
          <Input label="Tech Stack (comma separated)" value={form.data.tech_stack} onChange={(e) => form.setData("tech_stack", e.target.value)} />
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={form.data.featured}
              onChange={(e) => form.setData("featured", e.target.checked)}
            />
            <label htmlFor="featured" className="text-sm text-zinc-800">
              Featured on Home
            </label>
          </div>

          <Input
            label="Sort Order (lower first)"
            type="number"
            value={String(form.data.sort_order)}
            onChange={(e) => form.setData("sort_order", Number(e.target.value || 0))}
          />

          <div className="flex items-center gap-2">
            <input
              id="published"
              type="checkbox"
              checked={Boolean(form.data.published_at)}
              onChange={(e) => togglePublished(e.target.checked)}
            />
            <label htmlFor="published" className="text-sm text-zinc-800">
              Published
            </label>
          </div>


          <Button type="submit" loading={form.processing}>Save</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
