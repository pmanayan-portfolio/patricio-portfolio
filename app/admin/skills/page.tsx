import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cleanCategory, groupSkills, skillCategoryHref } from "@/lib/skills";
import { SkillForm, DeleteSkillForm, RenameCategoryForm } from "@/components/skill-forms";

export const dynamic = "force-dynamic";

export default async function SkillsPage({ searchParams }: { searchParams: Promise<{ category?: string; notice?: string }> }) {
  const session = await getSession();
  if (!session?.email || session.role !== "admin") redirect("/login");
  const { category, notice } = await searchParams;
  const skills = await prisma.skill.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
  const groups = groupSkills(skills);
  const categories = groups.map(group => group.category);
  const selected = groups.find(group => group.category.toLowerCase() === cleanCategory(category ?? "").toLowerCase());
  const nextOrder = selected ? Math.min(2147483647, Math.max(0, ...selected.skills.map(skill => skill.sortOrder)) + 1) : 0;

  return <main className="min-h-screen pb-24 pt-28">
    <div className="container-shell">
      <Link href="/admin" className="text-xs uppercase tracking-widest text-white/50 hover:text-white">← Admin dashboard</Link>
      <div className="my-8 flex flex-wrap items-end justify-between gap-5">
        <div><p className="eyebrow mb-3">Content studio / Toolkit</p><h1 className="text-4xl tracking-tight md:text-5xl">Skills dashboard</h1><p className="mt-4 max-w-xl text-sm leading-7 text-white/50">A dedicated workspace for every skill category. Keep your toolkit organized as your experience grows.</p></div>
        <Link href="/#skills" className="rounded-full border border-white/15 px-5 py-3 text-sm text-white/70">View public toolkit ↗</Link>
      </div>
      {notice === "saved" && <p role="status" className="mb-6 rounded-xl border border-[#d7bd7d]/25 bg-[#d7bd7d]/5 p-4 text-sm text-[#d7bd7d]">Skill saved. Your public toolkit has been updated.</p>}
      {notice === "deleted" && <p role="status" className="mb-6 rounded-xl border border-[#d7bd7d]/25 bg-[#d7bd7d]/5 p-4 text-sm text-[#d7bd7d]">Skill deleted. Your public toolkit has been updated.</p>}
      {notice === "renamed" && <p role="status" className="mb-6 rounded-xl border border-[#d7bd7d]/25 bg-[#d7bd7d]/5 p-4 text-sm text-[#d7bd7d]">Category renamed. Your public toolkit has been updated.</p>}
      <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="glass rounded-3xl p-5 lg:sticky lg:top-24">
          <p className="mb-4 text-xs uppercase tracking-widest text-white/35">Categories</p>
          <nav aria-label="Skill categories" className="space-y-2">
            <Link href="/admin/skills" aria-current={!category ? "page" : undefined} className={`block rounded-xl px-4 py-3 text-sm ${!category ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5"}`}>Overview <span className="float-right">{skills.length}</span></Link>
            {groups.map(group => <Link key={group.category} href={skillCategoryHref(group.category)} aria-current={selected === group ? "page" : undefined} className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm ${selected === group ? "bg-[#d7bd7d]/10 text-[#d7bd7d]" : "text-white/55 hover:bg-white/5"}`}><span className="min-w-0 break-words">{group.category}</span><span>{group.skills.length}</span></Link>)}
          </nav>
          <Link href="/admin/skills#add-skill" className="mt-5 block border-t border-white/10 pt-5 text-sm text-[#d7bd7d]">+ Add a skill or category</Link>
        </aside>
        <div className="min-w-0 space-y-6">
          {selected ? <>
            <section className="glass rounded-3xl p-6 md:p-8">
              <p className="eyebrow mb-3">Category workspace</p>
              <h2 className="break-words text-3xl tracking-tight">{selected.category}</h2>
              <p className="mt-3 text-sm text-white/45">{selected.skills.length} skills · Edit, move, or reorder the skills in this category.</p>
              <details className="mt-6 border-t border-white/10 pt-4"><summary className="cursor-pointer text-sm text-white/65">Rename category</summary><RenameCategoryForm key={selected.category} category={selected.category} /></details>
            </section>
            <section aria-label={`${selected.category} skills`} className="space-y-3">
              {selected.skills.map(skill => <details key={`${skill.id}-${skill.name}-${skill.category}-${skill.sortOrder}`} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer text-sm"><span className="ml-2 break-words font-medium">{skill.name}</span><span className="ml-3 text-xs text-white/35">Order {skill.sortOrder} · Edit</span></summary>
                <div className="mt-5"><SkillForm skill={skill} category={selected.category} categories={categories} /><DeleteSkillForm skill={skill} /></div>
              </details>)}
            </section>
          </> : <section className="glass rounded-3xl p-6 md:p-8">
            <p className="eyebrow mb-3">Toolkit overview</p><h2 className="text-2xl tracking-tight">Choose a category to manage</h2>
            {category && <p role="status" className="mt-3 text-sm text-white/50">This category is empty or has been renamed. Choose another category below.</p>}
            {groups.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2">{groups.map(group => <Link key={group.category} href={skillCategoryHref(group.category)} className="rounded-2xl border border-white/10 p-5 transition hover:border-[#d7bd7d]/50"><h3 className="break-words text-lg">{group.category}</h3><p className="mt-2 text-xs text-[#d7bd7d]">{group.skills.length} skills · Manage →</p><p className="mt-4 text-xs leading-6 text-white/40">{group.skills.slice(0, 3).map(skill => skill.name).join(" · ")}{group.skills.length > 3 ? " …" : ""}</p></Link>)}</div> : <p className="mt-4 text-sm text-white/50">Start by adding your first skill and category below.</p>}
          </section>}
          <section id="add-skill" className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-xl">{selected ? `Add a skill to ${selected.category}` : "Add a skill or start a new category"}</h2>
            <p className="mb-6 mt-3 text-sm leading-7 text-white/45">Choose an existing category or type a new one. Categories appear on your homepage when they contain skills.</p>
            <SkillForm key={selected?.category ?? "new"} category={selected?.category ?? ""} categories={categories} nextOrder={nextOrder} />
          </section>
        </div>
      </div>
    </div>
  </main>;
}
