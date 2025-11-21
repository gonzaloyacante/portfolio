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

    return (
        <a.group
            ref={ref}
            position={[0, 2, 0]} // Centered in room
            scale={scale}
            onClick={(e) => {
                e.stopPropagation();
                if (isGazing && !chatOpen) {
                    setChatOpen(true);
                }
            }}
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

            {/* Gaze Prompt */}
            {!chatOpen && isGazing && (
                <Html position={[0, 0.8, 0]} center distanceFactor={10}>
                    <div className="bg-black/80 text-cyan-400 px-3 py-2 rounded border border-cyan-500 text-sm font-mono whitespace-nowrap animate-pulse">
                        [ CLICK TO INTERACT ]
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
