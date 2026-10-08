# Update your existing portfolio

## What changed

1. All portfolio entries now appear on the homepage at `/#portfolio`, with category filters and search. Featured projects still appear first, followed by their display order.
2. Every technology appears on each card and detail page. The admin technology field accepts commas or new lines and previews the tags.
3. Individual `/portfolio/[slug]` pages remain available with their existing URLs. Paragraph breaks in project descriptions are preserved. The old listing at `/portfolio` redirects to the homepage collection.
4. Skills have a dedicated dashboard at `/admin/skills`, with one category workspace at a time instead of a long mixed list. Add, edit, move, reorder, delete, and rename categories there.
5. The public toolkit uses your saved skill categories automatically, including custom categories such as Backend or Databases. Empty categories no longer produce empty cards.

## Apply this update locally

1. Back up your current project folder.
2. Extract this ZIP. Copy its contents into your existing project folder and replace the matching source files. Keep your current `.env`, `.env.local`, `.git` folder, and any files already in `public/uploads`. The ZIP does not contain credentials or Git history.
3. Open a terminal inside your existing project folder and run:

```bash
npm ci
npm run dev
```

4. Visit the homepage and open **Admin → Manage skills**.

**No database migration, `db:push`, reset, or seed is needed for this update.** Do not run `db:seed` on your existing database: it replaces your portfolio collections with starter content.

## Deploy to your existing Vercel project

Commit the updated source files to your existing GitHub repository and push as usual. Your existing Vercel project can rebuild from that commit. Keep your current Vercel environment variables, Supabase database, and Blob store.

The update has not been pushed or deployed on your behalf.

## Files changed or added

- `app/page.tsx`, `app/globals.css`, `app/layout.tsx`
- `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`
- `app/admin/page.tsx`, `app/admin/skills/page.tsx`
- `components/navbar.tsx`, `components/project-card.tsx`, `components/portfolio-filter.tsx`
- `components/technology-field.tsx`, `components/skill-forms.tsx`
- `lib/actions.ts`, `lib/portfolio.ts`, `lib/skills.ts`, `lib/skill-actions.ts`
- `README.md`, `DEPLOYMENT.md`, `.env.example`, this guide

The Prisma schema and package versions are unchanged.

## Verification performed

- TypeScript checks and the production build passed.
- Desktop and mobile browser checks passed against an isolated local test database: project filtering/search, all technology tags, detail links, redirects, admin protection, and skill add/edit/move/reorder/rename/delete flows.
- The existing PostgreSQL schema is unchanged. Your live Supabase data and Vercel deployment were not accessed or modified.

## Smooth scrolling follow-up

If you already installed the previous update, copy just these three files from this ZIP into your existing project, preserving their folder locations:

- `components/section-link.tsx` (new)
- `components/navbar.tsx`
- `app/page.tsx`

Section links on the homepage now explicitly animate the scroll, retain the section URL, and use the existing 96px offset below the fixed navigation. The mobile menu closes when selecting a section. Visitors who request reduced motion get an instant transition. Links from other pages still navigate normally to the requested homepage section.

No new dependencies, environment changes, or database changes are required. Restart your local development server if needed, then commit and push these files to update your deployment.
