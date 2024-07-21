"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

export function AppInfo() {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
      <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Image<span className="text-primary">Insight</span>
      </div>
      <div className="text-xl text-center  py-4">
        This is a versatile API designed to extract essential information from
        images effortlessly. Users can choose to receive the output in either
        English or Spanish.
      </div>
      <ul className="list-none ">
        <li className="flex gap-2">
          <CheckIcon className="text-primary" />
          Generate a detailed caption (around 20 words)
        </li>
        <li className="flex gap-2">
          <CheckIcon className="text-primary" />A comprehensive description
        </li>
        <li className="flex gap-2">
          <CheckIcon className="text-primary" />
          Identify the primary color palette
        </li>
      </ul>
    </motion.div>
  );
}
