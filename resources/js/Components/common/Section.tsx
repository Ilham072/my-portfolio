import React, { PropsWithChildren } from "react";
import Container from "./Container";

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  className?: string;
}>;

export default function Section({ title, subtitle, headerRight, className = "", children }: Props) {
  return (
    <section className={["py-10 sm:py-14", className].join(" ")}>
      <Container>
        {title || subtitle || headerRight ? (
          <div className="flex items-end justify-between gap-4">
            <div>
              {title ? <h2 className="text-xl font-semibold tracking-tight text-fg">{title}</h2> : null}
              {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
            </div>
            {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
          </div>
        ) : null}

        <div className={title || subtitle || headerRight ? "mt-6" : ""}>{children}</div>
      </Container>
    </section>
  );
}
