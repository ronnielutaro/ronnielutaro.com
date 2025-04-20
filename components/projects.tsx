"use client";

import { motion } from "framer-motion";
import { useActiveSectionInView, useInViewThreshold } from "@/lib/hooks";

type Props = {
    children: React.ReactNode;
};

export default function Projects({ children }: Props) {
    const threshold = useInViewThreshold(0.7, 0.2);
    const { ref: sectionRef } = useActiveSectionInView("Projects", threshold);

    return (
        <motion.section
            id="projects"
            ref={sectionRef}
            className="mb-40 flex w-full scroll-mt-32 flex-col lg:w-[70%]"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <h2 className="py-10 text-4xl font-bold">Product Development</h2>
            <div className="mt-10 grid grid-cols-1 items-center justify-center gap-10 2xl:grid-cols-2">
                {children}
            </div>
        </motion.section>
    );
}
