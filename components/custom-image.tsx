import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { getLocalImage } from "@/lib/content";

type Props = {
    src: string | StaticImport;
    alt: string;
};

export default async function CustomImage({ src, alt }: Props) {
    if (src && typeof src === "string" && src.startsWith("/")) {
        const content = await getLocalImage(src);
        src = `data:image/png;base64,${content}`;
    }

    return (
        <div className="flex h-[420px] w-full flex-none snap-center flex-col items-center justify-center bg-transparent">
            <Image
                className="h-full w-full overflow-clip rounded-lg object-contain"
                src={src}
                alt={alt}
                height={500}
                width={500}
            />
        </div>
    );
}
