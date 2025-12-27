import React from "react";
import { Head } from "@inertiajs/react";

type Props = { title: string; description?: string };

export default function SeoHead({ title, description }: Props) {
  return (
    <Head title={title}>
      {description ? <meta name="description" content={description} /> : null}
    </Head>
  );
}
