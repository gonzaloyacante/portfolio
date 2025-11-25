"use client";

import React from "react";
import { Html } from "@react-three/drei";

export default function WelcomePanel({ onStart }: { onStart: (mode: 'TOUR' | 'FREE') => void }) {
    return (
        <group position={[0, 3, 12]} rotation={[0, 0, 0]}>
            {/* 3D Background Box */}
            <mesh position={[0, 0, -0.1]}>
                <boxGeometry args={[4.2, 2.6, 0.2]} />
                <meshStandardMaterial
                    color="#050505"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Front Frame Border */}
            <group position={[0, 0, 0.05]}>
                {/* Top border */}
                <mesh position={[0, 1.35, 0]}>
                    <boxGeometry args={[4.3, 0.05, 0.05]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
                {/* Bottom border */}
                <mesh position={[0, -1.35, 0]}>
                    <boxGeometry args={[4.3, 0.05, 0.05]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
                {/* Left border */}
                <mesh position={[-2.15, 0, 0]}>
                    <boxGeometry args={[0.05, 2.7, 0.05]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
                {/* Right border */}
                <mesh position={[2.15, 0, 0]}>
                    <boxGeometry args={[0.05, 2.7, 0.05]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
            </group>

            {/* Corner accents */}
            <group position={[0, 0, 0.08]}>
                {/* Top-left corner */}
                <mesh position={[-2.05, 1.25, 0]}>
                    <boxGeometry args={[0.2, 0.2, 0.02]} />
                    <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} />
                </mesh>
                {/* Top-right corner */}
                <mesh position={[2.05, 1.25, 0]}>
                    <boxGeometry args={[0.2, 0.2, 0.02]} />
                    <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} />
                </mesh>
                {/* Bottom-left corner */}
                <mesh position={[-2.05, -1.25, 0]}>
                    <boxGeometry args={[0.2, 0.2, 0.02]} />
                    <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} />
                </mesh>
                {/* Bottom-right corner */}
                <mesh position={[2.05, -1.25, 0]}>
                    <boxGeometry args={[0.2, 0.2, 0.02]} />
                    <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.8} />
                </mesh>
            </group>

            {/* HTML Content on front face */}
            <Html
                position={[0, 0, 0.15]}
                center
                transform
                distanceFactor={1.5}
                style={{ pointerEvents: 'auto' }}
            >
                <div className="w-[400px] p-4 text-center pointer-events-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-1 tracking-wider">
                        SYSTEM INITIALIZED
                    </h1>
                    <p className="text-cyan-400/60 font-mono text-xs mb-4">
                        SELECT INITIALIZATION PROTOCOL
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => onStart('TOUR')}
                            className="group relative p-4 md:p-3 border border-cyan-500/30 rounded-lg hover:bg-cyan-950/30 active:bg-cyan-950/50 transition-all active:scale-95 hover:border-cyan-400 bg-black/50 pointer-events-auto touch-manipulation"
                        >
                            <div className="absolute inset-0 bg-cyan-400/5 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
                            <h3 className="text-sm font-bold text-cyan-300 mb-1">GUIDED TOUR</h3>
                            <p className="text-gray-400 text-xs hidden md:block">
                                AI Guide introduction
                            </p>
                        </button>

                        <button
                            onClick={() => onStart('FREE')}
                            className="group relative p-4 md:p-3 border border-purple-500/30 rounded-lg hover:bg-purple-950/30 active:bg-purple-950/50 transition-all active:scale-95 hover:border-purple-400 bg-black/50 pointer-events-auto touch-manipulation"
                        >
                            <div className="absolute inset-0 bg-purple-400/5 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
                            <h3 className="text-sm font-bold text-purple-300 mb-1">FREE ROAM</h3>
                            <p className="text-gray-400 text-xs hidden md:block">
                                Explore at your pace
                            </p>
                        </button>
                    </div>
                </div>
            </Html>
        </group>
    );
}
