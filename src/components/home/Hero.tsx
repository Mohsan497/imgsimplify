"use client";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Dropzone from "@/components/tools/Dropzone";
import PhotoArt from "./PhotoArt";
import { HERO } from "@/constants/home";
import { DEFAULT_UPLOAD_TOOL } from "@/constants/tools";
import { setPendingFile } from "@/lib/fileStore";

export default function Hero() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const onFile = (f: File) => { setPendingFile(f); router.push(`/tools/${DEFAULT_UPLOAD_TOOL}`); };

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-blob rounded-full bg-primary/20 blur-3xl motion-reduce:animate-none" />

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
            {HERO.badges.map((b) => <span key={b} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{b}</span>)}
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            {HERO.titleLine1}<br />{HERO.titlePlain} <span className="text-gradient">{HERO.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">{HERO.subtitle}</p>
          <Dropzone onFile={onFile} title={HERO.dropTitle} hint={HERO.dropHint} className="mt-8 max-w-xl" />
          <p className="mt-4 flex items-center gap-2 text-sm text-muted"><ShieldCheck size={16} className="text-primary" />{HERO.trust}</p>
        </motion.div>

        <motion.div className="relative mx-auto hidden h-[380px] w-full max-w-md lg:block" initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-64 -rotate-3 rounded-2xl border border-border bg-card p-2 shadow-soft">
            <PhotoArt className="h-44 w-full rounded-xl" />
            <span className="absolute -left-3 -top-3 rounded-lg border border-border bg-card px-2 py-1 text-xs font-semibold">{HERO.beforeLabel} <span className="text-muted">{HERO.beforeSize}</span></span>
          </motion.div>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-16 w-60 rotate-2 rounded-2xl border border-border bg-card p-2 shadow-soft">
            <PhotoArt className="h-40 w-full rounded-xl" />
            <span className="absolute -right-3 -top-3 rounded-lg bg-brand-gradient px-2 py-1 text-xs font-bold text-primary-foreground">{HERO.afterLabel} {HERO.afterSize}</span>
          </motion.div>

          {/* Curved arrow: first image -> converted image */}
          <svg
            aria-hidden="true"
            viewBox="0 0 176 110"
            fill="none"
            className="pointer-events-none absolute right-2 top-[168px] h-[110px] w-44 text-primary"
          >
            <motion.path
              d="M4 4 C 120 0, 170 60, 60 82"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: reduceMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
            />
            <motion.path
              d="M73 86.5 L60 82 L70.5 72.8"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 1.6 }}
            />
          </svg>

          <div className="absolute right-0 top-4 w-40 rounded-2xl border border-border bg-card p-4 shadow-soft">
            <ul className="space-y-2 text-sm font-medium">
              {HERO.checklist.map((c) => <li key={c} className="flex items-center gap-2"><Check size={14} className="text-primary" />{c}</li>)}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}