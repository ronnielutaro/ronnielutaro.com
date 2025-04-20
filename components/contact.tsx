"use client";

import { socials } from "@/lib/data";
import { motion } from "framer-motion";

export default function Contact() {
    return (
        <motion.section
            className="flex flex-col items-center justify-center mb-36"
            id="contact"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* <div className="flex flex-col items-center justify-center mb-36"> */}
            <h2 className="text-5xl text-center font-semibold mb-10">
                Get In Touch
            </h2>
            <p className="text-zinc-400 text-center mb-6 max-w-lg text-lg">
                Let&apos;s Connect: If you&apos;re working on something exciting in 
                Artificial Intelligence (AI), Advertising or Product Development, I&apos;d love 
                to connect and explore opportunities for collaboration & innovation. Feel free to contact me if you
                have any questions or just want to say hi!
            </p>
            <div className="flex items-center gap-4">
                {socials.map((social) => (
                    <a
                        key={social.name}
                        target="_blank"
                        href={social.url}
                        className="text-4xl text-zinc-400 hover:text-zinc-300 transition-all cursor-pointer hover:scale-110 active:scale-105"
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
            {/* </div> */}
        </motion.section>
    );
}
