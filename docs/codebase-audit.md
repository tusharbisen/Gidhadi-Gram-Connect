# Gidhadi Gram Connect Codebase Audit

Date: 2026-03-23

## 1. Current Architecture

Current pattern: mixed

- `app/`: Next.js App Router route entrypoints.
- `components/`: broad bucket containing feature UI, shared layout, providers, and generated UI primitives.
- `hooks/`: shared hooks.
- `lib/`: shared utility helpers.
- `types/`: shared TypeScript types.
- `public/`: static images and icons.
- `styles/`: legacy global stylesheet folder that is not currently wired into the app.

This is not fully feature-based and not fully type-based. Routing is feature-oriented, but most implementation lives in a catch-all `components/` folder.

## 2. Folder Inventory And Purpose

- `app/about`, `app/admin`, `app/documents`, `app/gallery`, `app/grievance`, `app/news`, `app/schemes`: page routes.
- `components/about`, `components/admin`, `components/documents`, `components/gallery`, `components/grievance`, `components/news`, `components/schemes`: route-specific UI.
- `components/home`: homepage-only sections.
- `components/layout`: header/footer shell.
- `components/common`: small shared presentation helpers.
- `components/providers`: language context plus locale JSON.
- `components/ui`: shadcn/Radix-style reusable UI primitives and a large amount of generated inventory.
- `components/video-section`, `components/brave-soldiers`, `components/brand`, `components/viilage-info`: standalone feature sections.
- `hooks`: active shared hooks used by UI primitives.
- `lib`: utility functions such as `cn`.
- `types`: domain types for village data.
- `public/brave`: active brave soldier photos.
- `public/Croser`: currently unreferenced gallery-style image set.
- `styles`: legacy CSS file not imported by App Router.

## 3. Structural Inconsistencies

- `components/viilage-info/` is misspelled and should be `village-info/`.
- File naming is mixed: mostly kebab-case, but `components/brand/BrandPromotion.tsx` uses PascalCase.
- `app/page.tsx` imports `hero-carousel.tsx` as `HeroSection`, which hides the real component intent.
- i18n files live under `components/providers/locales/`, but translation data is application content, not component logic.
- Static content arrays live inside UI files instead of dedicated data/constants modules.
- There are two global CSS locations: `app/globals.css` is active, `styles/globals.css` is legacy.
- Both `package-lock.json` and `pnpm-lock.yaml` exist, which usually indicates package-manager drift.

## 4. Compiler-Confirmed Dead Code Cleanups Applied

These were safe symbol-only removals and do not change behavior:

- Removed unused `Metadata` import from `app/layout.tsx`.
- Removed unused `BrandPromotion` import from `app/page.tsx`.
- Removed unused language-provider destructuring from `components/home/hero-carousel.tsx`.
- Removed unused `t` destructuring from `components/news/events-list.tsx`.
- Removed unused icon props in `components/ui/calendar.tsx`.

Validation:

- `npx tsc --noEmit --noUnusedLocals --noUnusedParameters` passes.
- `npm run build` passes.

## 5. Re-Check Results

Re-check scope:

- Verified all route entrypoints against Next.js App Router conventions.
- Searched for `next/dynamic`, `dynamic(...)`, `React.lazy`, and runtime `import(...)`.
- Checked framework/tool-owned config files separately from import-based reachability.
- Re-checked leaf files against string-based references and internal dependency chains.

Findings:

- No dynamic routes are present in the repository right now.
- No lazy-loading or `next/dynamic` usage is present in the repository right now.
- The earlier audit had false positives from framework/tool ownership:
  - `app/**/page.tsx` and `app/layout.tsx` are route entrypoints, not unused files.
  - `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, and `package.json` are framework/tool config files.
  - `components.json` is a shadcn CLI config file.
  - `public/favicon.png` is referenced by Next metadata.
- Assets, lockfiles, deployment metadata, and generated UI inventory should not be labeled `100% safe` based on import tracing alone.

## 6. 100% Safe Deletion List

These are the only files I can now classify as 100% safe to delete based on the current repository state.

- They are not imported directly.
- They are not referenced through dynamic imports.
- They are not route/config entrypoints.
- They are leaf modules with no required side effects.
- Their removal does not break `npx tsc --noEmit --noUnusedLocals --noUnusedParameters` or `npm run build`.

- `components/ui/use-mobile.tsx`
  - Why unused: all imports point to `hooks/use-mobile.tsx`.
  - Evidence: `components/ui/sidebar.tsx` imports `@/hooks/use-mobile`.
- `components/ui/use-toast.ts`
  - Why unused: all imports point to `hooks/use-toast.ts`.
  - Evidence: `components/ui/toaster.tsx` imports `@/hooks/use-toast`.
- `components/home/hero-section.tsx`
  - Why unused: homepage uses `components/home/hero-carousel.tsx` instead.
- `components/home/latest-announcements.tsx`
  - Why unused: homepage renders `announcement-carousel` and `announcement-marquee`, not this card variant.
- `components/theme-provider.tsx`
  - Why unused: no imports reference it, and app layout does not use `next-themes`.
- `components/providers/translations.json`
  - Why unused: translation system is built from `components/providers/locales/*.json`.

## 7. Not On The 100% Safe List

These may be unused today, but I am no longer classifying them as safe deletions without owner confirmation:

- `components/viilage-info/village-info-with-props.tsx`
- `styles/globals.css`
- all currently unreferenced `public/*` assets
- `.vercel/*`
- `pnpm-lock.yaml`
- unreferenced `components/ui/*` generated inventory

## 8. Duplicate Code

### Exact duplicates

- `components/ui/use-mobile.tsx` and `hooks/use-mobile.tsx`
- `components/ui/use-toast.ts` and `hooks/use-toast.ts`

### Near-duplicates / overlapping implementations

- `components/viilage-info/village-info.tsx` and `components/viilage-info/village-info-with-props.tsx`
  - Strong overlap in layout and displayed metrics.
  - The prop-driven version omits the map integration and is not wired into routes.
- `components/home/hero-section.tsx` and `components/home/hero-carousel.tsx`
  - Both represent homepage hero treatment.
  - Only the carousel version is in use.
- `components/home/latest-announcements.tsx`, `components/home/announcement-carousel.tsx`, and `components/home/announcement-marquee.tsx`
  - Multiple announcement presentation strategies exist.
  - Only carousel + marquee are active.

## 9. Dead Code Inside Live Files

- `components/brave-soldiers/brave-soldiers-section.tsx`
  - Contains a large commented-out legacy implementation starting around line 206.
  - This should be removed or moved to Git history.
- `app/page.tsx`
  - Previously had an unused `BrandPromotion` import.
- `app/layout.tsx`
  - Previously had an unused `Metadata` import.
- `components/home/hero-carousel.tsx`
  - Previously destructured unused language-provider values.
- `components/news/events-list.tsx`
  - Previously destructured an unused `t` value.
- `components/ui/calendar.tsx`
  - Previously accepted unused icon props in inline render functions.

## 10. Unused Assets

Referenced assets:

- `public/logo.png`
- `public/thumbel.png`
- `public/placeholder.svg`
- `public/image1.jpg`
- `public/image2.jpg`
- `public/image3.jpg`
- `public/flag.jpg`
- `public/Tree.jpg`
- `public/clean.png`
- `public/pnk.jpg`
- `public/tejas.jpg`
- `public/tushar.jpg`
- `public/brave/jaykumar.jpg`
- `public/brave/nikhilthakre.jpg`
- `public/favicon.png`

Currently unreferenced assets:

- `public/2.png`
- `public/image4.png`
- `public/Croser/*`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`
- `public/apple-touch-icon.png`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/favicon.svg`

These are not on the 100% safe deletion list because asset reachability can be influenced by manual linking, deployment metadata, browser conventions, or planned content work.

## 11. Refactor Recommendations

### Recommended target structure

```text
src/
  app/
    (routes only)
  components/
    layout/
    ui/
    shared/
  features/
    about/
    admin/
    brave-soldiers/
    documents/
    gallery/
    grievance/
    home/
    news/
    schemes/
    village-info/
  hooks/
  lib/
    utils/
    i18n/
  services/
  types/
  constants/
    content/
    navigation/
```

### Practical mapping from current structure

- Keep `app/` route files thin and route-only.
- Move route-specific components from `components/<feature>` into `features/<feature>/components`.
- Move hardcoded arrays from UI files into `constants/content/*`.
- Move `components/providers/language-provider.tsx` and `components/providers/locales/*` into `lib/i18n/`.
- Rename `components/viilage-info` to `features/village-info`.
- Keep only genuinely shared primitives in `components/ui`.
- Keep `components/layout` as shared shell UI.

## 12. Suggested Refactors By Priority

### Priority 1

- Standardize on one package manager and remove the other lockfile.
- Rename `components/viilage-info` to `components/village-info` or move directly to `features/village-info`.
- Remove exact duplicate hooks from `components/ui`.
- Delete or archive the large commented legacy block in `components/brave-soldiers/brave-soldiers-section.tsx`.

### Priority 2

- Merge `village-info.tsx` and `village-info-with-props.tsx` into one prop-driven feature component plus a small default-data wrapper.
- Choose one homepage announcement pattern and remove inactive alternatives.
- Rename `components/brand/BrandPromotion.tsx` to kebab-case if it remains.
- Extract content objects from:
  - `components/news/events-list.tsx`
  - `components/home/event-carousel.tsx`
  - `components/gallery/photo-gallery.tsx`
  - `components/about/about-us.tsx`
  - `components/viilage-info/village-info.tsx`

### Priority 3

- Review the unused shadcn inventory and keep only primitives the product is likely to use.
- Move locale JSON out of `components/`.
- Consolidate globals into one stylesheet entrypoint.

## 13. Safe Deletion Test Steps

Before deleting any candidate:

1. Run `npx tsc --noEmit`.
2. Run `npm run build`.
3. Manually test `/`, `/about`, `/schemes`, `/news`, `/grievance`, `/gallery`, `/documents`, `/admin`, and `/admin/dashboard`.
4. Toggle all languages in the header and verify translated labels still render.
5. Check homepage hero, announcement sections, gallery modal, grievance form, and village info section.
6. If deleting assets, open the site and inspect the browser network panel for `404` image/icon requests.

## 14. Summary Of Issues

- Mixed architecture with feature code scattered across a generic `components/` bucket.
- Misspelled and inconsistent naming.
- Duplicated hooks in two different locations.
- Several unused legacy components and assets.
- Large generated UI surface area that is mostly not in use.
- Content/data coupled directly into component files.
- Legacy/commented code left in production files.
- Package-manager drift and duplicate global-style locations.

## 15. Step-By-Step Cleanup Plan

1. Finish low-risk cleanup: remove duplicate hooks, legacy hero/announcement variants, unused translation JSON, and unused theme provider.
2. Decide npm vs pnpm and delete the unused lockfile.
3. Rename and relocate `viilage-info` into a correctly named feature folder.
4. Move route-specific code into `features/*/components`.
5. Extract hardcoded data into `constants/content/*`.
6. Reduce `components/ui` to the primitives actually used by the product.
7. Review and delete unused `public/` assets after manual visual verification.
8. Consolidate i18n under `lib/i18n`.
9. Run a full build and smoke test after each cleanup batch, not after one large rewrite.
