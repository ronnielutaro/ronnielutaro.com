"use client";

import { type ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

type Props = {
    children: ReactNode[];  // Expect an array of children
};

export default function Carousel({ children }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const simulateKeyPress = (keyCode: number) => {
        const event = new KeyboardEvent("keydown", {
            keyCode,
            which: keyCode,
        });
        document.dispatchEvent(event);
    };

    function scrollRight() {
        if (!containerRef.current) return;

        const scrollAmount = containerRef.current.clientWidth;
        containerRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });

        simulateKeyPress(39);
    }

    function scrollLeft() {
        if (!containerRef.current) return;

        const scrollAmount = containerRef.current.clientWidth;
        containerRef.current.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
        });

        simulateKeyPress(37);
    }

    if (!children || children.length === 0) return null;

    return (
        <div className="group relative">
            <div
                ref={containerRef}
                className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto"
            >
                {children.map((slide, index) => (
                    <div key={index} className="w-full flex-none snap-center">
                        {slide}
                    </div>
                ))}
            </div>

            {children.length > 1 && (
                <>
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/50 text-zinc-400 opacity-0 transition-all hover:bg-zinc-950/75 hover:text-zinc-100 group-hover:opacity-100"
                        aria-label="Previous slide"
                    >
                        <FaChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-950/50 text-zinc-400 opacity-0 transition-all hover:bg-zinc-950/75 hover:text-zinc-100 group-hover:opacity-100"
                        aria-label="Next slide"
                    >
                        <FaChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}
        </div>
    );
}
