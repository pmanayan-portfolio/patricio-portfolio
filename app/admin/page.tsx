import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import {
  logout,
  saveExperience,
  saveProject,
  saveService,
  saveSettings,
  saveSkill,
  saveTestimonial,
  saveEducation,
  deleteProject,
  deleteExperience,
  deleteService,
  deleteSkill,
  deleteTestimonial,
  deleteEducation,
  markMessage,
} from "@/lib/actions";
import { ImageUpload } from "@/components/image-upload";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none placeholder:text-white/20 focus:border-white/25";
const area = input + " min-h-24 resize-y";

function Field({
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      className={input}
      type={type}
      name={name}
      defaultValue={defaultValue ?? ""}
      placeholder={placeholder}
    />
  );
}

function LabeledField({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`space-y-2 text-xs text-white/35 ${className}`}>
      <span>{label}</span>
      <Field
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </label>
  );
}

export default async function AdminPage() {
  if (!(await getSession())) redirect("/login");

  const [settings, projects, skills, experience, services, testimonials, messages, education] =
    await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: 1 } }),
      prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.message.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.education.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

  return (
    <main className="min-h-screen pb-20 pt-28">
      <div className="container-shell">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="eyebrow">Content studio</p>
            <h1 className="mt-2 text-4xl tracking-tight">Admin dashboard</h1>
            <p className="mt-2 text-sm text-white/40">
              Edit the content powering your public portfolio.
            </p>
          </div>
          <form action={logout}>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[.16em] text-white/55">
              Log out
            </button>
          </form>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-[26px] p-6">
            <h2 className="text-lg">Site settings</h2>
            <form
              action={saveSettings}
              className="mt-5 grid gap-3 md:grid-cols-2"
            >
              <ImageUpload
                name="logoFile"
                label="Brand logo"
                currentUrl={settings?.logoUrl}
                description="Shown in the navigation. Transparent PNG or WebP works best. Your name remains the fallback when no logo is uploaded."
                className="md:col-span-2"
              />

              {[
                ["name", settings?.name],
                ["role", settings?.role],
                ["email", settings?.email],
                ["phone", settings?.phone],
                ["location", settings?.location],
                ["address", settings?.address],
                ["resumeUrl", settings?.resumeUrl],
                ["githubUrl", settings?.githubUrl],
                ["linkedinUrl", settings?.linkedinUrl],
                ["twitterUrl", settings?.twitterUrl],
                ["statProjects", settings?.statProjects],
                ["statCollaborations", settings?.statCollaborations],
                ["statYears", settings?.statYears],
              ].map(([name, value]) => (
                <label key={name} className="space-y-2 text-xs text-white/35">
                  <span>{name}</span>
                  <Field name={String(name)} defaultValue={value as string} />
                </label>
              ))}

              <label className="space-y-2 text-xs text-white/35 md:col-span-2">
                <span>tagline</span>
                <input className={input} name="tagline" defaultValue={settings?.tagline} />
              </label>

              <label className="space-y-2 text-xs text-white/35 md:col-span-2">
                <span>bio</span>
                <textarea className={area} name="bio" defaultValue={settings?.bio} />
              </label>

              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
                Save settings
              </button>
            </form>
          </div>

          <div className="glass rounded-[26px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Projects</h2>
              <span className="text-xs text-white/30">{projects.length} total</span>
            </div>

            <div className="mt-5 space-y-5">
              {projects.map((project) => (
                <form
                  key={project.id}
                  action={saveProject}
                  className="rounded-2xl border border-white/10 p-4"
                >
                  <input type="hidden" name="id" value={project.id} />

                  <ImageUpload
                    name="imageFile"
                    label="Project image"
                    currentUrl={project.imageUrl}
                    description="Upload the image directly instead of pasting an image link."
                    className="mb-4"
                  />

                  <div className="grid gap-3 md:grid-cols-2">
                    <LabeledField label="Title" name="title" defaultValue={project.title} />
                    <LabeledField label="Slug" name="slug" defaultValue={project.slug} />
                    <LabeledField
                      label="Category"
                      name="category"
                      defaultValue={project.category}
                    />
                    <LabeledField label="Technology" name="tech" defaultValue={project.tech} />
                    <LabeledField
                      label="Live URL"
                      name="liveUrl"
                      defaultValue={project.liveUrl}
                    />
                    <LabeledField
                      label="GitHub URL"
                      name="githubUrl"
                      defaultValue={project.githubUrl}
                    />
                    <LabeledField
                      label="Sort order"
                      name="sortOrder"
                      type="number"
                      defaultValue={project.sortOrder}
                    />

                    <label className="space-y-2 text-xs text-white/35 md:col-span-2">
                      <span>Description</span>
                      <textarea
                        className={area}
                        name="description"
                        defaultValue={project.description}
                      />
                    </label>

                    <label className="space-y-2 text-xs text-white/35 md:col-span-2">
                      <span>Project details</span>
                      <textarea
                        className={area}
                        name="details"
                        defaultValue={project.details || ""}
                      />
                    </label>

                    <label className="flex items-center gap-2 text-xs text-white/45">
                      <input type="checkbox" name="featured" defaultChecked={project.featured} />
                      Featured
                    </label>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black">
                      Save
                    </button>
                    <button
                      formAction={deleteProject}
                      className="rounded-xl border border-red-300/15 px-4 py-2 text-xs text-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}

              <form
                action={saveProject}
                className="rounded-2xl border border-dashed border-white/10 p-4"
              >
                <h3 className="text-sm text-white/70">Add project</h3>

                <ImageUpload
                  name="imageFile"
                  label="Project image"
                  description="Choose an image from your computer. You can replace or remove it later."
                  className="mt-4"
                />

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <Field name="title" placeholder="Title" />
                  <Field name="slug" placeholder="slug" />
                  <Field name="category" placeholder="Category" />
                  <Field name="tech" placeholder="Next.js, TypeScript" />
                  <Field name="liveUrl" placeholder="Live URL" />
                  <Field name="githubUrl" placeholder="GitHub URL" />
                  <Field name="sortOrder" type="number" defaultValue={99} />
                  <textarea
                    className={area + " md:col-span-2"}
                    name="description"
                    placeholder="Description"
                  />
                  <textarea
                    className={area + " md:col-span-2"}
                    name="details"
                    placeholder="Project details"
                  />
                  <label className="flex items-center gap-2 text-xs text-white/45">
                    <input type="checkbox" name="featured" /> Featured
                  </label>
                </div>

                <button className="mt-3 rounded-xl border border-white/10 px-4 py-2 text-xs">
                  Add project
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <AdminCollection
            title="Skills"
            items={skills}
            newAction={saveSkill}
            deleteAction={deleteSkill}
            fields={[
              ["name", "name"],
              ["category", "category"],
              ["icon", "icon"],
              ["sortOrder", "sortOrder", "number"],
            ]}
          />
          <AdminCollection
            title="Services"
            items={services}
            newAction={saveService}
            deleteAction={deleteService}
            fields={[
              ["title", "title"],
              ["summary", "summary"],
              ["icon", "icon"],
              ["sortOrder", "sortOrder", "number"],
            ]}
          />
          <AdminCollection
            title="Experience"
            items={experience}
            newAction={saveExperience}
            deleteAction={deleteExperience}
            fields={[
              ["company", "company"],
              ["role", "role"],
              ["startDate", "startDate"],
              ["endDate", "endDate"],
              ["location", "location"],
              ["summary", "summary"],
              ["sortOrder", "sortOrder", "number"],
            ]}
          />
          <AdminCollection
            title="Education"
            items={education}
            newAction={saveEducation}
            deleteAction={deleteEducation}
            fields={[
              ["institution", "institution"],
              ["degree", "degree"],
              ["startDate", "startDate"],
              ["endDate", "endDate"],
              ["location", "location"],
              ["sortOrder", "sortOrder", "number"],
            ]}
          />
          <AdminCollection
            title="Testimonials"
            items={testimonials}
            newAction={saveTestimonial}
            deleteAction={deleteTestimonial}
            fields={[
              ["name", "name"],
              ["role", "role"],
              ["quote", "quote"],
              ["avatarUrl", "avatarUrl"],
              ["sortOrder", "sortOrder", "number"],
            ]}
          />
        </section>

        <section className="glass mt-6 rounded-[26px] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Messages</h2>
            <span className="text-xs text-white/30">
              {messages.filter((message) => message.status === "unread").length} unread
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="rounded-2xl border border-white/10 p-4">
                <div className="flex flex-col justify-between gap-3 md:flex-row">
                  <div>
                    <div className="text-sm">
                      {message.name} <span className="text-white/25">· {message.email}</span>
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/50">
                      {message.message}
                    </div>
                  </div>
                  <form action={markMessage}>
                    <input type="hidden" name="id" value={message.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={message.status === "unread" ? "read" : "unread"}
                    />
                    <button className="h-fit rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[.15em] text-white/45">
                      {message.status}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminCollection({
  title,
  items,
  newAction,
  deleteAction,
  fields,
}: any) {
  return (
    <div className="glass rounded-[26px] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">{title}</h2>
        <span className="text-xs text-white/30">{items.length} total</span>
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item: any) => (
          <form
            key={item.id}
            action={newAction}
            className="rounded-2xl border border-white/10 p-4"
          >
            <input type="hidden" name="id" value={item.id} />
            <div className="grid gap-3 md:grid-cols-2">
              {fields.map(([label, name, type]: any) => (
                <label key={name} className="space-y-2 text-xs text-white/35">
                  <span>{label}</span>
                  {name === "summary" || name === "quote" ? (
                    <textarea className={area} name={name} defaultValue={item[name] || ""} />
                  ) : (
                    <Field
                      name={name}
                      type={type || "text"}
                      defaultValue={item[name]}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black">
                Save
              </button>
              <button
                formAction={deleteAction}
                className="rounded-xl border border-red-300/15 px-4 py-2 text-xs text-red-200"
              >
                Delete
              </button>
            </div>
          </form>
        ))}

        <form
          action={newAction}
          className="rounded-2xl border border-dashed border-white/10 p-4"
        >
          <h3 className="text-sm text-white/70">
            Add {title.slice(0, -1).toLowerCase()}
          </h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {fields.map(([label, name, type]: any) =>
              name === "summary" || name === "quote" ? (
                <textarea
                  key={name}
                  className={area}
                  name={name}
                  placeholder={label}
                />
              ) : (
                <Field
                  key={name}
                  name={name}
                  type={type || "text"}
                  placeholder={label}
                />
              ),
            )}
          </div>
          <button className="mt-3 rounded-xl border border-white/10 px-4 py-2 text-xs">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
