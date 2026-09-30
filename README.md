# ImgSimplify — Image tools (Next.js 14 + TypeScript + Tailwind)

    npm install
    npm run dev        # http://localhost:3000
    npm run build && npm start

## One-place customisation
| What | File |
|---|---|
| Colors / dark mode | `src/app/globals.css` (CSS variables) |
| Fonts | `src/config/fonts.ts` |
| Site name, nav, footer links | `src/constants/site.ts` |
| Homepage text | `src/constants/home.ts` |
| Tools list (add a tool = add one object) | `src/constants/tools.ts` |
| FAQs | `src/constants/faqs.ts` |
| About / Privacy / Terms / Blog text | `src/constants/pages.ts` |

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` for correct sitemap/SEO URLs.
All image processing runs client-side (Canvas API) — no backend needed.
