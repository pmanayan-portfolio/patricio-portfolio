# Production Deployment: Vercel + Supabase + Vercel Blob

This copy is prepared for a serverless production deployment.

## Architecture

- Next.js / React / TypeScript -> Vercel
- Prisma -> Supabase PostgreSQL
- Project images and brand logo -> Vercel Blob
- Admin session -> signed JOSE cookie

## 1. Install the new dependency

```bash
npm install
```

`@vercel/blob` is now listed in `package.json`.

## 2. Create the Supabase database

Create a Supabase project, then use **Connect** in the Supabase dashboard to copy:

1. **Transaction pooler** URL (port `6543`) for the deployed application.
2. **Session pooler** URL (port `5432`) for Prisma schema operations. This is friendlier to IPv4 development machines than the direct IPv6 endpoint.

For Prisma 6 with Supavisor transaction mode, append this to the runtime URL:

```text
?pgbouncer=true&connection_limit=1
```

If the URL already has query parameters, append with `&` instead of `?`.

Create a local `.env` file from `.env.example` and replace the placeholders:

```env
DATABASE_URL="postgresql://...:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://...:5432/postgres"
SESSION_SECRET="use-a-long-random-secret"
ADMIN_EMAIL="your-admin-email"
ADMIN_PASSWORD="use-a-strong-password"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Never commit `.env` or `.env.local`.

## 3. Create the production schema and starter content

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

`db:seed` loads the starter portfolio content. If you already have newer local content you want to preserve, export/copy it before seeding because the seed resets the portfolio collections.

## 4. Test against PostgreSQL locally

```bash
npm run dev
```

Test:

- `/`
- `/portfolio`
- `/login`
- `/admin`
- Creating/updating projects
- Contact form submissions

Without Vercel Blob credentials, local uploads still fall back to `public/uploads`. Production uses Blob storage.

## 5. Push the project to GitHub

Do not commit:

- `.env`
- `.env.local`
- `node_modules`
- `.next`
- `prisma/*.db`

The included `.gitignore` already excludes these.

## 6. Import the GitHub repository into Vercel

Create a new Vercel project from the repository. Next.js should be detected automatically.

Add these Vercel environment variables for Production (and Preview if desired):

- `DATABASE_URL` = Supabase transaction pooler URL + `pgbouncer=true&connection_limit=1`
- `DIRECT_URL` = Supabase session pooler URL
- `SESSION_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL` = your final Vercel/custom-domain URL

## 7. Create Vercel Blob storage

Inside the Vercel project, create a **Public Blob** store and connect it to the project.

New Vercel Blob stores can use project OIDC authentication automatically. Older stores may provide `BLOB_READ_WRITE_TOKEN`; the upload helper supports that as well.

The app stores public URLs from Blob in `Project.imageUrl` and `SiteSettings.logoUrl`.

## 8. Deploy and verify

Redeploy after the environment variables and Blob store are connected. Verify:

- Public pages load from Supabase
- Admin login works
- Project image upload survives redeploys
- Logo upload survives redeploys
- New contact messages appear in the admin dashboard

## Upload size

Production server uploads are limited to **4 MB** in this build so they stay below Vercel's 4.5 MB server-request limit. If larger uploads are needed later, switch the image component to Vercel Blob client uploads.
