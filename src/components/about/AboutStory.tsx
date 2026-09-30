import { Check, X } from "lucide-react";
import Container from "@/components/ui/Container";

const STORY = [
  {
    heading: "Why we built ImgSimplify",
    body: "Most online image compressors and converters ask you to upload your files to a server. You rarely know where those files go or how long they stay there. Modern browsers are powerful enough to do the whole job locally, so we built ImgSimplify: simple image tools that never send your photos anywhere.",
  },
  {
    heading: "How ImgSimplify works",
    body: "ImgSimplify uses the Canvas API that is already built into your browser. When you choose an image, it is loaded into your device's memory, processed there and handed back to you for download. Nothing is sent to our servers, so there is no upload wait and no copy of your file left behind.",
  },
];

const COMPARE = {
  title: "ImgSimplify vs typical online image tools",
  columns: { other: "Typical tools", us: "ImgSimplify" },
  rows: [
    { label: "Uploads your image", other: "Usually", us: "Never" },
    { label: "Upload and download wait", other: "Yes", us: "None" },
    { label: "Account or signup", other: "Often", us: "Never" },
    { label: "Watermarks on results", other: "Sometimes", us: "Never" },
  ],
  note: "This compares upload-based image tools in general, not any specific product.",
};

export default function AboutStory() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="space-y-10">
            {STORY.map((s) => (
              <div key={s.heading}>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{s.heading}</h2>
                <p className="mt-4 max-w-[62ch] text-base leading-7 text-muted sm:text-[17px] sm:leading-8">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <h2 className="px-5 pb-4 pt-6 text-lg font-bold tracking-tight sm:px-6">{COMPARE.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">{COMPARE.title}</caption>
                <thead>
                  <tr className="bg-surface">
                    <th scope="col" className="px-5 py-3 sm:px-6"><span className="sr-only">Feature</span></th>
                    <th scope="col" className="px-3 py-3 font-semibold text-muted">{COMPARE.columns.other}</th>
                    <th scope="col" className="px-3 py-3 font-semibold text-primary">{COMPARE.columns.us}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {COMPARE.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row" className="px-5 py-4 font-medium sm:px-6">{r.label}</th>
                      <td className="px-3 py-4 text-muted">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <X size={15} aria-hidden="true" />{r.other}
                        </span>
                      </td>
                      <td className="px-3 py-4 font-semibold">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <Check size={15} className="text-primary" aria-hidden="true" />{r.us}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-border px-5 py-4 text-xs text-muted sm:px-6">{COMPARE.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}