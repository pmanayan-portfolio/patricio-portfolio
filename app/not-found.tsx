import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center px-6"><div className="text-center"><p className="eyebrow mb-4">404</p><h1 className="text-6xl tracking-tight">Page not found.</h1><Link href="/" className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[.16em] text-black">Back home</Link></div></main>;
}
