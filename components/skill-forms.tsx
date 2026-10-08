"use client";

import { useActionState, useId, useState } from "react";
import { deleteSkill, renameSkillCategory, saveSkill, type SkillActionState } from "@/lib/skill-actions";
import type { SkillItem } from "@/lib/skills";

const inputClass = "mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-[#d7bd7d]/60";
const primaryClass = "rounded-xl bg-[#d7bd7d] px-5 py-3 text-sm font-semibold text-black disabled:opacity-50";
const initialState: SkillActionState = {};

function Feedback({ state }: { state: SkillActionState }) {
  return <>{state.error && <p role="alert" className="mt-4 text-sm text-red-200">{state.error}</p>}{state.success && <p role="status" className="mt-4 text-sm text-[#d7bd7d]">{state.success}</p>}</>;
}

export function SkillForm({ skill, category = "", categories, nextOrder = 0 }: { skill?: SkillItem; category?: string; categories: string[]; nextOrder?: number }) {
  const [state, action, pending] = useActionState(saveSkill, initialState);
  const listId = useId();
  return <form action={action}>
    {skill && <input type="hidden" name="id" value={skill.id} />}
    <input type="hidden" name="icon" value={skill?.icon ?? ""} />
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-xs text-white/60">Skill name
        <input name="name" required maxLength={120} defaultValue={skill?.name ?? ""} placeholder="e.g. Laravel" className={inputClass} />
      </label>
      <label className="text-xs text-white/60">Category
        <input name="category" required maxLength={80} list={listId} defaultValue={category} placeholder="Choose or type a category" className={inputClass} />
        <datalist id={listId}>{categories.map(item => <option key={item} value={item} />)}</datalist>
      </label>
      <label className="text-xs text-white/60">Display order
        <input name="sortOrder" type="number" min={0} max={2147483647} step={1} required defaultValue={skill?.sortOrder ?? nextOrder} className={inputClass} />
        <span className="mt-2 block text-white/40">Lower numbers appear first within this category.</span>
      </label>
    </div>
    <Feedback state={state} />
    <button disabled={pending} className={`${primaryClass} mt-5`}>{pending ? "Saving…" : skill ? "Save skill" : "Add skill"}</button>
  </form>;
}

export function DeleteSkillForm({ skill }: { skill: SkillItem }) {
  const [confirming, setConfirming] = useState(false);
  const [state, action, pending] = useActionState(deleteSkill, initialState);
  return <div className="mt-5 border-t border-white/10 pt-4">
    {!confirming ? <button type="button" onClick={() => setConfirming(true)} className="text-xs text-red-200/80">Delete skill</button> : <form action={action}>
      <input type="hidden" name="id" value={skill.id} />
      <p className="text-sm text-white/60">Delete “{skill.name}” from this category?</p>
      <div className="mt-3 flex gap-4"><button disabled={pending} className="text-sm text-red-200 disabled:opacity-50">{pending ? "Deleting…" : "Confirm delete"}</button><button disabled={pending} type="button" onClick={() => setConfirming(false)} className="text-sm text-white/50">Cancel</button></div>
      <Feedback state={state} />
    </form>}
  </div>;
}

export function RenameCategoryForm({ category }: { category: string }) {
  const [state, action, pending] = useActionState(renameSkillCategory, initialState);
  return <form action={action} className="mt-4">
    <input type="hidden" name="previousCategory" value={category} />
    <label className="text-xs text-white/60">Category name<input name="category" required maxLength={80} defaultValue={category} className={inputClass} /></label>
    <p className="mt-2 text-xs leading-6 text-white/40">Updates the category for every skill in this group and on your homepage.</p>
    <Feedback state={state} />
    <button disabled={pending} className={`${primaryClass} mt-4`}>{pending ? "Renaming…" : "Rename category"}</button>
  </form>;
}
