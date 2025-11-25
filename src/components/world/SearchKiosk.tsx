"use client";

import React, { useState } from "react";
import { Html } from "@react-three/drei";
import SemanticSearch from "@/components/SemanticSearch";

export default function SearchKiosk() {
    const [hover, setHover] = useState(false);

    return (
        <group position={[12, 0, 5]} rotation={[0, -Math.PI / 2, 0]} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
            {/* Holographic Base */}
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[1, 1.2, 0.2, 32]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} wireframe />
            </mesh>
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.15, 0.35, 2, 8]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
            </mesh>

            {/* Floating Screen Frame */}
            <group position={[0, 2.8, 0]} rotation={[-Math.PI / 6, 0, 0]}>
                <mesh>
                    <boxGeometry args={[3.4, 2.4, 0.1]} />
                    <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[3.2, 2.2]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
                {/* Glowing Border */}
                <mesh position={[0, 0, 0.05]}>
                    <boxGeometry args={[3.45, 2.45, 0.05]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={hover ? 2 : 0.5} transparent opacity={0.5} />
                </mesh>
            </group>

            {/* Screen Content */}
            <Html
                position={[0, 2.8, 0.07]}
                rotation={[-Math.PI / 6, 0, 0]}
                transform
                occlude
                distanceFactor={3}
                style={{ width: "600px", height: "400px" }}
            >
                <div className="w-full h-full bg-black p-6 rounded-xl border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.4)] overflow-hidden flex flex-col relative group">
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

                    <div className="flex items-center justify-between mb-6 border-b-2 border-cyan-500 pb-4 z-20">
                        <h3 className="text-cyan-400 font-mono text-3xl font-bold tracking-widest drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                            PROJECT DATABASE
                        </h3>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#00ffff]" />
                            <div className="w-3 h-3 bg-cyan-500/50 rounded-full" />
                            <div className="w-3 h-3 bg-cyan-500/20 rounded-full" />
                        </div>
                    </div>
                    <div className="flex-1 relative z-20">
                        <SemanticSearch />
                    </div>
                    <div className="mt-4 flex justify-between text-cyan-500/60 text-xs font-mono z-20">
                        <span>SYS.VER.2.5.0</span>
                        <span className="animate-pulse">CONNECTED</span>
                    </div>
                </div>
            </Html>
        </group>
    );
}
