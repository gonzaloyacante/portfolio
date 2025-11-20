"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Stars, Sparkles, Cloud } from "@react-three/drei";
import Player from "@/components/world/Player";
import ProjectWall from "@/components/world/ProjectWall";
import NPC from "@/components/world/NPC";
import SearchKiosk from "@/components/world/SearchKiosk";

function Floor() {
    return (
        <RigidBody type="fixed" friction={2}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    color="#050505"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>
            {/* Grid pattern overlay */}
            <gridHelper args={[100, 50, "#00ffff", "#1a1a1a"]} position={[0, 0.01, 0]} />
        </RigidBody>
    );
}

function Walls() {
    return (
        <RigidBody type="fixed">
            <group>
                {/* Back Wall (Project Wall) */}
                <mesh position={[0, 10, -40]}>
                    <boxGeometry args={[80, 20, 1]} />
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Front Wall */}
                <mesh position={[0, 10, 40]}>
                    <boxGeometry args={[80, 20, 1]} />
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Left Wall */}
                <mesh position={[-40, 10, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[80, 20, 1]} />
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Right Wall */}
                <mesh position={[40, 10, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <boxGeometry args={[80, 20, 1]} />
                    <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        </RigidBody>
    );
}

function Ceiling() {
    return (
        <RigidBody type="fixed">
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 20, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} side={2} />
            </mesh>
        </RigidBody>
    );
}

export default function GalleryScene() {
    const [chatOpen, setChatOpen] = React.useState(false);

    return (
        <>
            <Canvas shadows camera={{ fov: 75 }}>
                <Suspense fallback={null}>
                    {/* Futuristic Lighting */}
                    <ambientLight intensity={0.1} />
                    <pointLight position={[0, 15, 0]} intensity={1.5} distance={40} color="#00ffff" />
                    <pointLight position={[-20, 5, -20]} intensity={0.8} distance={30} color="#ff00ff" />
                    <pointLight position={[20, 5, 20]} intensity={0.8} distance={30} color="#00ffff" />

                    {/* Environment */}
                    <Stars radius={200} depth={50} count={10000} factor={6} saturation={0} fade speed={0.5} />
                    <Sparkles count={300} scale={60} size={3} speed={0.2} opacity={0.4} color="#00ffff" />
                    <Cloud opacity={0.2} speed={0.1} bounds={[30, 5, 30]} segments={10} position={[0, 20, -20]} color="#101010" />

                    <Physics gravity={[0, -9.81, 0]}>
                        <Player active={!chatOpen} />
                        <Floor />
                        <Ceiling />
                        <Walls />
                        <ProjectWall />
                        <SearchKiosk />
                        <NPC chatOpen={chatOpen} setChatOpen={setChatOpen} />
                    </Physics>
                </Suspense>
            </Canvas>
        </>
    );
}
