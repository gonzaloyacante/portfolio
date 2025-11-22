"use client";

import { useEffect, useState } from "react";

export default function InteractButton() {
    const [hasTarget, setHasTarget] = useState(false);

    useEffect(() => {
        const handleStateChange = (e: Event) => {
            const customEvent = e as CustomEvent;
            setHasTarget(customEvent.detail.hasTarget);
        };

        window.addEventListener('interactionStateChange', handleStateChange);
        return () => window.removeEventListener('interactionStateChange', handleStateChange);
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
            <span className={hasTarget ? 'animate-pulse' : ''}>E</span>
            {hasTarget && (
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping" />
            )}
        </button>
    );
}
