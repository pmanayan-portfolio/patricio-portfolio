"use client";

import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
);

export const ScaleIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
);
