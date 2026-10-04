import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.formData();
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  if (!name || !email || !message) return NextResponse.redirect(new URL("/?error=contact#contact", request.url), 303);
  await prisma.message.create({ data: { name, email, project: String(data.get("project") || "") || null, message } });
  return NextResponse.redirect(new URL("/?sent=1#contact", request.url), 303);
}
