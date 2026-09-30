"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "@/constants/site";
import { TOOLS } from "@/constants/tools";

export default function Header() {
  const [open, setOpen] = useState(false);
  const linkCls = "rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-foreground";
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            <div className="group relative">
              <button className={`${linkCls} flex items-center gap-1`}>Tools <ChevronDown size={14} /></button>
              <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border border-border bg-card p-2 shadow-soft">
                  {TOOLS.map((t) => (
                    <Link key={t.slug} href={`/tools/${t.slug}`} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm hover:bg-surface">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${t.color}`}><t.icon size={15} /></span>
                      {t.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {NAV_LINKS.map((l) => <Link key={l.href} href={l.href} className={linkCls}>{l.label}</Link>)}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="/tools" size="sm" className="hidden h-10 sm:inline-flex">Image Upload</Button>
          <button aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="grid gap-1 py-3">
            {[...TOOLS.map((t) => ({ label: t.title, href: `/tools/${t.slug}` })), ...NAV_LINKS].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-surface">{l.label}</Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
