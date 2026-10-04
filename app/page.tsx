import Link from "next/link";
import { ArrowDown, ArrowUpRight, Code2, Globe2, Gauge, Layers3 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Reveal, ScaleIn } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";

export const dynamic = "force-dynamic";

const defaultSettings = {
  id: 1,
  name: "Patricio Manayan Jr.",
  role: "Web Developer | Front-End Developer",
  tagline: "Building responsive, polished websites with strong front-end implementation, WordPress expertise, and careful QA.",
  bio: "Web Developer and Front-End Developer with professional experience building and maintaining responsive websites using WordPress, Divi, Elementor, HTML, CSS, JavaScript, jQuery, PHP, and MySQL.",
  email: "all.pmanayan@gmail.com",
  location: "Argao, Cebu, Philippines",
  resumeUrl: "/resume.pdf",
  githubUrl: "https://patshu256.github.io/my-website/",
  linkedinUrl: null,
  twitterUrl: null,
  statProjects: "6",
  statCollaborations: "Multiple",
  statYears: "9+",
  phone: "0949-870-5440",
  address: "M. Revillas St., Langtad, Argao, Cebu",
};

export default async function Home() {
  const [settings, projects, skills, services, experience, testimonials, education] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { sortOrder: "asc" }] }),
    prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.education.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const s = settings ?? defaultSettings;
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 size={20} />,
    Globe2: <Globe2 size={20} />,
    Gauge: <Gauge size={20} />,
    Layers3: <Layers3 size={20} />,
  };

  const statItems = [
    [s.statProjects, "Projects"],
    [s.statCollaborations, "Client work"],
    [s.statYears, "Years"],
  ] as const;

  const skillCategories = ["Frontend", "WordPress", "Web & QA", "Tools & Strengths"];

  return (
    <main>
      <section className="relative flex min-h-screen items-end overflow-hidden pb-20 pt-32">
        <div className="absolute inset-0 -z-10 grid-fade" />
        <div className="absolute -right-24 top-20 h-[460px] w-[460px] rounded-full bg-[#d7bd7d]/10 blur-[120px]" />
        <div className="container-shell w-full">
          <div className="max-w-5xl">
            <Reveal>
              <p className="eyebrow mb-6">{s.role}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-[clamp(4rem,11vw,9.8rem)] font-medium leading-[.82] tracking-[-.065em]">
                Digital
                <br />
                <span className="gold-text">craft.</span>
              </h1>
            </Reveal>
            <div className="mt-9 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <Reveal delay={0.15}>
                <p className="max-w-xl text-lg leading-8 text-white/50">{s.tagline}</p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="flex gap-3">
                  <Link
                    href="/portfolio"
                    className="cst-black-text rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[.16em] text-black transition hover:scale-105"
                  >
                    View work
                  </Link>
                  {/* {s.resumeUrl && (
                    <a
                      href={s.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[.16em] text-white/75 transition hover:border-white/30 hover:text-white"
                    >
                      Resume
                    </a>
                  )} */}
                  <a
                    href="#contact"
                    className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[.16em] text-white/75 transition hover:border-white/30 hover:text-white"
                  >
                    Start a project
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.25em] text-white/35 md:flex"
        >
          Scroll <ArrowDown size={12} />
        </a>
      </section>

      <section id="about" className="section-space">
        <div className="container-shell grid gap-14 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <Reveal>
            <div className="glass relative aspect-[4/5] overflow-hidden rounded-[34px] p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(215,189,125,.18),transparent_38%)]" />
              <div className="absolute inset-x-8 bottom-8 border-t border-white/10 pt-4">
                <div className="flex justify-between text-xs uppercase tracking-[.16em] text-white/35">
                  <span>{s.location}</span>
                  <span>Available worldwide</span>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/20 shadow-[0_0_120px_rgba(215,189,125,.12)]" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow mb-5">01 — About</p>
              <h2 className="max-w-2xl text-4xl font-medium tracking-[-.04em] md:text-6xl">
                I turn complex ideas into <span className="gold-text">simple experiences.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/55">{s.bio}</p>
            </Reveal>
            <div className="mt-10 grid grid-cols-3 gap-4 border-y border-white/10 py-7">
              {statItems.map(([value, label], i) => (
                <Reveal key={label} delay={0.12 + i * 0.05}>
                  <div>
                    <div className="text-3xl font-medium">{value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[.15em] text-white/35">{label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-white/5">
        <div className="container-shell">
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="eyebrow mb-4">02 — Expertise</p>
                <h2 className="text-4xl tracking-[-.04em] md:text-5xl">Built for the whole product.</h2>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, i) => (
              <ScaleIn key={service.id} delay={i * 0.06}>
                <div className="glass group rounded-[26px] p-7 transition duration-500 hover:-translate-y-1 hover:border-white/20">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-[#d7bd7d]">
                      {iconMap[service.icon || "Code2"] ?? <Code2 size={20} />}
                    </span>
                    <span className="text-xs text-white/25">0{i + 1}</span>
                  </div>
                  <h3 className="text-2xl">{service.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/50">{service.summary}</p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="eyebrow mb-4">03 — Selected work</p>
                <h2 className="text-4xl tracking-[-.04em] md:text-5xl">A few things I’ve shipped.</h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden items-center gap-2 text-sm text-white/55 transition hover:text-white md:flex"
              >
                All projects <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section-space border-y border-white/5">
        <div className="container-shell grid gap-14 md:grid-cols-[.7fr_1.3fr]">
          <Reveal>
            <div>
              <p className="eyebrow mb-4">04 — Experience</p>
              <h2 className="text-4xl tracking-[-.04em] md:text-5xl">A timeline of building, learning, shipping.</h2>
            </div>
          </Reveal>
          <div className="relative border-l border-white/10 pl-7">
            {experience.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <div className="relative pb-11 last:pb-0">
                  <span className="absolute -left-[32px] top-1 h-2 w-2 rounded-full bg-[#d7bd7d] shadow-[0_0_20px_rgba(215,189,125,.5)]" />
                  <div className="flex flex-wrap justify-between gap-3 text-xs uppercase tracking-[.15em] text-white/35">
                    <span>
                      {item.startDate} — {item.endDate || "Present"}
                    </span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="mt-3 text-xl">{item.role}</h3>
                  <p className="mt-1 text-sm text-[#d7bd7d]">{item.company}</p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">{item.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-white/5">
        <div className="container-shell grid gap-12 md:grid-cols-[.7fr_1.3fr]">
          <Reveal>
            <div>
              <p className="eyebrow mb-4">05 — Education</p>
              <h2 className="text-4xl tracking-[-.04em] md:text-5xl">Grounded in information and communication technology.</h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {education.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <div className="glass rounded-[24px] p-6">
                  <div className="flex flex-wrap justify-between gap-3 text-xs uppercase tracking-[.15em] text-white/35">
                    <span>{item.startDate} — {item.endDate || "Present"}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="mt-3 text-xl">{item.degree}</h3>
                  <p className="mt-1 text-sm text-[#d7bd7d]">{item.institution}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <Reveal>
            <div className="mb-10">
              <p className="eyebrow mb-4">06 — Toolkit</p>
              <h2 className="text-4xl tracking-[-.04em] md:text-5xl">A stack that disappears behind the product.</h2>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category) => (
              <Reveal key={category}>
                <div className="glass rounded-[22px] p-5">
                  <div className="text-xs uppercase tracking-[.16em] text-white/35">{category}</div>
                  <div className="mt-5 space-y-3">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between border-b border-white/5 pb-3 text-sm"
                        >
                          <span>{skill.name}</span>
                          <span className="text-white/20">↗</span>
                        </div>
                      ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
      <section className="section-space border-y border-white/5">
        <div className="container-shell">
          <Reveal>
            <div className="mb-10">
              <p className="eyebrow mb-4">07 — Words from collaborators</p>
              <h2 className="text-4xl tracking-[-.04em] md:text-5xl">Good work should feel good to build.</h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.id} delay={i * 0.08}>
                <blockquote className="glass rounded-[28px] p-7">
                  <div className="text-2xl tracking-tight text-white/90">“{testimonial.quote}”</div>
                  <footer className="mt-8 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xs">
                      {testimonial.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm">{testimonial.name}</div>
                      <div className="text-xs text-white/35">{testimonial.role}</div>
                    </div>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      <section id="contact" className="section-space">
        <div className="container-shell">
          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#17150f] to-[#0b0b0a] p-7 md:p-12">
            <div className="grid gap-12 md:grid-cols-[1fr_.8fr] md:items-end">
              <Reveal>
                <p className="eyebrow mb-4">08 — Contact</p>
                <h2 className="max-w-2xl text-5xl tracking-[-.05em] md:text-7xl">
                  Have something <span className="gold-text">worth building?</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/50">
                  For website development, WordPress work, responsive front-end implementation, QA, or performance improvements, get in touch by email or phone.
                </p>
                <div className="mt-6 space-y-2 text-sm text-white/45">
                  <a href={`mailto:${s.email}`} className="block hover:text-white">{s.email}</a>
                  {s.phone && <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} className="block hover:text-white">{s.phone}</a>}
                  <span className="block">{s.location}</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <form action="/api/contact" method="post" className="space-y-3">
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-white/25"
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-white/25"
                  />
                  <input
                    name="project"
                    placeholder="Project type"
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-white/25"
                  />
                  <textarea
                    name="message"
                    required
                    placeholder="A little about the project"
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-white/25"
                  />
                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#f4e7bd]">
                    Send inquiry <ArrowUpRight size={15} />
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8">
        <div className="container-shell flex flex-col justify-between gap-3 text-xs text-white/35 md:flex-row">
          <span>
            © {new Date().getFullYear()} {s.name}. Built with intention.
          </span>
          <div className="flex gap-5">
            <a href={s.githubUrl || "#"}>GitHub</a>
            <a href={s.linkedinUrl || "#"}>LinkedIn</a>
            {s.resumeUrl && <a href={s.resumeUrl}>Resume</a>}
            <a href={s.email ? `mailto:${s.email}` : "#"}>Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
