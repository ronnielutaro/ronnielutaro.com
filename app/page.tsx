import Header from "@/components/header";
import About from "@/components/about";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import SectionDivider from "@/components/section-divider";

import { getAllProjectsMetadata } from "@/lib/content";
import Project from "@/components/project";

export default async function Home() {
    const projects = await getAllProjectsMetadata();

    return (
        <main className="md:px-22 flex min-h-screen flex-col items-center justify-between px-10 xl:px-24">
            <Header />
            <Intro />
            <About />
            <Projects>
                {projects?.map((project) => (
                    <Project key={project.name} {...project} />
                ))}
            </Projects>
            <Contact />
        </main>
    );
}
