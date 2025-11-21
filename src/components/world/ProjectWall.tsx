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

    const targetPos = isExpanded ? [0, 5, -3] : [x, yPosition, z];
    const targetRot = isExpanded ? [0, 0, 0] : [0, -angle - Math.PI / 2, 0];
    const targetScale = isExpanded ? 1.8 : (hover ? 1.1 : 1);

    const { position, rotation, scale } = useSpring({
        position: targetPos,
        rotation: targetRot,
        scale: targetScale,
        config: { mass: 1, tension: 120, friction: 20 },
    });

    useFrame((state) => {
        if (ref.current && !isExpanded) {
            ref.current.position.y = yPosition + Math.sin(state.clock.elapsedTime + colIndex + row) * 0.1;
        } else if (ref.current && isExpanded) {
            // Keep stable when expanded
            ref.current.position.y = 5;
        }
    });

    const hash = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = (hash % 360);
    const color1 = `hsl(${hue}, 70%, 50%)`;
    const color2 = `hsl(${(hue + 60) % 360}, 70%, 40%)`;

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <a.group ref={ref} position={position as any} rotation={rotation as any} scale={scale as any}
            onClick={(e) => { e.stopPropagation(); onClick(project.id); }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <mesh>
                <boxGeometry args={[CARD_WIDTH, CARD_HEIGHT, 0.05]} />
                <meshStandardMaterial
                    color={isExpanded ? "#00ffff" : (hover ? "#00aaff" : "#004444")}
                    transparent
                    opacity={0.6}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={isExpanded ? "#00ffff" : "#004444"}
                    emissiveIntensity={0.5}
                />
            </mesh>

            <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[CARD_WIDTH - 0.2, CARD_HEIGHT - 0.2]} />
                <meshStandardMaterial
                    color={color1}
                    emissive={color2}
                    emissiveIntensity={0.3}
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>

            <Text
                position={[0, 0.2, 0.04]}
                fontSize={0.8}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="black"
            >
                {project.title.charAt(0)}
            </Text>

            <Text
                position={[0, -CARD_HEIGHT / 2 - 0.3, 0]}
                fontSize={0.18}
                color="#00ffff"
                anchorX="center"
                anchorY="top"
                maxWidth={CARD_WIDTH - 0.2}
                renderOrder={10}
            >
                {project.title}
            </Text>

            {isExpanded && (
                <Html
                    position={[0, -CARD_HEIGHT / 2 - 0.5, 0]}
                    center
                    transform
                    distanceFactor={3}
                    zIndexRange={[100, 0]}
                    style={{ pointerEvents: 'auto' }}
                    occlude
                >
                    <div className="bg-black/90 backdrop-blur-xl p-6 rounded-xl border border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.4)] w-[400px] text-center font-mono pointer-events-auto">
                        <p className="text-cyan-100 mb-4 text-sm">{project.short_desc}</p>
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {project.tags?.map(tag => (
                                <span key={tag} className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded border border-cyan-700/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 pointer-events-auto">
                            {project.url && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.dispatchEvent(new CustomEvent('openBrowser', { detail: { url: project.url } }));
                                    }}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 cursor-pointer pointer-events-auto"
                                >
                                    VISIT
                                </button>
                            )}
                            {project.github_url && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.dispatchEvent(new CustomEvent('openBrowser', { detail: { url: project.github_url } }));
                                    }}
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition-all hover:scale-105 border border-gray-600 cursor-pointer pointer-events-auto"
                                >
                                    GITHUB
                                </button>
                            )}
                        </div>
                    </div>
                </Html>
            )}
        </a.group>
    );
}

export default function ProjectWall() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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
        setExpandedId(expandedId === id ? null : id);
    };

    const rows: Project[][] = [];
    for (let i = 0; i < projects.length; i += PROJECTS_PER_ROW) {
        rows.push(projects.slice(i, i + PROJECTS_PER_ROW));
    }

    return (
        <group position={[0, 0, 0]}>
            <Text
                position={[0, 5, 10]}
                rotation={[0, 0, 0]}
                fontSize={2}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.1}
                outlineColor="#000000"
            >
                PROJECTS
            </Text>

            <mesh position={[0, 0.1, -8]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[6, 10, 64]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>

            {loading && (
                <Text
                    position={[0, 3, -8]}
                    fontSize={0.5}
                    color="#00ffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    LOADING PROJECTS...
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
