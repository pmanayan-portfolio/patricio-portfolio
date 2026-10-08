# Patricio — Full Stack Developer Portfolio

An animated Next.js portfolio with a Prisma-backed admin dashboard.

## Updating your existing project

Read **UPDATE-GUIDE.md** first. This update does not change the database schema. Keep your existing environment settings and database; do not reset or reseed them.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 4 and Framer Motion
- Prisma 6 with PostgreSQL (Supabase in the existing deployment)
- JOSE session cookies for admin authentication
- Vercel Blob for production uploads; local uploads during development

## New installation only

Use Node.js 20 or later. Create `.env` from `.env.example` and fill in your PostgreSQL connection strings and admin credentials.

```bash
npm ci
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Run the seed only on a fresh database: it deletes and replaces portfolio collections with starter content. Existing projects do not need it.

## Public portfolio

- `/`: the complete homepage, including all projects, category filters, and project/technology search.
- `/#portfolio`: jump directly to the project collection.
- `/portfolio`: redirects to `/#portfolio` for existing bookmarks.
- `/portfolio/[slug]`: each project's existing detail page, including overview, image, technologies, and external links.
- `/#skills`: the toolkit, grouped automatically from saved skill categories. Empty categories are not displayed.

Project cards and detail pages display all technologies. In the project editor, enter technologies separated by commas or new lines; a tag preview displays the resulting list. Empty values and duplicate names are removed. Project details preserve paragraph breaks.

## Content management

- `/admin`: site settings, projects, services, experience, education, testimonials, and messages.
- `/admin/skills`: category overview and links to individual skill workspaces.
- Choose a skill category to add, edit, move, reorder, or delete its skills. Open a skill row to edit it.
- To create a category, add its first skill and type the new category name.
- To move a skill, change its category in the edit form.
- To rename a category, open **Rename category** in its workspace.
- Display order controls skills inside each group; lower values appear first. Categories follow their first skill in the overall sort order.
- Categories containing no skills disappear automatically; no separate empty category records are stored.

The same grouping rules are used by the admin and public toolkit. Existing spelling and whitespace variations are grouped without requiring a migration.

## Environment and uploads

Keep `.env` private. Prisma CLI reads `.env`; Next.js can also read `.env.local`. Preserve the database URLs, admin credentials, session secret, and any existing Blob settings during an update.

Production image uploads use Vercel Blob; local uploads fall back to `public/uploads`. Keep existing local upload files when copying this update. See **DEPLOYMENT.md** for new deployment setup.

## Checks

```bash
npm run typecheck
npm run build
```
