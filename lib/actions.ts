"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, clearSession, requireAdmin } from "@/lib/auth";
import { deleteUploadedImage, saveUploadedImage } from "@/lib/uploads";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    redirect("/login?error=1");
  }
  await createSession(email);
  redirect("/admin");
}

export async function logout() {
  await clearSession();
  redirect("/");
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();

  const currentLogoUrl = String(formData.get("logoFileCurrent") || "") || null;
  const removeLogo = formData.get("logoFileRemove") === "1";
  const uploadedLogoUrl = await saveUploadedImage(formData.get("logoFile"), "branding");
  const logoUrl = uploadedLogoUrl ?? (removeLogo ? null : currentLogoUrl);

  try {
    await prisma.siteSettings.update({
      where: { id: 1 },
      data: {
        name: String(formData.get("name") || ""),
        role: String(formData.get("role") || ""),
        tagline: String(formData.get("tagline") || ""),
        bio: String(formData.get("bio") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || "") || null,
        location: String(formData.get("location") || ""),
        address: String(formData.get("address") || "") || null,
        resumeUrl: String(formData.get("resumeUrl") || "") || null,
        githubUrl: String(formData.get("githubUrl") || "") || null,
        linkedinUrl: String(formData.get("linkedinUrl") || "") || null,
        twitterUrl: String(formData.get("twitterUrl") || "") || null,
        statProjects: String(formData.get("statProjects") || ""),
        statCollaborations: String(formData.get("statCollaborations") || ""),
        statYears: String(formData.get("statYears") || ""),
        logoUrl,
      },
    });
  } catch (error) {
    if (uploadedLogoUrl) await deleteUploadedImage(uploadedLogoUrl);
    throw error;
  }

  if ((uploadedLogoUrl || removeLogo) && currentLogoUrl && currentLogoUrl !== logoUrl) {
    await deleteUploadedImage(currentLogoUrl);
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin");
}

export async function saveProject(formData: FormData) {
  await requireAdmin();

  const id = Number(formData.get("id") || 0);
  const currentImageUrl = String(formData.get("imageFileCurrent") || "") || null;
  const removeImage = formData.get("imageFileRemove") === "1";
  const uploadedImageUrl = await saveUploadedImage(formData.get("imageFile"), "projects");
  const imageUrl = uploadedImageUrl ?? (removeImage ? null : currentImageUrl);

  const data = {
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    description: String(formData.get("description") || ""),
    details: String(formData.get("details") || "") || null,
    imageUrl,
    tech: String(formData.get("tech") || ""),
    category: String(formData.get("category") || ""),
    liveUrl: String(formData.get("liveUrl") || "") || null,
    githubUrl: String(formData.get("githubUrl") || "") || null,
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  try {
    if (id) {
      await prisma.project.update({ where: { id }, data });
    } else {
      await prisma.project.create({ data });
    }
  } catch (error) {
    if (uploadedImageUrl) await deleteUploadedImage(uploadedImageUrl);
    throw error;
  }

  if ((uploadedImageUrl || removeImage) && currentImageUrl && currentImageUrl !== imageUrl) {
    await deleteUploadedImage(currentImageUrl);
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin");
  if (data.slug) revalidatePath(`/portfolio/${data.slug}`);
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));

  const project = await prisma.project.findUnique({
    where: { id },
    select: { imageUrl: true },
  });

  await prisma.project.delete({ where: { id } });

  if (project?.imageUrl) await deleteUploadedImage(project.imageUrl);

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin");
}

export async function saveMessage(formData: FormData) {
  await prisma.message.create({
    data: {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      project: String(formData.get("project") || "") || null,
      budget: String(formData.get("budget") || "") || null,
      message: String(formData.get("message") || ""),
    },
  });
  revalidatePath("/admin");
}

export async function markMessage(formData: FormData) {
  await requireAdmin();
  await prisma.message.update({
    where: { id: Number(formData.get("id")) },
    data: { status: String(formData.get("status") || "read") },
  });
  revalidatePath("/admin");
}

export async function saveSkill(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || ""),
    icon: String(formData.get("icon") || "") || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.skill.update({ where: { id }, data });
  else await prisma.skill.create({ data });
  revalidatePath("/");
  revalidatePath("/admin");
}
export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  await prisma.skill.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveExperience(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    company: String(formData.get("company") || ""),
    role: String(formData.get("role") || ""),
    startDate: String(formData.get("startDate") || ""),
    endDate: String(formData.get("endDate") || "") || null,
    location: String(formData.get("location") || "") || null,
    summary: String(formData.get("summary") || ""),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.experience.update({ where: { id }, data });
  else await prisma.experience.create({ data });
  revalidatePath("/");
  revalidatePath("/admin");
}
export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  await prisma.experience.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveEducation(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    institution: String(formData.get("institution") || ""),
    degree: String(formData.get("degree") || ""),
    startDate: String(formData.get("startDate") || ""),
    endDate: String(formData.get("endDate") || "") || null,
    location: String(formData.get("location") || "") || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.education.update({ where: { id }, data });
  else await prisma.education.create({ data });
  revalidatePath("/");
  revalidatePath("/admin");
}
export async function deleteEducation(formData: FormData) {
  await requireAdmin();
  await prisma.education.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveService(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    title: String(formData.get("title") || ""),
    summary: String(formData.get("summary") || ""),
    icon: String(formData.get("icon") || "") || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  revalidatePath("/");
  revalidatePath("/admin");
}
export async function deleteService(formData: FormData) {
  await requireAdmin();
  await prisma.service.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const data = {
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    quote: String(formData.get("quote") || ""),
    avatarUrl: String(formData.get("avatarUrl") || "") || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidatePath("/");
  revalidatePath("/admin");
}
export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/");
  revalidatePath("/admin");
}
