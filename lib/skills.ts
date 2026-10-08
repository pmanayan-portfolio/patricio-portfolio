export type SkillItem = {
  id: number;
  name: string;
  category: string;
  icon: string | null;
  sortOrder: number;
};

export function cleanCategory(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

// Use the same grouping rules on the homepage and in the admin dashboard.
export function groupSkills<T extends SkillItem>(skills: T[]) {
  const groups = new Map<string, { category: string; skills: T[] }>();
  for (const skill of skills) {
    const category = cleanCategory(skill.category) || "Uncategorized";
    const key = category.toLowerCase();
    const group = groups.get(key) ?? { category, skills: [] };
    group.skills.push(skill);
    groups.set(key, group);
  }
  return Array.from(groups.values()).map(group => ({
    ...group,
    skills: [...group.skills].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
  }));
}

export function skillCategoryHref(category: string): string {
  return `/admin/skills?category=${encodeURIComponent(category)}`;
}
