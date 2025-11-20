"use client";

import React, { useState } from "react";
import { Html } from "@react-three/drei";
import SemanticSearch from "@/components/SemanticSearch";

export default function SearchKiosk() {
    const [hover, setHover] = useState(false);

    return (
        <group position={[0, 0, 0]} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
            {/* Podium Base */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[2, 2, 1]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Screen Frame */}
            <mesh position={[0, 2.5, 0]} rotation={[-Math.PI / 6, 0, 0]}>
                <boxGeometry args={[3, 2, 0.2]} />
                <meshStandardMaterial color={hover ? "#333" : "#111"} metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Screen Content */}
            <Html
                position={[0, 2.5, 0.11]}
                rotation={[-Math.PI / 6, 0, 0]}
                transform
                occlude
                distanceFactor={3}
                style={{ width: "600px", height: "400px" }}
            >
                <div className="w-full h-full bg-black/90 p-4 rounded-lg border border-cyan-500/30 overflow-hidden">
                    <h3 className="text-cyan-400 font-mono text-xl mb-4 text-center">PROJECT DATABASE</h3>
                    <SemanticSearch />
                </div>
            </Html>
        </group>
    );
}
