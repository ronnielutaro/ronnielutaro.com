import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import Pill from "@/components/pill";
import { getLocalImage } from "@/lib/content";

type ProjectProps = {
    name: string;
    description: string;
    tools: string[];
    image?: string | StaticImport;
    slug: string;
};

export default async function Project({
    name,
    description,
    tools,
    image,
    slug
}: ProjectProps) {
    if (image && typeof image === "string" && image.startsWith("/")) {
        const content = await getLocalImage(image);
        image = `data:image/png;base64,${content}`
    }

    return (
        <Link 
            className="group grid h-full w-full grid-cols-12 items-center justify-center gap-4 rounded-lg border border-zinc-600/30 transition-all hover:cursor-pointer hover:bg-zinc-700/30 md:hover:scale-105"
            href={`/projects/${slug}`}
        >
            <div className="col-span-12 flex h-full flex-col justify-between p-6 md:col-span-8 xl:col-span-7">
                <div className="mb-10 2xl:mb-20">
                    <h3 className="mb-4 text-2xl font-semibold">{name}</h3>
                    <p className="text-zinc-400">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                        <Pill key={tool} name={tool} />
                    ))}
                </div>
            </div>
            <div className="relative col-span-12 flex h-[200px] w-full items-center md:col-span-4 md:h-[88%] md:w-[92%] xl:col-span-5">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill={true}
                        className="rounded-b-lg border border-solid border-zinc-600 object-cover brightness-95 transition-all md:rounded-xl md:group-hover:shadow-zinc-500 md:group-hover:brightness-100 md:group-hover:drop-shadow-lg"
                    />
                ) : (
                    <div className="h-full w-full overflow-clip rounded-b-lg bg-zinc-700 md:rounded-lg" />
                )}
            </div>
        </Link>
    );
}
