"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Stars, Sparkles, Cloud, Loader } from "@react-three/drei";
import Player from "@/components/world/Player";
import ProjectWall from "@/components/world/ProjectWall";
import NPC from "@/components/world/NPC";
import SearchKiosk from "@/components/world/SearchKiosk";
import AboutSection from "@/components/world/AboutSection";
import WelcomePanel from "@/components/world/WelcomePanel";
import { useGameInteraction } from "@/hooks/useGameInteraction";
import Crosshair from "@/components/ui/Crosshair";

function InteractionHandler({ enabled }: { enabled: boolean }) {
    const { interact } = useGameInteraction();
    const lastInteractTime = React.useRef(0);

    useEffect(() => {
        const handleInteract = () => {
            if (!enabled) return; // Block interactions if not enabled

            const now = Date.now();
            if (now - lastInteractTime.current < 500) {
                console.log("Interaction debounced");
                return;
            }
            lastInteractTime.current = now;
            console.log("Interaction triggered");
            interact();
        };
        window.addEventListener('gameInteract', handleInteract);
        return () => window.removeEventListener('gameInteract', handleInteract);
    }, [interact, enabled]);

    return null;
}

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

export default function GalleryScene({ isBrowserOpen }: { isBrowserOpen?: boolean }) {
    const [chatOpen, setChatOpen] = useState(false);
    const [isProjectExpanded, setIsProjectExpanded] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading completion
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 second loading screen
        return () => clearTimeout(timer);
    }, []);

    // Handlers
    const handleChatToggle = (isOpen: boolean) => {
        setChatOpen(isOpen);
    };

    const handleProjectExpand = (isExpanded: boolean) => {
        setIsProjectExpanded(isExpanded);
    };

    const handleStart = (mode: 'TOUR' | 'FREE') => {
        setGameStarted(true);
        if (mode === 'TOUR') {
            // Small delay to let scene load
            setTimeout(() => setChatOpen(true), 1000);
        }
    };

    const isUIOpen = chatOpen || isProjectExpanded;

    return (
        <>
            <Crosshair />

            {/* Loading Screen */}
            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-cyan-400 mb-4 animate-pulse">LOADING WORLD...</h1>
                        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>
            )}

            <Loader />
            <Canvas shadows camera={{ fov: 75 }}>
                <Suspense fallback={null}>
                    {/* Cyberpunk Lighting */}
                    <color attach="background" args={['#020205']} />
                    <fog attach="fog" args={['#020205', 10, 50]} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[0, 15, 0]} intensity={2} distance={40} color="#00ffff" />
                    <pointLight position={[-20, 5, -20]} intensity={1.5} distance={30} color="#ff00ff" />
                    <pointLight position={[20, 5, 20]} intensity={1.5} distance={30} color="#00ffff" />

                    {/* Environment */}
                    <Stars radius={200} depth={50} count={10000} factor={6} saturation={0} fade speed={0.5} />
                    <Sparkles count={500} scale={60} size={4} speed={0.2} opacity={0.5} color="#00ffff" />

                    {/* Interaction System */}
                    <InteractionHandler enabled={gameStarted} />
                    <Cloud opacity={0.1} speed={0.1} bounds={[30, 5, 30]} segments={10} position={[0, 20, -20]} color="#101010" />

                    <Physics gravity={[0, -9.81, 0]}>
                        <Player interactionMode={isUIOpen ? 'CHAT' : 'NONE'} isBrowserOpen={isBrowserOpen} canMove={gameStarted} />
                        <Floor />
                        <Ceiling />
                        <Walls />
                        <ProjectWall onExpandStateChange={handleProjectExpand} />
                        <SearchKiosk />
                        <AboutSection />
                        <NPC chatOpen={chatOpen} setChatOpen={handleChatToggle} />

                        {/* 3D Welcome Panel - appears after loading, before game starts */}
                        {!isLoading && !gameStarted && <WelcomePanel onStart={handleStart} />}
                    </Physics>
                </Suspense>
            </Canvas>
        </>
    );
}
