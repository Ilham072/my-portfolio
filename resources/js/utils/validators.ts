export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function required(value: string, message: string): string | null {
  return value.trim().length === 0 ? message : null;
}

export function maxLen(value: string, max: number, message: string): string | null {
  return value.length > max ? message : null;
}
