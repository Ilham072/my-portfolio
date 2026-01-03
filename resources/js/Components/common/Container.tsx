import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export default function Container({ className = "", children }: Props) {
  return <div className={["mx-auto w-full max-w-6xl px-4", className].join(" ")}>{children}</div>;
}
