import Link from "next/link";
import { ArrowUp, ShieldCheck } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import { SITE } from "@/constants/site";
import { TOOLS } from "@/constants/tools";
import { POSTS } from "@/constants/posts";

const FEATURED_TOOLS = ["compress-image", "resize-image", "jpg-to-png", "png-to-jpg", "webp-to-jpg", "jpg-to-webp"];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const linkCls =
  "inline-block text-sm text-white/70 transition duration-200 hover:translate-x-0.5 hover:text-white focus-visible:text-white focus-visible:underline focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-x-0";

export default function Footer() {
  const tools = TOOLS.filter((t) => FEATURED_TOOLS.includes(t.slug));
  const guides = POSTS.slice(0, 3);

  return (
    <footer className="relative mt-24 overflow-hidden bg-inverse text-white">
      {/* Gradient edge and soft glows */}
      <div className="absolute inset-x-0 top-0 h-px bg-brand-gradient" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <Container className="relative pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{SITE.tagline}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80">
              <ShieldCheck size={14} className="text-primary" aria-hidden="true" />
              Your images never leave your device
            </p>
          </div>

          {/* Tools */}
          <nav aria-label="Image tools">
            <h2 className="text-sm font-semibold">Image tools</h2>
            <ul className="mt-4 space-y-3">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className={linkCls}>{t.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/tools" className="inline-block text-sm font-semibold text-primary transition hover:brightness-125">
                  View all tools
                </Link>
              </li>
            </ul>
          </nav>

          {/* Guides */}
          <nav aria-label="Latest guides">
            <h2 className="text-sm font-semibold">Latest guides</h2>
            <ul className="mt-4 space-y-3">
              {guides.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className={`${linkCls} line-clamp-2 max-w-[260px]`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className="text-sm font-semibold">Company</h2>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {SITE.year} {SITE.name}. All rights reserved.</p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            Back to top <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>

        {/* Oversized wordmark, fades out at the bottom */}
        <div
          aria-hidden="true"
          className="select-none overflow-hidden pt-4 text-center font-display text-[24vw] font-extrabold leading-[0.85] tracking-tight text-white/[0.05] [-webkit-mask-image:linear-gradient(to_bottom,black_25%,transparent_95%)] [mask-image:linear-gradient(to_bottom,black_25%,transparent_95%)] lg:text-[180px]"
        >
          {SITE.name}
        </div>
      </Container>
    </footer>
  );
}