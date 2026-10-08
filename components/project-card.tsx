import Link from "next/link";
import { parseTechnologies } from "@/lib/portfolio";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";

type Project = { slug: string; title: string; description: string; tech: string; category: string; imageUrl: string | null; };

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <Reveal delay={Math.min(index, 3) * .08}>
    <Link href={`/portfolio/${project.slug}`} className="group block overflow-hidden rounded-[28px] border border-white/10 bg-white/[.025]">
      <div className="h-64 w-full relative aspect-[1.45/1] overflow-hidden bg-gradient-to-br from-[#211e16] via-[#11110f] to-[#050505]">
        {project.imageUrl ? <img src={project.imageUrl} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/> : <div className="absolute inset-0 grid-fade"><div className="absolute left-[15%] top-[18%] h-40 w-40 rounded-full bg-[#d7bd7d]/10 blur-3xl transition duration-700 group-hover:scale-150"/></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"/>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5"><div><p className="eyebrow mb-2">{project.category}</p><h3 className="text-xl font-medium tracking-tight">{project.title}</h3></div><span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/20 transition group-hover:bg-white group-hover:text-black"><ArrowUpRight size={18}/></span></div>
      </div>
      <div className="p-6"><p className="max-w-2xl text-sm leading-7 text-white/55">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{parseTechnologies(project.tech).map(t => <span key={t} className="max-w-full break-words rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50">{t.trim()}</span>)}</div></div>
    </Link>
  </Reveal>
}
