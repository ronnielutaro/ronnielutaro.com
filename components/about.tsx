"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { motion } from "framer-motion";

import { useActiveSectionInView, useInViewThreshold } from "@/lib/hooks";

function textEmphasis(text: string) {
    return <span className="text-zinc-100 font-bold">{text}</span>;
}

export default function About() {
    const threshold = useInViewThreshold(0.7, 0.3);
    const { ref } = useActiveSectionInView("About", threshold);

    return (
        <motion.section
            ref={ref}
            id="about"
            className="flex flex-col mb-20 lg:mb-44 w-full lg:w-[70%] md:leading-8 scroll-mt-48"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <h2 className="text-4xl font-bold py-10">About Me</h2>
            <p className="text-lg text-zinc-400 py-3 text-justify ">
                For over 5 years, I have helped Businesses Maximize Growth through Product Strategy, 
                Product Development & Advertising Technology (AdTech) in African Markets. In my spare time, 
                I love to work on Visual Storytelling side-projects.
            </p>
            <p className="text-lg text-zinc-400 py-3 text-justify ">
                At{" "}
                <a
                    target="_blank"
                    href="https://starthubafrica.org/"
                    className="font-semibold underline"
                >
                    StartHub Africa <HiMiniArrowUpRight className="inline-block"/>
                </a>
                , I lead innovation & venture-building projects, helping early-stage founders develop scalable 
                products, secure customers, and drive revenue growth. To date, I&apos;ve worked on projects that have supported 100+ 
                youth founders & startups, guiding them from idea generation to market readiness.
            </p>
            <p className="text-lg text-zinc-400 py-3 text-justify ">
                Previously, I worked as a Software Engineer & Consultant with leading organizations & companies 
                like Andela, United Nations (UN Women) and early-stage startups such as Agri-Logistics Uganda. 
                My experience includes leading the design and development of software products, equipping me with a solid 
                foundation in creating solutions that solve real-world problems.
            </p>
            
            <h3 className="text-lg text-zinc-400 py-3 text-justify ">{textEmphasis("Current Focus Areas")}</h3>

            <p className="text-lg text-zinc-400 py-3 text-justify ">
                I&apos;m currently exploring how {textEmphasis("Advertising Technology (AdTech)")} can empower Small to Medium size African Agencies to:
            </p>
            <ul className="text-lg text-zinc-400 py-3 text-justify ">
                <li>● Boost campaign efficiency & automate painful workflows</li>
                <li>● Optimize Ad spend in real-time & reduce budget waste</li>
                <li>● Unlock new possibilities in programmatic advertising</li>
            </ul>
            <p className="text-lg text-zinc-400 py-3 text-justify ">
                Through R&D, I&apos;m developing {textEmphasis("AdTech tools")} to help agencies work smarter, 
                grow faster, and scale sustainably without bloated costs or complexity
            </p>
            <h3 className="text-lg text-zinc-400 py-3 text-justify ">{textEmphasis("Skills & Expertise")}</h3>
            <ul className="text-lg text-zinc-400 py-3 text-justify ">
                <li>● Product Development & Strategy</li>
                <li>● Project Management</li>
                <li>● Advertising Technology (AdTech)</li>
                <li>● Tools & Tech-Stack: C#, ASP.NET Core, Entity Framework Core, 
                    JavaScript, React.js, Next.js, Python, SQL, Microsoft Azure, Git, GitHub
                </li>
            </ul>

            {/* <Link
                href="/about"
                className="flex max-w-fit items-center gap-3 group text-teal-400 font-semibold underline py-2"
            >
                Read More{" "}
                <BsArrowRight className="group-hover:translate-x-2 transition-all" />
            </Link> */}
        </motion.section>
    );
}
