import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import SeoHead from "@/components/common/SeoHead";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { required, maxLen } from "@/utils/validators";

type FormData = {
  company: string;
  role: string;
  location: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD atau ""
  is_current: boolean;
  description: string;
  sort_order: number;
};

function todayISODate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Create() {
  const { form, submitValidated } = useValidatedForm<FormData>(
    {
      company: "",
      role: "",
      location: "",
      start_date: todayISODate(),
      end_date: "",
      is_current: false,
      description: "",
      sort_order: 0,
    },
    (d) => {
      const errors: Record<string, string> = {};

      const c = required(d.company, "Company is required.");
      if (c) errors.company = c;

      const r = required(d.role, "Role is required.");
      if (r) errors.role = r;

      const sd = required(d.start_date, "Start date is required.");
      if (sd) errors.start_date = sd;

      const desc = maxLen(d.description, 10000, "Description max 10000 chars.");
      if (desc) errors.description = desc;

      if (d.is_current && d.end_date) {
        errors.end_date = "End date must be empty when current position is checked.";
      }
      if (!d.is_current && d.end_date && d.start_date && d.end_date < d.start_date) {
        errors.end_date = "End date must be after or equal to start date.";
      }

      return errors as never;
    }
  );

  const toggleCurrent = (checked: boolean) => {
    form.setData("is_current", checked);
    if (checked) form.setData("end_date", "");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitValidated(() => {
      form.transform((data) => ({
        company: data.company.trim(),
        role: data.role.trim(),
        location: data.location.trim() || null,
        start_date: data.start_date,
        end_date: data.is_current ? null : (data.end_date ? data.end_date : null),
        is_current: Boolean(data.is_current),
        description: data.description.trim() || null,
        sort_order: Number(data.sort_order || 0),
      }));

      form.post("/admin/experiences", {
        preserveScroll: true,
        onFinish: () => form.transform((d) => d),
      });
    });
  };

  return (
    <AdminLayout>
      <SeoHead title="Admin - Create Experience" />

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Create Experience</h1>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input
            label="Company"
            value={form.data.company}
            onChange={(e) => form.setData("company", e.target.value)}
            error={form.errors.company}
          />

          <Input
            label="Role"
            value={form.data.role}
            onChange={(e) => form.setData("role", e.target.value)}
            error={form.errors.role}
          />

          <Input
            label="Location (optional)"
            value={form.data.location}
            onChange={(e) => form.setData("location", e.target.value)}
            error={form.errors.location}
          />

          <Input
            label="Start Date"
            type="date"
            value={form.data.start_date}
            onChange={(e) => form.setData("start_date", e.target.value)}
            error={form.errors.start_date}
          />

          <div className="flex items-center gap-2">
            <input
              id="is_current"
              type="checkbox"
              checked={form.data.is_current}
              onChange={(e) => toggleCurrent(e.target.checked)}
            />
            <label htmlFor="is_current" className="text-sm text-zinc-800">
              Current position
            </label>
          </div>

          <Input
            label="End Date (optional)"
            type="date"
            value={form.data.end_date}
            onChange={(e) => form.setData("end_date", e.target.value)}
            error={form.errors.end_date}
            disabled={form.data.is_current}
            hint={form.data.is_current ? "Disabled because current position is checked." : undefined}
          />

          <Textarea
            label="Description (optional)"
            value={form.data.description}
            onChange={(e) => form.setData("description", e.target.value)}
            error={form.errors.description}
          />

          <Input
            label="Sort Order (lower first)"
            type="number"
            value={String(form.data.sort_order)}
            onChange={(e) => form.setData("sort_order", Number(e.target.value || 0))}
            error={form.errors.sort_order}
          />

          <Button type="submit" loading={form.processing}>
            Save
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
