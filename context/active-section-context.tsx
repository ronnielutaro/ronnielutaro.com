"use client";

import React, { createContext, useContext, useState } from "react";
import { links } from "@/lib/data";


// Active Section state type
export type SectionName = typeof links[number]["name"];


// Context Type
type ActiveSectionContextType = {
    activeSection: SectionName;
    setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
};

// Context definition
const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null);

// Provider props 
type ActiveSectionContextProviderProps = {
    children: React.ReactNode;
}

export default function ActiveSectionContextProvider({ children }: ActiveSectionContextProviderProps) {
    const [activeSection, setActiveSection] = useState<SectionName>("Home");

    return (
        <ActiveSectionContext.Provider value={ { activeSection, setActiveSection} }>
            {children}
        </ActiveSectionContext.Provider>
    );
}

// Custom hook to consume the activeSection context with error handling if used outside of the context provider
export function useActiveSectionContext() {
    const context = useContext(ActiveSectionContext);

    if (context === null) {
        throw new Error(
            "useActiveSection must be used within a ActiveSectionContextProvider"
        );
    }

    return context;
}
