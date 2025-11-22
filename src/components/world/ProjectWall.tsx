"use client";

import React, { useState, useEffect, useRef } from "react";
import { Text, Html } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Project } from "@/types";
import { fetchGitHubRepos } from "@/services/githubService";

const PROJECTS_PER_ROW = 6;
const CARD_WIDTH = 3;
const CARD_HEIGHT = 2;

function ProjectCard({
    project,
    row,
    colIndex,
    totalInRow,
    expandedId,
    onClick,
}: {
    project: Project;
    row: number;
    colIndex: number;
    totalInRow: number;
    expandedId: string | null;
    onClick: (id: string) => void;
}) {
    const isExpanded = expandedId === project.id;
    const ref = useRef<THREE.Group>(null);
    const [hover, setHover] = useState(false);

    const radius = 8 + row * 1;
    const yPosition = 2.5 + row * 2.5;

    const angleSpread = Math.PI * 0.8;
    const angleStep = angleSpread / Math.max(totalInRow - 1, 1);
    const angle = -Math.PI / 2 - (angleSpread / 2) + (colIndex * angleStep);

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    // Target positions
    const targetPos = isExpanded ? [0, 5, -2] : [x, yPosition, z];
    const targetRot = isExpanded ? [0, 0, 0] : [0, -angle - Math.PI / 2, 0];
    // Scale up slightly on hover, more on expand
    const targetScale = isExpanded ? 1.5 : (hover ? 1.1 : 1);

    const { position, rotation, scale } = useSpring({
        position: targetPos,
        rotation: targetRot,
        scale: targetScale,
        config: { mass: 1, tension: 120, friction: 20 },
    });

    // Drawer Animation
    const { drawerY } = useSpring({
        drawerY: isExpanded ? -1.5 : 0,
        config: { mass: 1, tension: 100, friction: 20 }
    });

    useFrame((state) => {
        if (ref.current && !isExpanded) {
            ref.current.position.y = yPosition + Math.sin(state.clock.elapsedTime + colIndex + row) * 0.1;
        }
    });

    const hash = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = (hash % 360);
    const color1 = `hsl(${hue}, 70%, 50%)`;

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <a.group
            ref={ref}
            position={position as any}
            rotation={rotation as any}
            scale={scale as any}
            onClick={(e) => { e.stopPropagation(); onClick(project.id); }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            userData={{ interactive: true, onClick: () => onClick(project.id) }}
        >
            {/* 1. Main Frame with Neon Border */}
            <mesh>
                <boxGeometry args={[CARD_WIDTH, CARD_HEIGHT, 0.1]} />
                <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Neon Edges */}
            <mesh>
                <boxGeometry args={[CARD_WIDTH + 0.05, CARD_HEIGHT + 0.05, 0.08]} />
                <meshBasicMaterial
                    color={isExpanded ? "#ff00ff" : (hover ? "#00ffff" : "#004444")}
                    wireframe
                />
            </mesh>

            {/* 2. Screen (Image Placeholder) */}
            <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={[CARD_WIDTH - 0.2, CARD_HEIGHT - 0.2]} />
                <meshStandardMaterial
                    color={color1}
                    emissive={color1}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Title on Screen */}
            <Text
                position={[0, 0, 0.07]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={CARD_WIDTH - 0.4}
            >
                {project.title}
            </Text>

            {/* 3. Sliding Drawer */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <a.group position-y={drawerY as any} position-z={-0.05}>
                <mesh position={[0, -CARD_HEIGHT / 2, 0]}>
                    <boxGeometry args={[CARD_WIDTH * 0.9, 1.5, 0.05]} />
                    <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Drawer Content (Only visible when expanded) */}
                {isExpanded && (
                    <Html
                        position={[0, -CARD_HEIGHT / 2 - 0.5, 0.1]}
                        center
                        transform
                        distanceFactor={3}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <div className="w-[300px] p-4 text-center font-mono pointer-events-auto">
                            <p className="text-cyan-300 text-xs mb-2">{project.short_desc}</p>
                            <div className="flex justify-center gap-2 mt-2 pointer-events-auto">
                                {project.url && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.dispatchEvent(new CustomEvent('openBrowser', { detail: { url: project.url } }));
                                        }}
                                        className="bg-cyan-600 text-white text-xs px-3 py-1 rounded hover:bg-cyan-500 pointer-events-auto"
                                    >
                                        VISIT
                                    </button>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onClick(project.id);
                                    }}
                                    className="bg-red-900 text-white text-xs px-3 py-1 rounded hover:bg-red-700 pointer-events-auto"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </Html>
                )}
            </a.group>
        </a.group>
    );
}

export default function ProjectWall({ onExpandStateChange }: { onExpandStateChange?: (expanded: boolean) => void }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Listen for 'E' key to close if expanded
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'KeyE' && expandedId) {
                setExpandedId(null);
                if (onExpandStateChange) onExpandStateChange(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [expandedId, onExpandStateChange]);

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            const githubProjects = await fetchGitHubRepos();

            if (githubProjects.length > 0) {
                setProjects(githubProjects);
            }
            setLoading(false);
        };

        loadProjects();
    }, []);

    const handleCardClick = (id: string) => {
        const newExpandedId = expandedId === id ? null : id;
        setExpandedId(newExpandedId);
        if (onExpandStateChange) {
            onExpandStateChange(!!newExpandedId);
        }
    };

    const rows: Project[][] = [];
    for (let i = 0; i < projects.length; i += PROJECTS_PER_ROW) {
        rows.push(projects.slice(i, i + PROJECTS_PER_ROW));
    }

    return (
        <group position={[0, 0, 0]}>
            {/* Header Title - Improved */}
            <group position={[0, 8, -5]}>
                <Text
                    fontSize={1.5}
                    color="#00ffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#004444"
                >
                    PROJECT DATABASE
                </Text>
                <Text
                    position={[0, -0.8, 0]}
                    fontSize={0.4}
                    color="#00aaaa"
                    anchorX="center"
                    anchorY="middle"
                >
                    SELECT A MODULE TO INSPECT
                </Text>
            </group>

            <mesh position={[0, 0.1, -8]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[6, 10, 64]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>

            {loading && (
                <Text
                    position={[0, 3, -8]}
                    fontSize={0.5}
                    color="#00ffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    LOADING DATA STREAMS...
                </Text>
            )}

            {rows.map((rowProjects, rowIndex) =>
                rowProjects.map((project, colIndex) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        row={rowIndex}
                        colIndex={colIndex}
                        totalInRow={rowProjects.length}
                        expandedId={expandedId}
                        onClick={handleCardClick}
                    />
                ))
            )}
        </group>
    );
}
