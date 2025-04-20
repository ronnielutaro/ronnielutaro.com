"use client";

import React, { useEffect } from "react";
import Header from "@/components/header";
import { useActiveSectionContext } from "@/context/active-section-context";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";

type Props = {
    children: React.ReactNode;
};

export default function ProjectLayout({ children }: Props) {
    const { setActiveSection } = useActiveSectionContext();

    useEffect(() => {
        setActiveSection("Projects");
    }, [setActiveSection]);

    return (
        <main className="px-22 mb-36 mt-40 flex flex-col items-center justify-between px-10 xl:px-24">
            <Header />
            <div className="flex w-full flex-col md:flex-row lg:w-[80%] 2xl:w-[60%]">
                <div className="mb-10 mr-10 flex max-h-12 w-5 flex-none items-center md:col-auto">
                    <Link
                        href="/#projects"
                        className="inline-block text-xl font-semibold text-zinc-500 transition-all hover:text-teal-500 hover:underline"
                    >
                        <IoArrowBackOutline />
                    </Link>
                </div>
                {children}
            </div>
        </main>
    );
}
