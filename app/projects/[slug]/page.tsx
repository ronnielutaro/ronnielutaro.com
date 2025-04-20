import {
    getAvailableProjects,
    getProjectBySlug,
    getAllProjectsMetadata,
} from "@/lib/content";
import { notFound } from "next/navigation";
import Pill from "@/components/pill";

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const projects = await getAllProjectsMetadata();

    if (!projects) return [];

    return projects.map((project) => ({
        params: {
            slug: project.slug,
        },
    }));
}

export async function generateMetadata({ params }: Props) {
    const project = await getProjectBySlug(params.slug);
    if (!project) {
        return {
            title: "Project not found",
        };
    }

    return {
        title: `${project.metadata.name} | Ronnie Lutaro`,
    };
}

export default async function ProjectPage({ params }: Props) {
    const project = await getProjectBySlug(params.slug);
    if (!project) notFound();

    return (
        <div className="flex h-full w-full flex-1 scroll-mt-60 flex-col items-center md:col-span-11">
            <article className="prose prose-zinc prose-invert text-zinc-400 lg:prose-xl prose-p:w-full prose-a:text-teal-400">
                {project.content}
                <h4>Built with</h4>
                <div className="flex w-full flex-wrap gap-2">
                    {project.metadata.tools.map((tool) => (
                        <Pill key={tool} name={tool} />
                    ))}
                </div>
            </article>
        </div>
    );
}
