import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props { title: string; subtitle?: string; cta?: { label: string; href: string }; as?: "h1" | "h2" }

export default function SectionHeading({ title, subtitle, cta, as: Tag = "h2" }: Props) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <Tag className="text-2xl font-extrabold sm:text-3xl">{title}</Tag>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>
      {cta && (
        <Link href={cta.href} className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
          {cta.label} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
