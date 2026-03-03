"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import TransformerScrollCanvas from "@/components/TransformerScrollCanvas";
import TransformerExperience from "@/components/TransformerExperience";
import Navbar from "@/components/Navbar";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Single truth scroll orchestrator mapping across 500vh
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="bg-base-dark text-white min-h-screen">
            <Navbar scrollYProgress={scrollYProgress} />

            <section ref={containerRef} className="h-[500vh] relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    <TransformerScrollCanvas
                        scrollYProgress={scrollYProgress}
                        totalFrames={204}
                        imageFolderPath="/images/transformer-sequence/ezgif-150549ec1c497035-jpg"
                    />

                    <TransformerExperience scrollYProgress={scrollYProgress} />

                </div>
            </section>

            {/* Post-Sequence Content Layer */}
            <div className="relative z-20 bg-base-dark">
                <section className="py-24 px-8 max-w-7xl mx-auto border-t border-neutral-carbon">
                    <h2 className="font-heading text-4xl mb-12 tracking-wider">PROJECT OMEGA</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-400 font-body">
                        <div>
                            <h3 className="text-white text-xl mb-4 font-bold border-b border-accent-metal pb-2 w-fit">DIRECTIVE</h3>
                            <p>Execute complete transformation parameters across multiple fluid simulation stages.</p>
                        </div>
                        <div>
                            <h3 className="text-white text-xl mb-4 font-bold border-b border-accent-metal pb-2 w-fit">OUTPUT</h3>
                            <p>A cinematic sequence generating dynamic shifts under extreme stress simulation variables.</p>
                        </div>
                        <div>
                            <h3 className="text-white text-xl mb-4 font-bold border-b border-accent-metal pb-2 w-fit">STATUS</h3>
                            <p>Sequence integrity verified at 99.4% stability. Systems ready for final compilation.</p>
                        </div>
                    </div>
                </section>

                <footer className="py-12 text-center text-sm font-body text-neutral-500 bg-[#060606]">
                    <p>&copy; {new Date().getFullYear()} CINEMATIC TRANSFORMATION MODULE.</p>
                </footer>
            </div>

        </main>
    );
}
