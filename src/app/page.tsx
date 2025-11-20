import GalleryScene from "@/scenes/GalleryScene";
import Joystick from "@/components/ui/Joystick";

export default function Home() {
  return (
    <main className="relative w-full h-full">
      <div className="absolute inset-0 z-0">
        <GalleryScene />
      </div>
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/80 rounded-full pointer-events-none z-50 mix-blend-difference" />

      {/* Mobile Controls */}
      <Joystick />

      <div className="absolute bottom-8 left-8 z-10 text-white/50 text-sm pointer-events-none">
        WASD / Arrows to move • Click to interact • ESC to unlock cursor
      </div>
    </main>
  );
}
