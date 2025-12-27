import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import SeoHead from "@/components/common/SeoHead";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { required, maxLen } from "@/utils/validators";

type SocialLinks = { github?: string; linkedin?: string; twitter?: string };

type Props = {
  profile: {
    name: string;
    headline: string | null;
    bio: string | null;
    location: string | null;
    website_url: string | null;
    avatar_path: string | null;
    social_links: SocialLinks | null;
  };
};

type FormData = {
  name: string;
  headline: string;
  bio: string;
  location: string;
  website_url: string;
  avatar_path: string;
  social_links: SocialLinks;
};

export default function ProfileEdit({ profile }: Props) {
  const { form, submitValidated } = useValidatedForm<FormData>(
    {
      name: profile.name ?? "",
      headline: profile.headline ?? "",
      bio: profile.bio ?? "",
      location: profile.location ?? "",
      website_url: profile.website_url ?? "",
      avatar_path: profile.avatar_path ?? "",
      social_links: profile.social_links ?? {},
    },
    (d) => {
      const errors: Record<string, string> = {};
      const r = required(d.name, "Name is required.");
      if (r) errors.name = r;

      const m = maxLen(d.headline, 160, "Headline max 160 chars.");
      if (m) errors.headline = m;

      return errors as never;
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitValidated(() => {
      form.put("/admin/profile", { preserveScroll: true });
    });
  };

  return (
    <AdminLayout>
      <SeoHead title="Admin - Profile" />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Edit Profile</h1>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input label="Name" value={form.data.name} onChange={(e) => form.setData("name", e.target.value)} error={form.errors.name} />
          <Input label="Headline" value={form.data.headline} onChange={(e) => form.setData("headline", e.target.value)} error={form.errors.headline} />
          <Textarea label="Bio" value={form.data.bio} onChange={(e) => form.setData("bio", e.target.value)} error={form.errors.bio} />
          <Input label="Location" value={form.data.location} onChange={(e) => form.setData("location", e.target.value)} error={form.errors.location} />
          <Input label="Website URL" value={form.data.website_url} onChange={(e) => form.setData("website_url", e.target.value)} error={form.errors.website_url} />
          <Input label="Avatar Path" value={form.data.avatar_path} onChange={(e) => form.setData("avatar_path", e.target.value)} error={form.errors.avatar_path} />

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="GitHub"
              value={form.data.social_links.github ?? ""}
              onChange={(e) => form.setData("social_links", { ...form.data.social_links, github: e.target.value })}
            />
            <Input
              label="LinkedIn"
              value={form.data.social_links.linkedin ?? ""}
              onChange={(e) => form.setData("social_links", { ...form.data.social_links, linkedin: e.target.value })}
            />
            <Input
              label="Twitter"
              value={form.data.social_links.twitter ?? ""}
              onChange={(e) => form.setData("social_links", { ...form.data.social_links, twitter: e.target.value })}
            />
          </div>

          <Button type="submit" loading={form.processing}>Save</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
