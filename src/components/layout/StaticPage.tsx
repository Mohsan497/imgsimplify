"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, CalendarDays, Clock, Link2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/constants/site";
import type { StaticPageContent } from "@/constants/pages";

const CTA = {
  title: "Ready to optimize an image?",
  text: "Compress, resize, convert or crop photos in seconds. Free, private and right in your browser.",
  label: "Browse all tools",
  href: "/tools",
};

const HEADER_OFFSET = 120;
const MIN_SECTIONS_FOR_TOC = 3;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function StaticPage({ content }: { content: StaticPageContent }) {
  const pathname = usePathname();

  // Readable ids like "#why-we-built-ImgSimplify" (better for sharing and jump links)
  const sections = useMemo(() => {
    const used = new Map<string, number>();
    return content.sections.map((s, i) => {
      const base = slugify(s.heading) || `section-${i + 1}`;
      const n = used.get(base) ?? 0;
      used.set(base, n + 1);
      return { ...s, id: n ? `${base}-${n + 1}` : base, number: i + 1 };
    });
  }, [content.sections]);

  const hasToc = sections.length >= MIN_SECTIONS_FOR_TOC;
  const words = [content.intro, ...content.sections.map((s) => s.body)]
    .join(" ")
    .split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [tocOpen, setTocOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Reading progress, active section and back-to-top (one rAF-throttled listener)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
      setShowTop(window.scrollY > 700);

      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= HEADER_OFFSET + 8) current = s.id;
      }
      if (max > 0 && window.scrollY >= max - 4) current = sections[sections.length - 1].id;
      setActiveId(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  const prefersReduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goTo = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setTocOpen(false);
  };

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" });

  // Structured data (AboutPage / WebPage + breadcrumbs)
  const url = `${SITE.url}${pathname ?? ""}`;
  const modified = content.updated ? new Date(content.updated) : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": pathname === "/about" ? "AboutPage" : "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: content.metaTitle ?? content.title,
        description: content.description ?? content.intro,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        ...(modified && !Number.isNaN(modified.getTime())
          ? { dateModified: modified.toISOString().slice(0, 10) }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: content.title, item: url },
        ],
      },
    ],
  };

  return (
    <div className="relative">
      <style>{`
        @keyframes sp-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .sp-rise { animation: sp-rise .7s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .sp-rise { animation: none; } }
      `}</style>

      {/* Reading progress */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
        <div ref={progressRef} className="h-full origin-left scale-x-0 bg-primary" />
      </div>

      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="max-w-5xl py-14 sm:py-20">
        {/* Header */}
        <header className="max-w-2xl">
          {(content.updated || sections.length >= MIN_SECTIONS_FOR_TOC) && (
            <div className="sp-rise flex flex-wrap gap-2">
              {content.updated && (
                <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted">
                  <CalendarDays size={15} className="text-primary" aria-hidden="true" />
                  Last updated{" "}
                  <time dateTime={modified && !Number.isNaN(modified.getTime()) ? modified.toISOString().slice(0, 10) : undefined}>
                    {content.updated}
                  </time>
                </p>
              )}
              {sections.length >= MIN_SECTIONS_FOR_TOC && (
                <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted">
                  <Clock size={15} className="text-primary" aria-hidden="true" />
                  {minutes} min read
                </p>
              )}
            </div>
          )}
          <h1
            className="sp-rise mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.05]"
            style={{ animationDelay: "80ms" }}
          >
            {content.title}
          </h1>
          <p
            className="sp-rise mt-6 text-lg leading-relaxed text-muted sm:text-xl sm:leading-8"
            style={{ animationDelay: "160ms" }}
          >
            {content.intro}
          </p>
        </header>

        <div
          className={`mt-14 grid gap-10 ${hasToc ? "lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14" : ""}`}
        >
          {/* Table of contents */}
          {hasToc && (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              {/* Mobile */}
              <div className="rounded-2xl border border-border bg-card lg:hidden">
                <button
                  type="button"
                  onClick={() => setTocOpen((o) => !o)}
                  aria-expanded={tocOpen}
                  aria-controls="toc-mobile"
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold ${focusRing}`}
                >
                  On this page
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-4 w-4 text-muted transition-transform ${tocOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>
                {tocOpen && (
                  <nav id="toc-mobile" aria-label="On this page" className="border-t border-border p-2">
                    <TocList sections={sections} activeId={activeId} onGo={goTo} />
                  </nav>
                )}
              </div>

              {/* Desktop */}
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="mb-3 text-sm font-semibold">On this page</p>
                <div className="border-l border-border">
                  <TocList sections={sections} activeId={activeId} onGo={goTo} desktop />
                </div>
              </nav>
            </aside>
          )}

          {/* Content */}
          <div className="min-w-0">
            <article className="rounded-3xl border border-border bg-card px-6 shadow-soft sm:px-10">
              <div className="divide-y divide-border">
                {sections.map((s) => {
                  const active = s.id === activeId;
                  return (
                    <section
                      key={s.id}
                      id={s.id}
                      aria-labelledby={`${s.id}-title`}
                      className="relative scroll-mt-24 py-8 first:pt-10 last:pb-10 sm:py-10"
                    >
                      {/* Active marker: shows where you are */}
                      {hasToc && (
                        <span
                          aria-hidden="true"
                          className={`absolute -left-6 bottom-8 top-8 w-[3px] origin-top rounded-r-full bg-primary transition-transform duration-500 motion-reduce:transition-none sm:-left-10 ${
                            active ? "scale-y-100" : "scale-y-0"
                          }`}
                        />
                      )}
                      <h2
                        id={`${s.id}-title`}
                        className="flex items-center gap-3.5 text-xl font-bold tracking-tight sm:text-2xl"
                      >
                        <span
                          className={`inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-xl px-2 text-sm font-bold tabular-nums transition-colors duration-300 ${
                            active && hasToc
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {s.number}
                        </span>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => goTo(e, s.id)}
                          className={`group/link inline-flex items-center gap-2 rounded-md ${focusRing}`}
                        >
                          {s.heading}
                          <Link2
                            size={16}
                            aria-hidden="true"
                            className="shrink-0 text-muted opacity-0 transition-opacity group-hover/link:opacity-70 group-focus-visible/link:opacity-100"
                          />
                        </a>
                      </h2>
                      <p className="mt-5 max-w-[68ch] text-base leading-7 text-muted sm:text-[17px] sm:leading-8">
                        {s.body}
                      </p>
                    </section>
                  );
                })}
              </div>
            </article>

            {/* Next step */}
            <aside className="mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
              <div className="max-w-md">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{CTA.title}</h2>
                <p className="mt-2 text-muted">{CTA.text}</p>
              </div>
              <Button href={CTA.href} size="lg" className="shrink-0">
                {CTA.label}
              </Button>
            </aside>
          </div>
        </div>
      </Container>

      {/* Back to top */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted shadow-soft transition duration-300 hover:border-primary hover:text-primary motion-reduce:transition-none ${focusRing} ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp size={18} />
      </button>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}

function TocList({
  sections,
  activeId,
  onGo,
  desktop = false,
}: {
  sections: { id: string; heading: string; number: number }[];
  activeId: string;
  onGo: (e: React.MouseEvent, id: string) => void;
  desktop?: boolean;
}) {
  return (
    <ul className="space-y-0.5">
      {sections.map((s) => {
        const active = s.id === activeId;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => onGo(e, s.id)}
              aria-current={active ? "location" : undefined}
              className={`flex gap-2 py-1.5 text-sm transition-colors ${focusRing} ${
                desktop
                  ? `-ml-px border-l-2 pl-4 ${
                      active
                        ? "border-primary font-semibold text-foreground"
                        : "border-transparent text-muted hover:border-border hover:text-foreground"
                    }`
                  : `rounded-lg px-3 ${
                      active
                        ? "bg-primary/10 font-semibold text-foreground"
                        : "text-muted hover:bg-background hover:text-foreground"
                    }`
              }`}
            >
              <span className="tabular-nums opacity-60">{s.number}.</span>
              <span>{s.heading}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}