"use client";

import GalleryScene from "@/scenes/GalleryScene";
import Joystick from "@/components/ui/Joystick";
import InteractButton from "@/components/ui/InteractButton";
import FuturisticBrowser from "@/components/ui/FuturisticBrowser";
import CVModal from "@/components/ui/CVModal";
import Crosshair from "@/components/ui/Crosshair";
import { useState, useEffect } from "react";

export default function Home() {
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);
  const [showCVModal, setShowCVModal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleOpenBrowser = (event: Event) => {
      const customEvent = event as CustomEvent<{ url: string }>;
      setBrowserUrl(customEvent.detail.url);
    };

    const handleOpenCVModal = () => {
      setShowCVModal(true);
    };

    const handleGameStart = () => {
      setGameStarted(true);
    };

    window.addEventListener('openBrowser', handleOpenBrowser);
    window.addEventListener('openCVModal', handleOpenCVModal);
    window.addEventListener('gameStart', handleGameStart);
    return () => {
      window.removeEventListener('openBrowser', handleOpenBrowser);
      window.removeEventListener('openCVModal', handleOpenCVModal);
      window.removeEventListener('gameStart', handleGameStart);
    };
  }, []);

  return (
    <main className="relative w-full h-full">
      <div className="absolute inset-0 z-0">
        <GalleryScene isBrowserOpen={!!browserUrl} />
      </div>
      {/* Mobile Controls */}
      <Joystick disabled={!gameStarted} />
      <InteractButton />
      {browserUrl && (
        <FuturisticBrowser
          url={browserUrl}
          onClose={() => setBrowserUrl(null)}
        />
      )}
      {showCVModal && (
        <CVModal onClose={() => setShowCVModal(false)} />
      )}
      <div className="absolute bottom-8 left-8 z-10 text-white/50 text-sm pointer-events-none hidden md:block">
        WASD / Arrows to move • Click to interact • ESC to unlock cursor
      </div>
    </main>
  );
}
