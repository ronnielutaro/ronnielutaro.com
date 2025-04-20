"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function Header() {
    const { activeSection, setActiveSection } = useActiveSectionContext();

    return (
        <header className="z-[999] relative">
            <motion.div
                className="fixed inset-0 w-screen h-16 sm:h-24 bg-opacity-20 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            <nav className="fixed top-3 sm:top-6 left-[50%] -translate-x-[50%] z-[999] rounded-full">
                <ul className="flex items-center justify-center">
                    {links.map((link) => (
                        <motion.li
                            key={link.hash}
                            className={`flex items-center text-base sm:text-lg cursor-pointer hover:text-zinc-200 rounded-full p-1 transition-all ${
                                activeSection === link.name
                                    ? "text-zinc-100 font-semibold"
                                    : "text-zinc-400 font-medium"
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                                delay: 1,
                                type: "tween",
                            }}
                        >
                            <Link
                                href={`/${link.hash}`}
                                onClick={() => {
                                    setActiveSection(link.name);
                                }}
                                className="relative w-full px-2 sm:px-5 py-1 "
                            >
                                {link.name}
                                {activeSection === link.name ? (
                                    <motion.span
                                        layout="position"
                                        id="activeSection"
                                        className="absolute inset-0 rounded-full w-full h-full -z-10 bg-white/10"
                                        layoutId="activeSection"
                                        transition={{
                                            type: "spring",
                                            damping: 25,
                                            stiffness: 500,
                                        }}
                                    />
                                ) : null}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
