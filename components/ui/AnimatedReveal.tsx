"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function AnimatedReveal({
  children,
  className,
  delay = 0,
}: AnimatedRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
