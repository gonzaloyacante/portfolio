"use client";

import { useEffect, useState } from "react";

export default function InteractButton() {
    const [hasTarget, setHasTarget] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleStateChange = (e: Event) => {
            const customEvent = e as CustomEvent;
            setHasTarget(customEvent.detail.hasTarget);
        };

        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };

        checkMobile();
        window.addEventListener('interactionStateChange', handleStateChange);
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('interactionStateChange', handleStateChange);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleInteract = () => {
        window.dispatchEvent(new CustomEvent('gameInteract'));
    };

    return (
        <button
            onClick={handleInteract}
            disabled={!hasTarget}
            className={`
                fixed bottom-6 right-6 z-40
                w-20 h-20 rounded-full
                flex items-center justify-center
                font-bold text-2xl
                transition-all duration-200
                ${hasTarget
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.6)] scale-100 active:scale-95'
                    : 'bg-gray-800/50 text-gray-600 scale-90 cursor-not-allowed'
                }
                border-2 ${hasTarget ? 'border-cyan-400' : 'border-gray-700'}
                backdrop-blur-sm
            `}
            style={{
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
            }}
        >
            {isMobile ? (
                // Touch icon for mobile
                <svg className={hasTarget ? 'animate-pulse' : ''} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 3v12m0 0l4-4m-4 4L5 11"></path>
                    <circle cx="9" cy="21" r="1" fill="currentColor"></circle>
                </svg>
            ) : (
                <span className={hasTarget ? 'animate-pulse' : ''}>E</span>
            )}
            {hasTarget && (
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
            )}
        </button>
    );
}
