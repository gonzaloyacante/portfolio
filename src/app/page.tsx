"use client";

import GalleryScene from "@/scenes/GalleryScene";
import Joystick from "@/components/ui/Joystick";
import FuturisticBrowser from "@/components/ui/FuturisticBrowser";
import CVModal from "@/components/ui/CVModal";
import Crosshair from "@/components/ui/Crosshair";
import { useState, useEffect } from "react";

export default function Home() {
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);
  const [showCVModal, setShowCVModal] = useState(false);

  useEffect(() => {
    const handleOpenBrowser = (event: Event) => {
      const customEvent = event as CustomEvent<{ url: string }>;
      setBrowserUrl(customEvent.detail.url);
    };

    const handleOpenCVModal = () => {
      setShowCVModal(true);
    };

    window.addEventListener('openBrowser', handleOpenBrowser);
    window.addEventListener('openCVModal', handleOpenCVModal);
    return () => {
      window.removeEventListener('openBrowser', handleOpenBrowser);
      window.removeEventListener('openCVModal', handleOpenCVModal);
    };
  }, []);

  return (
    <main className="relative w-full h-full">
      <div className="absolute inset-0 z-0">
        <GalleryScene />
      </div>
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/80 rounded-full pointer-events-none z-50 mix-blend-difference" />

      {/* Mobile Controls */}
      <Joystick />
      {browserUrl && (
        <FuturisticBrowser
          url={browserUrl}
          onClose={() => setBrowserUrl(null)}
        />
      )}
      {showCVModal && (
        <CVModal onClose={() => setShowCVModal(false)} />
      )}
      <Crosshair />
      <div className="absolute bottom-8 left-8 z-10 text-white/50 text-sm pointer-events-none">
        WASD / Arrows to move • Click to interact • ESC to unlock cursor
      </div>
    </main>
  );
}
