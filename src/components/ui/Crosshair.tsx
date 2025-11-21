"use client";

import React from "react";

export default function Crosshair() {
    const [hasTarget, setHasTarget] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleStateChange = (e: CustomEvent) => {
            setHasTarget(e.detail.hasTarget);
        };

        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };

        window.addEventListener('interactionStateChange', handleStateChange as EventListener);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('interactionStateChange', handleStateChange as EventListener);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            {/* Crosshair - Only show on desktop or if user prefers */}
            {!isMobile && (
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${hasTarget ? 'scale-150' : 'scale-100'}`}>
                    {/* Center dot */}
                    <div className={`w-1 h-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-colors duration-200 ${hasTarget ? 'bg-yellow-400 shadow-yellow-400' : 'bg-cyan-400'}`} />

                    {/* Lines */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className={`absolute w-4 h-[1px] -translate-x-6 transition-colors duration-200 ${hasTarget ? 'bg-yellow-400' : 'bg-cyan-400/60'}`} />
                        <div className={`absolute w-4 h-[1px] translate-x-2 transition-colors duration-200 ${hasTarget ? 'bg-yellow-400' : 'bg-cyan-400/60'}`} />
                        <div className={`absolute w-[1px] h-4 -translate-y-6 transition-colors duration-200 ${hasTarget ? 'bg-yellow-400' : 'bg-cyan-400/60'}`} />
                        <div className={`absolute w-[1px] h-4 translate-y-2 transition-colors duration-200 ${hasTarget ? 'bg-yellow-400' : 'bg-cyan-400/60'}`} />
                    </div>
                </div>
            )}

            {/* Hint */}
            <div className={`absolute bottom-32 transition-opacity duration-300 ${hasTarget ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-cyan-400 text-sm font-mono bg-black/60 backdrop-blur-sm px-4 py-2 rounded border border-cyan-500/30 flex items-center gap-2">
                    <span className="animate-pulse">
                        {isMobile ? "TAP TO INTERACT" : "PRESS"}
                    </span>
                    {!isMobile && (
                        <span className="bg-cyan-900/50 px-2 py-0.5 rounded border border-cyan-500 text-xs font-bold text-white">E</span>
                    )}
                    {!isMobile && "TO INTERACT"}
                </div>
            </div>
        </div>
    );
}
