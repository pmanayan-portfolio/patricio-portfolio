import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_session";
const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "development-secret-change-me");

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.email || session.role !== "admin") throw new Error("Unauthorized");
  return session;
}
