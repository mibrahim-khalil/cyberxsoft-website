# CyberX Soft — premium redesign (branch `redesign-premium`)

Your original project is untouched. This is a separate copy on its own git branch.

## Run it

```bash
cd client
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> client/dist
```

The backend (`/server`) is exactly the original one. Add your own `server/.env` if you run it
(it is not included here, because it holds the MongoDB connection string).
The contact form still posts to `POST {VITE_API_URL}/api/contact` with the same payload as before.

## What changed

- **Design system**: new tokens, tone system (`data-tone="dark|light"`), glass surfaces,
  one type family (Inter Tight for headings, Inter for text, self-hosted), section labels as plain pills.
- **Motion layer** (`src/ui`): Lenis smooth scroll, word-by-word title reveals, blur-fade section
  reveals, parallax images, "window opens" image reveals, magnetic buttons, spotlight cards,
  custom cursor with labels, scroll progress bar. Everything respects `prefers-reduced-motion`.
- **3D**: `ui/FloatingGlass.jsx` (three.js) — floating glass shards that follow the pointer and
  dolly with scroll. Lazy-loaded, paused off-screen, skipped without WebGL or with reduced motion.
- **Home** is a scroll story in chapters: hero → where to start → capability panorama (pinned,
  pans sideways) → staff augmentation → clients → why us → approach journey → selected work →
  FAQ → final call to action. A chapter rail on the right shows progress.
- **Service pages**: one shared template (`ServicePage` + `serviceContent.js`) for four services,
  a dedicated Staff Augmentation page, sticky in-page navigation.
- **Contact**: inline validation, service chips, segmented contact preference, proper success state (same API payload as the original form).
- **Images**: your `/pics` artwork is mapped in `src/config/media.js` and converted to WebP
  (about 45 MB down to 1.8 MB). Originals are not shipped in this zip.
- Fixed: stray text in the old hero, the audience-needs URL hack, the lint error in the header,
  missing page title and social meta tags.

## Content notes

All copy comes from the CEO briefs. Headings were re-cased to sentence case. (`*asterisks*` in the heading strings are
left over from an earlier accent style and are now rendered as normal text.) No statistics, testimonials or
case studies were invented; Work and Insights keep their "being prepared" states.

## To finish before launch

- Official logo as SVG or transparent PNG (the current one is derived from the supplied raster).
- Real social profile URLs (`siteConfig.socialLinks`).
- Approved case studies and articles; the layouts for both are ready.
- `animated creative or services.mp4` is not used yet (27 MB). It needs compressing first.
