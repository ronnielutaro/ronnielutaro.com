import { useInView } from "react-intersection-observer";
import { useEffect, useState, useMemo } from "react";
import {
    useActiveSectionContext,
    SectionName,
} from "@/context/active-section-context";

export function useActiveSectionInView(
    sectionName: SectionName,
    threshold = 0.7
) {
    const { setActiveSection } = useActiveSectionContext();
    const { ref, inView, entry } = useInView({
        threshold: threshold,
    });

    useEffect(() => {
        if (inView) {
            setActiveSection(sectionName);
        }
    }, [inView, entry, setActiveSection, sectionName]);

    return {
        ref,
    };
}

export function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    });

    return screenWidth;
}

export function useInViewThreshold(upper: number, lower: number) {
    const screenWidth = useScreenWidth();
    const threshold = useMemo(
        () => (screenWidth > 760 ? upper : lower),
        [screenWidth, upper, lower]
    );

    return threshold;
}
