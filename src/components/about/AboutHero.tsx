"use client";
import { motion } from "framer-motion";
import { Check, CloudOff, Gift, Lock, Zap } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PhotoArt from "@/components/home/PhotoArt";

const HERO = {
  title: "Image tools that keep your photos on your device.",
  text: "ImgSimplify is a free set of online image tools to compress, resize, convert and crop photos. Everything runs in your browser, so your images are never uploaded anywhere.",
  primary: { label: "Try the free tools", href: "/tools" },
  secondary: { label: "Read our privacy policy", href: "/privacy" },
  windowLabel: "ImgSimplify.com",
  processed: "Processed in your browser",
  uploaded: "0 bytes uploaded",
  badge: "No server involved",
};

const VALUES = [
  { icon: Lock, title: "Private by design", text: "Your images are processed on your device. We never receive, store or see them." },
  { icon: Zap, title: "Instant results", text: "No upload queue and no waiting. Results update as soon as you change a setting." },
  { icon: Gift, title: "Free to use", text: "No signup, no watermarks and no paywalled features. Just open a tool and go." },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-blob rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 animate-blob rounded-full bg-accent/20 blur-3xl" />

      <Container className="relative py-16 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[56px]">
              {HERO.title}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">{HERO.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={HERO.primary.href} size="lg">{HERO.primary.label}</Button>
              <Button href={HERO.secondary.href} variant="outline" size="lg">{HERO.secondary.label}</Button>
            </div>
          </motion.div>

          {/* Visual: the image never leaves the browser window */}
          <motion.div
            className="relative mx-auto w-full max-w-md"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-3xl border border-border bg-card p-3 shadow-soft">
              <div className="flex items-center gap-3 px-2 pb-3 pt-1" aria-hidden="true">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </span>
                <span className="flex-1 rounded-full bg-surface px-3 py-1 text-center text-xs text-muted">{HERO.windowLabel}</span>
              </div>
              <PhotoArt className="h-52 w-full rounded-2xl" />
              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 text-sm">
                <span className="flex items-center gap-2 font-semibold">
                  <Check size={16} className="text-primary" aria-hidden="true" />
                  {HERO.processed}
                </span>
                <span className="text-xs text-muted">{HERO.uploaded}</span>
              </div>
            </div>
            <div className="absolute -right-3 -top-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold shadow-soft">
              <CloudOff size={14} className="text-primary" aria-hidden="true" />
              {HERO.badge}
            </div>
          </motion.div>
        </div>

        {/* Principles */}
        <h2 className="sr-only">Our principles</h2>
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <v.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}