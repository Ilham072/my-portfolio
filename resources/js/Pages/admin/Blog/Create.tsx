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
  reading_time_minutes: string; // input UI (string) -> number|null saat submit

  featured: boolean;
  published_at: string; // ISO string atau "" (nanti jadi null)
};

export default function Create() {
  const { form, submitValidated } = useValidatedForm<FormData>(
    {
      title: "",
      slug: "",
      excerpt: "",
      body: "",

      cover_image_path: "",
      reading_time_minutes: "",

      featured: false,
      published_at: "",
    },
    (d) => {
      const errors: Record<string, string> = {};

      const t = required(d.title, "Title is required.");
      if (t) errors.title = t;

      const e = maxLen(d.excerpt, 280, "Excerpt max 280 chars.");
      if (e) errors.excerpt = e;

      const b = required(d.body, "Body is required.");
      if (b) errors.body = b;

      // reading_time_minutes optional, tapi kalau diisi harus angka >= 1
      if (d.reading_time_minutes.trim()) {
        const n = Number(d.reading_time_minutes);
        if (!Number.isFinite(n) || n < 1) {
          errors.reading_time_minutes = "Reading time must be a number >= 1.";
        }
      }

      return errors as never;
    }
  );

  const togglePublished = (checked: boolean) => {
    // published_at disimpan sebagai ISO agar backend bisa parse "date"
    form.setData("published_at", checked ? new Date().toISOString() : "");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitValidated(() => {
      // set slug jika kosong (sebelum transform submit)
      if (!form.data.slug && form.data.title) {
        form.setData("slug", toSlug(form.data.title));
      }

      form.transform((data) => ({
        title: data.title.trim(),
        slug: data.slug.trim() || null,
        excerpt: data.excerpt.trim() || null,
        body: data.body,

        cover_image_path: data.cover_image_path.trim() || null,
        reading_time_minutes: data.reading_time_minutes.trim()
          ? Number(data.reading_time_minutes)
          : null,

        featured: Boolean(data.featured),
        published_at: data.published_at ? data.published_at : null,
      }));

      form.post("/admin/articles", {
        preserveScroll: true,
        onFinish: () => form.transform((d) => d),
      });
    });
  };

  return (
    <AdminLayout>
      <SeoHead title="Admin - Create Article" />

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Create Article</h1>

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
            error={form.errors.slug}
            hint="If empty, it will be generated from the title."
          />

          <Textarea
            label="Excerpt (optional)"
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
            label="Cover Image Path (optional)"
            value={form.data.cover_image_path}
            onChange={(e) => form.setData("cover_image_path", e.target.value)}
            error={form.errors.cover_image_path}
          />

          <Input
            label="Reading Time Minutes (optional)"
            type="number"
            value={form.data.reading_time_minutes}
            onChange={(e) => form.setData("reading_time_minutes", e.target.value)}
            error={form.errors.reading_time_minutes}
            hint="Example: 5"
          />

          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={form.data.featured}
              onChange={(e) => form.setData("featured", e.target.checked)}
            />
            <label htmlFor="featured" className="text-sm text-zinc-800">
              Featured
            </label>
          </div>

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

          <Button type="submit" loading={form.processing}>
            Save
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
