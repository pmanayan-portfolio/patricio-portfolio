import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Patricio Manayan Jr. — Web Developer | Front-End Developer",
  description: "Portfolio for Patricio Manayan Jr., Web Developer and Front-End Developer.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
    select: { name: true, logoUrl: true },
  });

  return (
    <html lang="en">
      <body>
        <Navbar brandName={settings?.name || "Patricio Manayan Jr."} logoUrl={settings?.logoUrl} />
        {children}
        <div className="film-grain" />
      </body>
    </html>
  );
}
