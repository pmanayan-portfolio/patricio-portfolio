import { login } from "@/lib/actions";
import Link from "next/link";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return <main className="min-h-screen px-5 pt-32"><div className="mx-auto max-w-md"><Link href="/" className="text-xs uppercase tracking-[.16em] text-white/35 hover:text-white">← Back home</Link><div className="glass mt-8 rounded-[30px] p-8"><p className="eyebrow mb-4">Admin</p><h1 className="text-3xl tracking-tight">Sign in to edit the site.</h1>{params.error && <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-200">Invalid admin credentials.</div>}<form action={login} className="mt-7 space-y-4"><input required type="email" name="email" placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/25"/><input required type="password" name="password" placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/25"/><button className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black">Continue</button></form></div></div></main>
}
