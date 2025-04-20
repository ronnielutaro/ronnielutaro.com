"use client";

import { useState, useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";

import { motion } from "framer-motion";

import { socials } from "@/lib/data";

import { useActiveSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

import Link from "next/link";

const expertiseList = [
    "Project Management",
    "Product Development",
    "Building Advertising Technology (AdTech) in Africa",
    "Visual Storytelling"
] as const;

export default function Intro() {
    const [expertise, setExpertise] = useState("Embedded Systems");
    const [expertiseIndex, setExpertiseIndex] = useState(0);
    const [direction, setDirection] = useState<"forward" | "backward">(
        "backward",
    );
    const [pause, setPause] = useState(0);

    const { ref: sectionRef } = useActiveSectionInView("Home");

    const { setActiveSection } = useActiveSectionContext();

    useEffect(() => {
        const backspace = () => {
            if (expertise.length === 0) {
                setExpertiseIndex((expertiseIndex + 1) % expertiseList.length);
                setDirection("forward");
                setPause(5);
            } else {
                const segment = expertise.slice(0, expertise.length - 1);
                setExpertise(segment);
            }
        };

        const type = () => {
            if (expertise.length < expertiseList[expertiseIndex].length) {
                const segment = expertiseList[expertiseIndex].slice(
                    0,
                    expertise.length + 1,
                );
                setExpertise(segment);
            } else {
                setDirection("backward");
                setPause(30);
            }
        };

        const interval = setInterval(() => {
            if (pause > 0) {
                setPause((prev) => prev - 1);
                return;
            }
            direction === "forward" ? type() : backspace();
        }, 100);

        return () => clearInterval(interval);
    }, [expertise, expertiseIndex, direction, pause]);

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative flex min-h-screen w-full flex-col justify-center lg:w-[70%]"
        >
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <h1 className="mt-4 text-5xl font-bold md:text-7xl">
                    Ronnie Lutaro
                </h1>
                <p className="font-base mt-6 max-w-[95%] text-xl text-zinc-500">
                    Helping Businesses Maximize Growth through Product Strategy & Advertising Technology (AdTech) 
                    in African Markets. In my spare time, I love to work on Visual Storytelling side-projects.
                </p>
                <p className="font-base mt-6 max-w-[95%] text-xl text-zinc-500">
                    This is where I share lessons from my work across{" "}
                    <span className="font-semibold text-zinc-400">
                        {expertise}{" "}
                        <span className="animate-[pulse_1.5s_linear_infinite] text-teal-400">
                            |
                        </span>
                    </span>
                </p>
            </motion.div>
            <motion.div
                className="mt-10 flex items-center justify-start gap-4"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                {socials.map((social) => (
                    <a
                        key={social.name}
                        target="_blank"
                        href={social.url}
                        className="cursor-pointer text-4xl text-zinc-400 transition-all hover:scale-110 hover:text-zinc-300 active:scale-105"
                    >
                        {social.icon}
                    </a>
                ))}

                
            </motion.div>
            <motion.div
                className="absolute bottom-32 left-[48%] -translate-x-[52%] transform animate-bounce md:bottom-40"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
            >
                <Link
                    href="#about"
                    onClick={() => {
                        setActiveSection("About");
                    }}
                    className="cursor-pointer"
                >
                    <BsArrowDown />
                </Link>
            </motion.div>
        </section>
    );
}
