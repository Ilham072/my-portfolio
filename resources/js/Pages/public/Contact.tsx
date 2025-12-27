import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import SeoHead from "@/components/common/SeoHead";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { required, maxLen } from "@/utils/validators";

type FormData = { name: string; email: string; message: string };

export default function Contact() {
  const { form, submitValidated } = useValidatedForm<FormData>(
    { name: "", email: "", message: "" },
    (d) => {
      const errors: Record<string, string> = {};
      const r1 = required(d.name, "Name is required.");
      if (r1) errors.name = r1;

      const r2 = required(d.email, "Email is required.");
      if (r2) errors.email = r2;

      const r3 = required(d.message, "Message is required.");
      if (r3) errors.message = r3;

      const m = maxLen(d.message, 5000, "Message max 5000 chars.");
      if (m) errors.message = m;

      return errors as never;
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitValidated(() => {
      form.post("/contact", { preserveScroll: true });
    });
  };

  return (
    <PublicLayout>
      <SeoHead title="Contact" description="Get in touch" />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold">Contact</h1>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input label="Name" value={String(form.data.name)} onChange={(e) => form.setData("name", e.target.value)} error={form.errors.name} />
          <Input label="Email" value={String(form.data.email)} onChange={(e) => form.setData("email", e.target.value)} error={form.errors.email} />
          <Textarea label="Message" value={String(form.data.message)} onChange={(e) => form.setData("message", e.target.value)} error={form.errors.message} />
          <Button type="submit" loading={form.processing}>Send</Button>
        </form>
      </div>
    </PublicLayout>
  );
}
