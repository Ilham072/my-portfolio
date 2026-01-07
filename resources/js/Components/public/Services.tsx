import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, Layout, MonitorSmartphone, PenTool } from "lucide-react";

type ServiceItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
};

const services: ServiceItem[] = [
  {
    title: "UI/UX Design",
    description: "Wireframe, user flow, high-fidelity UI, dan design system yang konsisten.",
    icon: <PenTool className="h-5 w-5" />,
    href: "/contact",
  },
  {
    title: "Application Design",
    description: "Desain aplikasi web/mobile yang rapi, scalable, dan mudah diimplementasikan.",
    icon: <MonitorSmartphone className="h-5 w-5" />,
    href: "/contact",
  },
  {
    title: "Website Design",
    description: "Landing page, portfolio, hingga corporate site dengan layout modern & cepat.",
    icon: <Layout className="h-5 w-5" />,
    href: "/contact",
  },
];

export default function Services() {
  return (
    <section className="py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="h-[2px] w-5 rounded-full bg-primary" />
            <span>Services</span>
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            <span className="text-primary">Services</span> I Provide
          </h2>
        </div>

        {/* CTA */}
        <Link
          href="/portfolio"
          className="group inline-flex items-center justify-center gap-3 self-start rounded-full border border-border bg-bg px-5 py-2 text-sm font-medium text-fg shadow-sm transition hover:bg-accent sm:self-auto"
        >
          View All Services
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-fg transition group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-border bg-bg p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-fg ring-1 ring-border">
                {s.icon}
              </div>

              <div className="min-w-0">
                <div className="text-base font-semibold text-fg">{s.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>

                <Link
                  href={s.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
