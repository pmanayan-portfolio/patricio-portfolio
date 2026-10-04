import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/motion";
import { PortfolioFilter } from "@/components/portfolio-filter";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ featured: "desc" }, { sortOrder: "asc" }] });
  return <main className="pt-28"><section className="section-space pb-14"><div className="container-shell"><Reveal><p className="eyebrow mb-4">Portfolio</p><h1 className="max-w-4xl text-6xl font-medium tracking-[-.06em] md:text-8xl">Selected <span className="gold-text">work.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/50">A collection of interfaces, products, and systems built with a balance of design detail and engineering discipline.</p></Reveal></div></section><section className="pb-24"><div className="container-shell"><PortfolioFilter projects={projects}/></div></section></main>
}
