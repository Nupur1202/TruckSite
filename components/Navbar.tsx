"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";

interface NavbarProps {
    scrollYProgress: MotionValue<number>;
}

export default function Navbar({ scrollYProgress }: NavbarProps) {
    // Add subtle darkening based on scroll progress
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.05],
        ["rgba(11, 11, 11, 0)", "rgba(11, 11, 11, 0.8)"]
    );

    const borderColor = useTransform(
        scrollYProgress,
        [0, 0.05],
        ["rgba(42, 42, 42, 0)", "rgba(42, 42, 42, 1)"]
    );

    return (
        <motion.header
            style={{ backgroundColor, borderBottomColor: borderColor }}
            className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-sm border-b"
        >
            <div className="flex items-center gap-4 text-white hover:text-accent-metal transition-colors">
                <Link href="/">
                    <span className="font-heading text-xl font-bold tracking-[0.2em] uppercase">Cinematic</span>
                </Link>
            </div>

            <div className="flex items-center gap-12 font-body font-semibold">
                <Link
                    href="#inquire"
                    className="hidden md:block text-neutral-400 hover:text-white transition-colors"
                >
                    INQUIRE
                </Link>
                <Link
                    href="#portfolio"
                    className="hidden md:block text-neutral-400 hover:text-white transition-colors"
                >
                    PORTFOLIO
                </Link>
                <button
                    className="text-white hover:text-accent-metal transition-colors outline-none"
                    aria-label="Menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </motion.header>
    );
}
