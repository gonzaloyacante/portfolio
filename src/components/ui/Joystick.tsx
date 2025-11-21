"use client";

import React, { useRef, useState, useEffect } from "react";
import { inputState } from "@/utils/input";

export default function Joystick() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleStart = (clientX: number, clientY: number) => {
        setActive(true);
        updatePosition(clientX, clientY);
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!active) return;
        updatePosition(clientX, clientY);
    };

    const handleEnd = () => {
        setActive(false);
        setPosition({ x: 0, y: 0 });
        inputState.move = { x: 0, y: 0 };
    };

    const updatePosition = (clientX: number, clientY: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const maxDist = rect.width / 2;

        let dx = clientX - centerX;
        let dy = clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxDist) {
            const angle = Math.atan2(dy, dx);
            dx = Math.cos(angle) * maxDist;
            dy = Math.sin(angle) * maxDist;
        }

        setPosition({ x: dx, y: dy });

        // Normalize -1 to 1
        inputState.move = {
            x: dx / maxDist,
            y: dy / maxDist,
        };
    };

    // Touch events
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            handleEnd();
        };

        container.addEventListener("touchstart", onTouchStart, { passive: false });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            container.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    // Only render if it's a touch device (simple check)
    // In a real app, you might want a more robust check or a context
    // For now, we'll use CSS to hide on desktop, but we also want to avoid rendering if possible
    // However, hydration mismatches can occur if we check window.ontouchstart during SSR/hydration
    // So we render it but hide it with CSS.

    return (
        <div
            ref={containerRef}
            className="absolute bottom-8 left-8 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 touch-none pointer-events-auto z-50 flex items-center justify-center md:hidden lg:hidden"
        >
            <div
                ref={stickRef}
                className="absolute w-12 h-12 bg-cyan-500/80 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: active ? 'none' : 'all 0.2s ease-out'
                }}
            />
        </div>
    );
}
