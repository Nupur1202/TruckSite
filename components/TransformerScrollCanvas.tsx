"use client";

import { useRef, useEffect, useState } from "react";
import { MotionValue } from "framer-motion";

interface ScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function TransformerScrollCanvas({ scrollYProgress, totalFrames, imageFolderPath }: ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const requestRef = useRef<number>();

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const preloadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(4, "0"); // Assuming ezgif format: ezgif-150549ec1c497035-jpg-0001

            // Let's assume the user downloaded ezgif files typically numbered like file-001.jpg or file-1.jpg
            img.src = `${imageFolderPath}/frame-${i}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) setIsLoaded(true);
            };
            preloadedImages.push(img);
        }
        setImages(preloadedImages);
    }, [totalFrames, imageFolderPath]);

    // Handle Canvas Rendering scaling
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !images.length || !isLoaded) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function renderFrame(progress: number) {
            if (!canvas || !ctx) return;
            const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
            const image = images[frameIndex];
            if (!image) return;

            const devicePixelRatio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * devicePixelRatio;
            canvas.height = window.innerHeight * devicePixelRatio;

            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            ctx.scale(devicePixelRatio, devicePixelRatio);

            const hRatio = window.innerWidth / image.width;
            const vRatio = window.innerHeight / image.height;

            // Object-fit: contain logic for entire viewing
            const ratio = Math.min(hRatio, vRatio);
            const centerShift_x = (window.innerWidth - image.width * ratio) / 2;
            const centerShift_y = (window.innerHeight - image.height * ratio) / 2;

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.drawImage(
                image,
                0, 0, image.width, image.height,
                centerShift_x, centerShift_y, image.width * ratio, image.height * ratio
            );
        }

        const unsubscribe = scrollYProgress.onChange((latest) => {
            // Use request animation frame to sync drawing optimally avoiding jitter
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            requestRef.current = requestAnimationFrame(() => renderFrame(latest));
        });

        // Initial Render
        renderFrame(scrollYProgress.get());

        return () => unsubscribe();
    }, [scrollYProgress, images, totalFrames, isLoaded]);

    return (
        <div className="absolute inset-0 z-0 bg-base-dark w-full h-full flex items-center justify-center">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white font-heading z-10 transition-opacity">
                    INITIATING SEQUENCE...
                </div>
            )}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="block"
            />
        </div>
    );
}
