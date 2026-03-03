"use client";

import { motion, useTransform, MotionValue } from "framer-motion"

interface TransformerExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function TransformerExperience({ scrollYProgress }: TransformerExperienceProps) {
    // Phase 1: Presence [0% to 30%]
    const phase1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
    const phase1TranslateY = useTransform(scrollYProgress, [0, 0.3], [50, -50]);

    // Phase 2: Translation [30% to 75%]
    const phase2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.65, 0.75], [0, 1, 1, 0]);

    // HUD rapid counter
    const frameCounter = useTransform(scrollYProgress, [0, 1], [1, 204]);

    // Phase 3: Arrival [75% to 100%]
    const phase3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
    const phase3TranslateY = useTransform(scrollYProgress, [0.75, 1], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full text-white overflow-hidden p-8 flex flex-col justify-between">

            {/* Decorative top boundaries */}
            <div className="flex justify-between items-start font-heading text-xs tracking-widest text-accent-metal">
                <div className="flex flex-col gap-1 hidden md:flex">
                    <span className="text-neutral-500">SYS_ID: TRF-X900</span>
                    <span>LOCATION: OMEGA PROTOCOL</span>
                </div>

                {/* Rapid HUD element showing current frame approximation directly synchronized */}
                <motion.div className="flex items-center gap-2 bg-black/50 px-3 py-1 border border-neutral-carbon">
                    <span className="text-neutral-500">FRAME /</span> {frameCounter.get().toFixed(0)}
                </motion.div>
            </div>

            <div className="relative w-full h-full flex items-center justify-between">

                {/* Phase 1 Overlay */}
                <motion.div
                    style={{ opacity: phase1Opacity, y: phase1TranslateY }}
                    className="absolute left-0 bottom-1/4 font-body border-l-2 border-accent-metal pl-6 max-w-sm hidden md:block"
                >
                    <h2 className="font-heading text-2xl uppercase tracking-widest mb-2">Transmission Initiated</h2>
                    <p className="text-neutral-400 text-sm">Synchronizing sequence vectors. Establishing visual continuity with mechanical subject TRF-01.</p>
                </motion.div>

                {/* Phase 2 Overlay */}
                <motion.div
                    style={{ opacity: phase2Opacity }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 font-heading tracking-widest text-right"
                >
                    <h2 className="text-red-500 text-sm flex gap-2 items-center justify-end">
                        <span className="w-2 h-2 rounded-full animate-pulse bg-red-500" />
                        CORE ENGAGED
                    </h2>
                    <p className="text-white text-3xl mt-2 mix-blend-difference">SYSTEM SHIFTING</p>
                </motion.div>

                {/* Phase 3 Overlay */}
                <motion.div
                    style={{ opacity: phase3Opacity, y: phase3TranslateY }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-1/4 flex flex-col items-center justify-center pointer-events-auto"
                >
                    <h2 className="font-heading text-3xl md:text-5xl uppercase tracking-widest text-center whitespace-nowrap mb-4">
                        Transformation <br /> Complete
                    </h2>
                    <p className="font-body text-neutral-400 mb-8 max-w-md text-center">
                        Full scale mechanics sequence successfully converted. End of line.
                    </p>
                    <button className="px-8 py-3 bg-white text-black font-heading font-bold tracking-widest hover:bg-accent-metal hover:text-white transition-colors">
                        ACCESS TERMINAL
                    </button>
                </motion.div>

            </div>

            {/* Footer static HUD rails */}
            <div className="flex justify-between items-end font-body text-xs text-neutral-600 uppercase tracking-widest">
                <span>V. 9.1</span>
                <span>SECURITY CLEARANCE REQUIRED</span>
            </div>

        </div>
    )
}
