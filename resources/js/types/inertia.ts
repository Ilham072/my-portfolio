import type { UserProfile } from "./models";

export type AuthUser = UserProfile & {
  email?: string;
};

export type PageProps = {
  auth?: {
    user: AuthUser | null;
  };
  flash?: {
    success?: string;
    error?: string;
  };
};
