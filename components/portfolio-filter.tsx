"use client";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";

type Project = { slug: string; title: string; description: string; tech: string; category: string; imageUrl: string | null; };
export function PortfolioFilter({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => category === "All" ? projects : projects.filter(p => p.category === category), [projects, category]);
  return <div>
    <div className="mb-9 flex flex-wrap gap-2">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={`rounded-full border px-4 py-2 text-xs transition ${category === c ? "border-white bg-white text-black" : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"}`}>{c}</button>)}</div>
    <div className="grid gap-6 md:grid-cols-2">{filtered.map((p, i) => <ProjectCard key={p.slug} project={p} index={i}/>)}</div>
  </div>;
}
