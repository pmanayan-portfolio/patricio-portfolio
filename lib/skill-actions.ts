"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cleanCategory, groupSkills, skillCategoryHref } from "@/lib/skills";

export type SkillActionState = { error?: string; success?: string };

function refreshSkills() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
}

export async function saveSkill(_state: SkillActionState, formData: FormData): Promise<SkillActionState> {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const name = String(formData.get("name") || "").trim();
  const requestedCategory = cleanCategory(String(formData.get("category") || ""));
  const sortOrder = Number(formData.get("sortOrder") || 0);
  if (!name || !requestedCategory) return { error: "Enter a skill name and category." };
  if (name.length > 120 || requestedCategory.length > 80) return { error: "Use up to 120 characters for the skill and 80 for its category." };
  if (!Number.isSafeInteger(id) || id < 0 || !Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 2147483647) return { error: "Use a valid skill and a non-negative whole number for display order." };
  let category = requestedCategory;
  try {
    const skills = await prisma.skill.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
    const group = groupSkills(skills).find(item => item.category.toLowerCase() === requestedCategory.toLowerCase());
    category = group?.category ?? requestedCategory;
    if (group?.skills.some(skill => skill.id !== id && skill.name.trim().toLowerCase() === name.toLowerCase())) return { error: "This skill already exists in that category." };
    const data = { name, category, sortOrder, icon: String(formData.get("icon") || "").trim() || null };
    if (id) await prisma.skill.update({ where: { id }, data });
    else await prisma.skill.create({ data });
  } catch {
    return { error: "The skill could not be saved. Please try again." };
  }
  refreshSkills();
  redirect(`${skillCategoryHref(category)}&notice=saved`);
}

export async function deleteSkill(_state: SkillActionState, formData: FormData): Promise<SkillActionState> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isSafeInteger(id) || id <= 0) return { error: "Choose a valid skill to delete." };
  let category = "";
  try {
    const skill = await prisma.skill.findUniqueOrThrow({ where: { id } });
    category = cleanCategory(skill.category) || "Uncategorized";
    await prisma.skill.delete({ where: { id } });
  } catch {
    return { error: "The skill could not be deleted. Please refresh and try again." };
  }
  refreshSkills();
  redirect(`${skillCategoryHref(category)}&notice=deleted`);
}

export async function renameSkillCategory(_state: SkillActionState, formData: FormData): Promise<SkillActionState> {
  await requireAdmin();
  const previous = cleanCategory(String(formData.get("previousCategory") || ""));
  const category = cleanCategory(String(formData.get("category") || ""));
  if (!category || category.length > 80) return { error: "Enter a category name of 1–80 characters." };
  try {
    const groups = groupSkills(await prisma.skill.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] }));
    const current = groups.find(group => group.category.toLowerCase() === previous.toLowerCase());
    if (!current) return { error: "This category no longer has skills. Refresh the page." };
    if (groups.some(group => group !== current && group.category.toLowerCase() === category.toLowerCase())) return { error: "That category already exists. Move individual skills to it instead." };
    await prisma.skill.updateMany({ where: { id: { in: current.skills.map(skill => skill.id) } }, data: { category } });
  } catch {
    return { error: "The category could not be renamed. Please try again." };
  }
  refreshSkills();
  redirect(`${skillCategoryHref(category)}&notice=renamed`);
}
