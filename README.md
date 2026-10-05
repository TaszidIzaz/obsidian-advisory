# Obsidian Advisory

Marketing site for Obsidian Advisory — Next.js 16 (App Router), React 19, GSAP (ScrollTrigger, SplitText, Flip) and Lenis.
The homepage is built from the Figma file `t2EK07MKFTvZMxG0Y48Hi8` (frame 1:63); About, Services, Insights and Book a Call
follow the same system.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3100
npm run build      # production build
```

## Structure

- `src/app/` — routes: `/`, `/about`, `/services`, `/insights`, `/insights/[slug]`, `/book-a-call`, `/api/book`
- `src/components/` — one component + CSS module per section; shared UI in `components/ui/`
- `src/content/` — all copy and data (edit text here, not in components)
- `src/lib/reveals.ts` — shared scroll reveals (`data-split`, `data-fade`, `data-rule`, `data-clip`)
- `public/images/` — images exported from Figma at 2x with tint and grain baked in

Sizing: `1rem = 10 design px`; at ≥1024px the root font size scales with the viewport so the layout matches the
1440 Figma frame exactly at 1440 wide.

## Before launch

- **Fonts:** `src/fonts/` holds Season Serif / Sans **TRIAL** files. Replace them with licensed files (WOFF2) and update
  `src/app/fonts.ts`.
- **Booking form:** `src/app/api/book/route.ts` validates requests but does not deliver them yet — connect it to email or a CRM.
- **Newsletter:** `src/components/insights/Newsletter.tsx` has no mailing-list provider yet.
- **Content:** Insights articles and the copy for the inner pages are placeholders (`src/content/`).
