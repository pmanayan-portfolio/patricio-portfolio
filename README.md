# Patricio — Full Stack Developer Portfolio

A premium, animated Next.js portfolio with a Prisma-backed content studio/admin dashboard.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Prisma + SQLite (easy to migrate to PostgreSQL)
- JOSE session cookie for the admin area

## First run

Make sure Node.js 20+ is installed.

```bash
npm install
copy .env.example .env.local
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

On macOS/Linux, replace the `copy` command with:

```bash
cp .env.example .env.local
```

Then open:

- http://localhost:3000
- http://localhost:3000/portfolio
- http://localhost:3000/admin

Use the `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET` values in `.env.local` to sign in.

## Why `npm install` comes first

`prisma` and `tsx` are installed as project dependencies. Running `npm run db:push` before `npm install` produces errors such as `prisma is not recognized` / `prisma: not found`.

## Database reset during development

SQLite stores the development database at `prisma/dev.db` because the Prisma URL is `file:./dev.db`.

To start with a fresh database, delete `prisma/dev.db`, then run:

```bash
npm run db:push
npm run db:seed
```

## Editing content

The admin dashboard is intentionally data-driven. Projects, skills, experience, services, testimonials, site settings, and contact messages are stored in Prisma, so the public site reads from the database instead of hard-coded content.

For production, move SQLite to PostgreSQL, set a long random `SESSION_SECRET`, and put the site behind HTTPS.


## Environment files
Prisma CLI commands (`db:generate`, `db:push`, and `db:seed`) read `.env`. Next.js can read `.env.local` for the app, but `.env.local` is not automatically loaded by the Prisma CLI. This project therefore includes a `.env` file for local Prisma commands. Update `DATABASE_URL`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` there before seeding.


## Resume data

This version is preloaded with the content from Patricio Manayan Jr.'s supplied resume: professional experience, technical skills, core strengths, education, project links, and contact details. The supplied PDF is also copied to `public/resume.pdf` and linked from the site. Character references are intentionally not published on the public portfolio.

After replacing the starter project, rebuild the database with:

```powershell
npm run db:generate
npx prisma db push --force-reset
npm run db:seed
```

The `--force-reset` step is important when upgrading an existing local SQLite database so the new Education and contact fields are created and the resume seed content replaces the previous demo content.


## Image and logo uploads

The admin dashboard now supports direct image uploads:

- **Projects:** open `/admin`, choose a project image from your computer, preview it, then save. You can replace or remove it later.
- **Brand logo:** under **Site settings**, upload a logo. The navigation uses the uploaded logo automatically and falls back to the text name when no logo is set.
- Accepted formats: **JPG, PNG, WebP, AVIF**
- Maximum file size: **5 MB**
- Uploaded files are stored under `public/uploads/projects` and `public/uploads/branding`.

If you are updating an older copy of this project, run:

```bash
npm install
npm run db:generate
npm run db:push
npm run dev
```

`db:push` adds the new `logoUrl` field to the local database without requiring a database reset.

### Production note

The built-in uploader writes files to the local `public/uploads` directory, which is ideal for local development and traditional/self-hosted Node deployments. If you later deploy to a serverless platform with ephemeral storage, replace the storage helper in `lib/uploads.ts` with Cloudflare R2, AWS S3, or another persistent object-storage provider. The database can continue storing the resulting image URL.
