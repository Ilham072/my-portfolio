export type SocialLinks = Partial<{
  github: string;
  linkedin: string;
  twitter: string;
}>;

export type UserProfile = {
  id: number;
  name: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  website_url: string | null;
  avatar_path: string | null;
  social_links: SocialLinks | null;
};

export type Portfolio = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  body?: string | null;
  cover_image_path: string | null;
  project_url?: string | null;
  repository_url?: string | null;
  tech_stack: string[] | null;
  featured?: boolean;
  sort_order?: number;
  published_at: string | null;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  sort_order?: number;
};

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  body?: string;
  cover_image_path: string | null;
  reading_time_minutes: number | null;
  featured?: boolean;
  published_at: string | null;
};
