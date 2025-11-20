"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import ChatInterface from "@/components/ui/ChatInterface";

export default function NPC({ chatOpen, setChatOpen }: { chatOpen: boolean; setChatOpen: (v: boolean) => void }) {
    const ref = useRef<THREE.Group>(null);
    const [hover, setHover] = useState(false);

    useFrame((state) => {
        if (ref.current) {
            // Floating animation
            ref.current.position.y = 2 + Math.sin(state.clock.elapsedTime) * 0.2;
            // Rotate slowly
            ref.current.rotation.y += 0.01;
        }
    });

    const { scale } = useSpring({
        scale: hover ? 1.2 : 1,
        config: { tension: 300, friction: 10 },
    });

    return (
        <a.group
            ref={ref}
            position={[0, 2, 0]} // Centered in room
            scale={scale}
            onClick={(e) => {
                e.stopPropagation();
                setChatOpen(!chatOpen);
            }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Core */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
            </mesh>

            {/* Rings */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.5, 0.02, 16, 100]} />
                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
            </mesh>
            <mesh rotation={[-Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.6, 0.02, 16, 100]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
            </mesh>

            {/* Label */}
            {!chatOpen && (
                <Html position={[0, 0.8, 0]} center distanceFactor={10}>
                    <div className="bg-black/80 text-cyan-400 px-2 py-1 rounded border border-cyan-500 text-xs font-mono whitespace-nowrap pointer-events-none">
                        AI ASSISTANT
                    </div>
                </Html>
            )}

            {/* 3D Chat Interface */}
            {chatOpen && (
                <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                    <Html position={[1.5, 0, 0]} transform distanceFactor={4} occlude>
                        <ChatInterface onClose={() => setChatOpen(false)} />
                    </Html>
                </Billboard>
            )}
        </a.group>
    );
}
