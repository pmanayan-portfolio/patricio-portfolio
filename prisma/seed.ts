import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // This seed mirrors the uploaded resume. It resets portfolio collections so the
  // starter project is guaranteed to show the resume data on a fresh setup.
  await prisma.$transaction([
    prisma.testimonial.deleteMany(),
    prisma.service.deleteMany(),
    prisma.education.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.project.deleteMany(),
  ]);

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      name: "Patricio Manayan Jr.",
      role: "Web Developer | Front-End Developer",
      tagline: "Building responsive, polished websites with strong front-end implementation, WordPress expertise, and careful QA.",
      bio: "Web Developer and Front-End Developer with professional experience building and maintaining responsive websites using WordPress, Divi, Elementor, HTML, CSS, JavaScript, jQuery, PHP, and MySQL. Experienced in reusable front-end components, responsive troubleshooting, accessibility, page speed, Core Web Vitals, QA, website customization, and client collaboration.",
      email: "all.pmanayan@gmail.com",
      phone: "0949-870-5440",
      location: "Argao, Cebu, Philippines",
      address: "M. Revillas St., Langtad, Argao, Cebu",
      resumeUrl: "/resume.pdf",
      githubUrl: "https://patshu256.github.io/my-website/",
      linkedinUrl: null,
      twitterUrl: null,
      statProjects: "6",
      statCollaborations: "Multiple",
      statYears: "9+",
    },
    create: {
      id: 1,
      name: "Patricio Manayan Jr.",
      role: "Web Developer | Front-End Developer",
      tagline: "Building responsive, polished websites with strong front-end implementation, WordPress expertise, and careful QA.",
      bio: "Web Developer and Front-End Developer with professional experience building and maintaining responsive websites using WordPress, Divi, Elementor, HTML, CSS, JavaScript, jQuery, PHP, and MySQL. Experienced in reusable front-end components, responsive troubleshooting, accessibility, page speed, Core Web Vitals, QA, website customization, and client collaboration.",
      email: "all.pmanayan@gmail.com",
      phone: "0949-870-5440",
      location: "Argao, Cebu, Philippines",
      address: "M. Revillas St., Langtad, Argao, Cebu",
      resumeUrl: "/resume.pdf",
      githubUrl: "https://patshu256.github.io/my-website/",
      linkedinUrl: null,
      twitterUrl: null,
      statProjects: "6",
      statCollaborations: "Multiple",
      statYears: "9+",
    },
  });

  await prisma.project.createMany({
    data: [
      {
        title: "Behance Portfolio",
        slug: "behance-portfolio",
        description: "Portfolio link listed on the resume.",
        details: "https://be.net/pmanayan",
        tech: "Web Design / Front-End",
        category: "Portfolio",
        liveUrl: "https://be.net/pmanayan",
        featured: true,
        sortOrder: 1,
      },
      {
        title: "Personal Website",
        slug: "personal-website",
        description: "Personal website link listed on the resume.",
        details: "https://patshu256.github.io/my-website/",
        tech: "HTML, CSS, JavaScript",
        category: "Web Design",
        liveUrl: "https://patshu256.github.io/my-website/",
        featured: true,
        sortOrder: 2,
      },
      {
        title: "NS Zipline",
        slug: "ns-zipline",
        description: "Project link listed on the resume.",
        details: "https://nszipline.com/",
        tech: "WordPress / Front-End",
        category: "Web Development",
        liveUrl: "https://nszipline.com/",
        featured: true,
        sortOrder: 3,
      },
      {
        title: "Nike GSAP Animation",
        slug: "nike-gsap-animation",
        description: "Front-end animation project link listed on the resume.",
        details: "https://patshu256.github.io/nike-gsap-animation/",
        tech: "HTML, CSS, JavaScript / Animation",
        category: "Animation",
        liveUrl: "https://patshu256.github.io/nike-gsap-animation/",
        featured: true,
        sortOrder: 4,
      },
      {
        title: "Nike Redesign",
        slug: "nike-redesign",
        description: "Front-end redesign project link listed on the resume.",
        details: "https://patshu256.github.io/nike-redesign/",
        tech: "HTML, CSS, JavaScript",
        category: "Web Design",
        liveUrl: "https://patshu256.github.io/nike-redesign/",
        featured: true,
        sortOrder: 5,
      },
      {
        title: "AD-IOS Digital Marketing Co.",
        slug: "ad-ios",
        description: "Company website link listed on the resume.",
        details: "https://ad-ios.com/",
        tech: "WordPress, PHP, JavaScript, CSS",
        category: "WordPress",
        liveUrl: "https://ad-ios.com/",
        featured: true,
        sortOrder: 6,
      },
    ],
  });

  await prisma.skill.createMany({
    data: [
      { name: "HTML5", category: "Frontend", sortOrder: 1 },
      { name: "CSS3", category: "Frontend", sortOrder: 2 },
      { name: "JavaScript", category: "Frontend", sortOrder: 3 },
      { name: "jQuery", category: "Frontend", sortOrder: 4 },
      { name: "Responsive Web Design", category: "Frontend", sortOrder: 5 },
      { name: "WordPress Development", category: "WordPress", sortOrder: 6 },
      { name: "Divi Builder", category: "WordPress", sortOrder: 7 },
      { name: "Elementor", category: "WordPress", sortOrder: 8 },
      { name: "WPBakery", category: "WordPress", sortOrder: 9 },
      { name: "PHP", category: "WordPress", sortOrder: 10 },
      { name: "MySQL", category: "Web & QA", sortOrder: 11 },
      { name: "Website Customization & Maintenance", category: "Web & QA", sortOrder: 12 },
      { name: "Website QA & Optimization", category: "Web & QA", sortOrder: 13 },
      { name: "CMS Platforms", category: "Web & QA", sortOrder: 14 },
      { name: "Photoshop / Basic Graphic Editing", category: "Tools & Strengths", sortOrder: 15 },
      { name: "Front-End Development", category: "Tools & Strengths", sortOrder: 16 },
      { name: "WordPress Customization", category: "Tools & Strengths", sortOrder: 17 },
      { name: "Responsive Design", category: "Tools & Strengths", sortOrder: 18 },
      { name: "Troubleshooting & QA", category: "Tools & Strengths", sortOrder: 19 },
      { name: "Client Communication", category: "Tools & Strengths", sortOrder: 20 },
      { name: "Problem Solving", category: "Tools & Strengths", sortOrder: 21 },
      { name: "Remote Collaboration", category: "Tools & Strengths", sortOrder: 22 },
      { name: "Page Speed Optimization", category: "Tools & Strengths", sortOrder: 23 },
    ],
  });

  await prisma.service.createMany({
    data: [
      { title: "Front-End Development", summary: "Responsive front-end implementation using HTML, CSS, JavaScript, and jQuery with careful cross-device behavior.", icon: "Code2", sortOrder: 1 },
      { title: "WordPress Development", summary: "WordPress websites built and maintained with Divi, Elementor, WPBakery, PHP, and custom front-end work.", icon: "Globe2", sortOrder: 2 },
      { title: "Responsive Design & QA", summary: "Troubleshooting layout conflicts, accessibility issues, responsiveness, and cross-device inconsistencies.", icon: "Layers3", sortOrder: 3 },
      { title: "Performance Optimization", summary: "Technical improvements focused on page speed, Core Web Vitals, accessibility, and overall user experience.", icon: "Gauge", sortOrder: 4 },
    ],
  });

  await prisma.experience.createMany({
    data: [
      {
        company: "AD-IOS Digital Marketing Co.",
        role: "Front-End Developer (Part-time)",
        startDate: "Oct 2025",
        endDate: "Sept 2026",
        location: "Remote",
        summary: "Engineered and maintained responsive WordPress websites using Divi, Elementor, HTML, CSS, JavaScript, and PHP; developed reusable components and custom layouts; led responsive, accessibility, performance, and cross-device troubleshooting; and worked with project management, SEO, development, and client-facing teams.",
        sortOrder: 1,
      },
      {
        company: "ePerformax Contact Centers",
        role: "Customer Service Representative",
        startDate: "Sep 2024",
        endDate: "Jul 2025",
        location: "Onsite",
        summary: "Provided professional customer support, investigated concerns, guided customers through resolution, documented interactions, and applied communication, active listening, problem-solving, and de-escalation skills in a high-volume environment.",
        sortOrder: 2,
      },
      {
        company: "AD-IOS Digital Marketing Co.",
        role: "Front-End Developer (Full-time)",
        startDate: "July 2021",
        endDate: "July 2024",
        location: "Hybrid",
        summary: "Engineered and maintained responsive WordPress websites using Divi, Elementor, HTML, CSS, JavaScript, and PHP; built reusable front-end components, custom layouts, and interactive features; and handled troubleshooting, QA, maintenance, revisions, accessibility, performance, and Core Web Vitals improvements.",
        sortOrder: 3,
      },
      {
        company: "Worldwide Solutions Trouble Free Employees Inc.",
        role: "WordPress Developer",
        startDate: "Jun 2019",
        endDate: "Sep 2019",
        location: "Onsite",
        summary: "Developed and maintained responsive WordPress websites using Divi, Elementor, and WPBakery; customized layouts, sections, styling, and content; resolved cross-device issues; performed updates and QA; and communicated with clients about website changes and requirements.",
        sortOrder: 4,
      },
      {
        company: "Chronostep Inc.",
        role: "Front-End / WordPress Developer",
        startDate: "Feb 2019",
        endDate: "May 2019",
        location: "Onsite",
        summary: "Developed and customized WordPress websites and blog templates using HTML, CSS, JavaScript, and WordPress tools; translated design concepts into responsive pages; maintained existing sites; troubleshot front-end issues; and collaborated on revisions and deployment readiness.",
        sortOrder: 5,
      },
      {
        company: "CML Mopro Philippines, Inc.",
        role: "Jr. Web Designer / Web Developer",
        startDate: "Apr 2017",
        endDate: "Nov 2018",
        location: "Onsite",
        summary: "Designed and developed responsive websites using the Mopro platform; translated client requirements and brand guidelines into polished layouts; created and updated page structures, content, imagery, typography, and styling; and performed QA before publication.",
        sortOrder: 6,
      },
    ],
  });

  await prisma.education.create({
    data: {
      institution: "Cebu Technological University",
      degree: "Bachelor of Science in Information and Communication Technology",
      startDate: "2013",
      endDate: "2017",
      location: "Cebu, Philippines",
      sortOrder: 1,
    },
  });
}

main()
  .then(() => console.log("Seed complete: resume content loaded into the portfolio."))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
