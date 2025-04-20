import { Children, type ReactNode } from "react";
import Carousel from "./carousel";

type Props = {
    children: ReactNode;
};

export default function MDXCarousel({ children }: Props) {
    // Convert children to array if it's not already
    const childrenArray = Children.toArray(children);
    
    return <Carousel>{childrenArray}</Carousel>;
} 