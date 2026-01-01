import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import SeoHead from "@/components/common/SeoHead";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { required, maxLen } from "@/utils/validators";

type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
};

type Props = {
  profile: {
    id?: number;
    name: string;
    email?: string;
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
  headline: string | null;
  bio: string | null;
  location: string | null;
  website_url: string | null;
  avatar_path: string | null;
  social_links: SocialLinks | null;
};

function trimOrEmpty(v: string | null | undefined): string {
  return (v ?? "").trim();
}

function isProbablyUrl(v: string): boolean {
  const s = v.trim();
  if (!s) return true;
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeSocialLinks(links: SocialLinks): SocialLinks | null {
  const cleaned: SocialLinks = {};
  const github = trimOrEmpty(links.github);
  const linkedin = trimOrEmpty(links.linkedin);
  const twitter = trimOrEmpty(links.twitter);

  if (github) cleaned.github = github;
  if (linkedin) cleaned.linkedin = linkedin;
  if (twitter) cleaned.twitter = twitter;

  return Object.keys(cleaned).length > 0 ? cleaned : null;
}

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

      const n = required(d.name, "Name is required.");
      if (n) errors.name = n;

      const h = maxLen(d.headline ?? "", 160, "Headline max 160 chars.");
      if (h) errors.headline = h;

      const b = maxLen(d.bio ?? "", 5000, "Bio max 5000 chars.");
      if (b) errors.bio = b;

      if (!isProbablyUrl(d.website_url ?? "")) {
        errors.website_url = "Website URL must be a valid http(s) URL.";
      }

      const links = d.social_links ?? {};
      if (!isProbablyUrl(links.github ?? "")) {
        errors["social_links.github"] = "GitHub link must be a valid http(s) URL.";
      }
      if (!isProbablyUrl(links.linkedin ?? "")) {
        errors["social_links.linkedin"] = "LinkedIn link must be a valid http(s) URL.";
      }
      if (!isProbablyUrl(links.twitter ?? "")) {
        errors["social_links.twitter"] = "Twitter link must be a valid http(s) URL.";
      }

      return errors as never;
    }
  );

  const fieldErrors = form.errors as Record<string, string>;

  const setSocialLink = (key: keyof SocialLinks, value: string) => {
    const current = form.data.social_links ?? {};
    form.setData("social_links", { ...current, [key]: value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitValidated(() => {
      form.transform((data) => ({
        name: data.name.trim(),
        headline: trimOrEmpty(data.headline) || null,
        bio: trimOrEmpty(data.bio) || null,
        location: trimOrEmpty(data.location) || null,
        website_url: trimOrEmpty(data.website_url) || null,
        avatar_path: trimOrEmpty(data.avatar_path) || null,
        social_links: normalizeSocialLinks(data.social_links ?? {}),
      }));

      form.put("/admin/profile", {
        preserveScroll: true,
        onFinish: () => {
          // reset transform supaya tidak “nempel” ke request berikutnya
          form.transform((d) => d);
        },
      });
    });
  };

  return (
    <AdminLayout>
      <SeoHead title="Admin - Profile" />

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Edit Profile</h1>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input
            label="Name"
            value={form.data.name}
            onChange={(e) => form.setData("name", e.target.value)}
            error={form.errors.name}
          />

          <Input
            label="Headline (optional)"
            value={form.data.headline ?? ""}
            onChange={(e) => form.setData("headline", e.target.value)}
            error={form.errors.headline}
          />

          <Textarea
            label="Bio (optional)"
            value={form.data.bio ?? ""}
            onChange={(e) => form.setData("bio", e.target.value)}
            error={form.errors.bio}
          />

          <Input
            label="Location (optional)"
            value={form.data.location ?? ""}
            onChange={(e) => form.setData("location", e.target.value)}
            error={form.errors.location}
          />

          <Input
            label="Website URL (optional)"
            value={form.data.website_url ?? ""}
            onChange={(e) => form.setData("website_url", e.target.value)}
            error={form.errors.website_url}
            hint="Use a full URL, e.g. https://example.com"
          />

          <Input
            label="Avatar Path (optional)"
            value={form.data.avatar_path ?? ""}
            onChange={(e) => form.setData("avatar_path", e.target.value)}
            error={form.errors.avatar_path}
            hint="Later we can switch this to real file upload."
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="GitHub (optional)"
              value={form.data.social_links?.github ?? ""}
              onChange={(e) => setSocialLink("github", e.target.value)}
              error={fieldErrors["social_links.github"]}
            />
            <Input
              label="LinkedIn (optional)"
              value={form.data.social_links?.linkedin ?? ""}
              onChange={(e) => setSocialLink("linkedin", e.target.value)}
              error={fieldErrors["social_links.linkedin"]}
            />
            <Input
              label="Twitter (optional)"
              value={form.data.social_links?.twitter ?? ""}
              onChange={(e) => setSocialLink("twitter", e.target.value)}
              error={fieldErrors["social_links.twitter"]}
            />
          </div>

          <Button type="submit" loading={form.processing}>
            Save
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
