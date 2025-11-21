"use client";

import React, { useState } from "react";
import { Html } from "@react-three/drei";
import SemanticSearch from "@/components/SemanticSearch";

export default function SearchKiosk() {
    const [hover, setHover] = useState(false);

    return (
        <group position={[12, 0, 5]} rotation={[0, -Math.PI / 2, 0]} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
            {/* Podium Base */}
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.5, 0.8, 2, 32]} />
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Floating Screen Frame */}
            <mesh position={[0, 2.8, 0]} rotation={[-Math.PI / 6, 0, 0]}>
                <boxGeometry args={[3.2, 2.2, 0.1]} />
                <meshStandardMaterial color={hover ? "#00ffff" : "#333"} metalness={0.9} roughness={0.1} emissive={hover ? "#00ffff" : "#000"} emissiveIntensity={0.2} />
            </mesh>

            {/* Screen Content */}
            <Html
                position={[0, 2.8, 0.06]}
                rotation={[-Math.PI / 6, 0, 0]}
                transform
                occlude
                distanceFactor={3}
                style={{ width: "600px", height: "400px" }}
            >
                <div className="w-full h-full bg-black/80 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-6 border-b border-cyan-500/30 pb-4">
                        <h3 className="text-cyan-400 font-mono text-2xl tracking-widest">PROJECT DATABASE</h3>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-cyan-500/50 rounded-full" />
                            <div className="w-2 h-2 bg-cyan-500/20 rounded-full" />
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <SemanticSearch />
                    </div>
                    <div className="mt-4 text-center text-cyan-500/40 text-xs font-mono">
                        SECURE CONNECTION ESTABLISHED
                    </div>
                </div>
            </Html>
        </group>
    );
}
