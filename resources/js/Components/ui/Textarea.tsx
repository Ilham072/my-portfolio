import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Textarea({ label, error, className = "", ...rest }: Props) {
  return (
    <label className="block">
      <div className="text-sm font-medium">{label}</div>
      <textarea
        {...rest}
        className={[
          "mt-2 w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none",
          "min-h-[120px]",
          error ? "border-red-500" : "border-zinc-200 focus:ring-2 focus:ring-zinc-300",
          className,
        ].join(" ")}
      />
      {error ? <div className="mt-1 text-xs text-red-600">{error}</div> : null}
    </label>
  );
}
