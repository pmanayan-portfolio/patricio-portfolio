"use client";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";

type Project = { slug: string; title: string; description: string; tech: string; category: string; imageUrl: string | null; };
export function PortfolioFilter({ projects }: { projects: Project[] }) {
  const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => projects.filter(project =>
    (category === null || project.category === category) &&
    `${project.title} ${project.description} ${project.tech} ${project.category}`.toLowerCase().includes(search.trim().toLowerCase())
  ), [projects, category, search]);
  const buttonClass = (active: boolean) => `rounded-full border px-4 py-2 text-xs transition ${active ? "border-white bg-white text-black" : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"}`;
  return <div>
    <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        <button type="button" aria-pressed={category === null} onClick={() => setCategory(null)} className={buttonClass(category === null)}>All projects</button>
        {categories.map(c => <button type="button" key={c} aria-pressed={category === c} onClick={() => setCategory(c)} className={buttonClass(category === c)}>{c}</button>)}
      </div>
      <label className="block lg:w-72 lg:shrink-0">
        <span className="sr-only">Search projects or technologies</span>
        <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search projects or technologies…" className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm outline-none focus:border-[#d7bd7d]/60" />
      </label>
    </div>
    <p aria-live="polite" className="mb-6 text-xs text-white/40">{filtered.length} {filtered.length === 1 ? "project" : "projects"}</p>
    {filtered.length ? <div className="grid gap-6 md:grid-cols-2">{filtered.map((p, i) => <ProjectCard key={p.slug} project={p} index={i}/>)}</div> : <div className="rounded-3xl border border-white/10 p-10 text-center"><p className="text-white/60">{projects.length ? "No projects match your search." : "Projects will appear here once added."}</p>{projects.length > 0 && <button type="button" className="mt-4 text-sm text-[#d7bd7d]" onClick={() => { setSearch(""); setCategory(null); }}>Clear filters</button>}</div>}
  </div>;
}
