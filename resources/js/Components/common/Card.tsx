import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  hover?: boolean;
}>;

export default function Card({ className = "", hover = false, children }: Props) {
  return (
    <div
      className={[
        "rounded-2xl border border-border bg-bg",
        hover ? "transition-shadow hover:shadow-sm" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
