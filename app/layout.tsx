import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/config/google"; // normally import from "next/font/google"
import { Orbitron as OrbitronFont, Rajdhani as RajdhaniFont } from "next/font/google"; // fixing import
import "./globals.css";

const orbitron = OrbitronFont({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-heading" });
const rajdhani = RajdhaniFont({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-body" });

export const metadata: Metadata = {
    title: "Cinematic Sequence | Scroll Experience",
    description: "Aggressive and minimalistic cinematic animation showcase.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${orbitron.variable} ${rajdhani.variable} antialiased bg-[#0b0b0b] text-white`}>
                {children}
            </body>
        </html>
    );
}
