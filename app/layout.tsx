import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import ActiveSectionContextProvider from "@/context/active-section-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Renato | Personal Portfolio",
    description:
        "Renato is a Software Engineer with experience with Embedded Systems and Web Development",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="!scroll-smooth">
            <body
                className={`${inter.className} relative flex min-h-screen flex-col bg-zinc-950 text-zinc-100`}
            >
                <ActiveSectionContextProvider>
                    {children}
                    <Footer />
                    <Analytics />
                </ActiveSectionContextProvider>
            </body>
        </html>
    );
}
