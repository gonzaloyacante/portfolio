import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import ChatInterface from "@/components/ui/ChatInterface";

export default function NPC({ chatOpen, setChatOpen }: { chatOpen: boolean; setChatOpen: (v: boolean) => void }) {
    const ref = useRef<THREE.Group>(null);
    const [hover, setHover] = useState(false);
    const [isGazing, setIsGazing] = useState(false);
    const { camera, raycaster } = useThree();

    useFrame((state) => {
        if (ref.current) {
            // Floating animation
            ref.current.position.y = 2 + Math.sin(state.clock.elapsedTime) * 0.2;
            // Rotate slowly
            ref.current.rotation.y += 0.01;

            // Gaze Detection
            // Cast ray from center of screen (0,0)
            raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
            const intersects = raycaster.intersectObjects(ref.current.children, true);

            const isLooking = intersects.length > 0;
            if (isLooking !== isGazing) {
                setIsGazing(isLooking);
                setHover(isLooking); // Sync hover state with gaze
            }
        }
    });

    const { scale } = useSpring({
        scale: hover || isGazing ? 1.2 : 1,
        config: { tension: 300, friction: 10 },
    });

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to find a robotic or futuristic voice
            const voices = window.speechSynthesis.getVoices();
            const futuristicVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft David')) || voices[0];
            utterance.voice = futuristicVoice;
            utterance.pitch = 0.8; // Lower pitch for robot effect
            utterance.rate = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleInteract = () => {
        if (!chatOpen) {
            setChatOpen(true);
            speak("Greetings, traveler. I am the guardian of this portfolio. How may I assist you?");
        }
    };

    return (
        <a.group
            ref={ref}
            position={[0, 2, 0]} // Centered in room
            scale={scale}
            onClick={(e) => {
                e.stopPropagation();
                handleInteract();
            }}
            userData={{ interactive: true, onClick: handleInteract }}
        >
            {/* Core - Improved Visuals */}
            <mesh>
                <icosahedronGeometry args={[0.4, 0]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={2}
                    wireframe
                />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
            </mesh>

            {/* Floating Particles/Rings */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.6, 0.01, 16, 100]} />
                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
            </mesh>
            <mesh rotation={[-Math.PI / 3, 0, 0]}>
                <torusGeometry args={[0.7, 0.01, 16, 100]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.8, 0.01, 16, 100]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
            </mesh>

            {/* Gaze Prompt */}
            {!chatOpen && isGazing && (
                <Html position={[0, 1, 0]} center distanceFactor={10}>
                    <div className="bg-black/80 text-cyan-400 px-3 py-2 rounded border border-cyan-500 text-sm font-mono whitespace-nowrap animate-pulse">
                        [ PRESS E TO INTERACT ]
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
