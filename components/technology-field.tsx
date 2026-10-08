"use client";

import { useState } from "react";
import { parseTechnologies } from "@/lib/portfolio";

export function TechnologyField({ defaultValue = "" }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const technologies = parseTechnologies(value);
  return <label className="space-y-2 text-xs text-white/55 md:col-span-2">
    <span>Technologies</span>
    <textarea name="tech" value={value} onChange={event => setValue(event.target.value)} rows={3}
      placeholder="React, TypeScript, Vite, Tailwind CSS, Laravel, PHP, PostgreSQL"
      className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-white/30" />
    <span className="block text-white/40">Separate with commas or new lines. All technologies appear on the project card and detail page.</span>
    <span className="flex flex-wrap gap-2">{technologies.map(technology => <span key={technology} className="max-w-full break-words rounded-full border border-white/10 px-3 py-1 text-white/65">{technology}</span>)}</span>
  </label>;
}
