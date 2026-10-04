import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/motion";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  return (
    <main className="pt-28">
      <section className="section-space pb-14">
        <div className="container-shell">
          <Link
            href="/portfolio"
            className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] text-white/40 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to work
          </Link>
          <Reveal>
            <p className="eyebrow mb-4">{project.category}</p>
            <h1 className="max-w-5xl text-6xl font-medium tracking-[-.06em] md:text-8xl">
              {project.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/50">
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-shell">
          <Reveal>
            <div className="relative aspect-[16/8] overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-[#221d11] via-[#10100e] to-[#050505]">
              {project.imageUrl ? (
                <>
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} project preview`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 grid-fade" />
                  <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#d7bd7d]/10 blur-[100px]" />
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-shell grid gap-12 md:grid-cols-[1fr_.55fr]">
          <Reveal>
            <p className="eyebrow mb-4">Overview</p>
            <p className="max-w-2xl text-base leading-8 text-white/55">
              {project.details || project.description}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-[.16em] text-white/30">
                  Technology
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.split(",").map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/55"
                    >
                      {technology.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-5 py-3 text-xs font-semibold text-black"
                  >
                    Live site <ArrowUpRight className="inline" size={13} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-5 py-3 text-xs text-white/65"
                  >
                    GitHub <ArrowUpRight className="inline" size={13} />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
