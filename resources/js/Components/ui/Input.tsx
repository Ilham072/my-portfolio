import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, className = "", ...rest }: Props) {
  return (
    <label className="block">
      <div className="text-sm font-medium">{label}</div>
      {hint ? <div className="mt-1 text-xs text-zinc-500">{hint}</div> : null}
      <input
        {...rest}
        className={[
          "mt-2 w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none",
          error ? "border-red-500" : "border-zinc-200 focus:ring-2 focus:ring-zinc-300",
          className,
        ].join(" ")}
      />
      {error ? <div className="mt-1 text-xs text-red-600">{error}</div> : null}
    </label>
  );
}
