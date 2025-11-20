"use client";

import React, { useState, useEffect } from "react";
import { Text, Image, Html } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { Project } from "@/types";
import { getProjects } from "@/services/api";

// Mock projects if API fails or is empty for demo
const MOCK_PROJECTS: Project[] = Array.from({ length: 9 }).map((_, i) => ({
    id: `proj-${i}`,
    title: `Project ${i + 1}`,
    short_desc: "A revolutionary project that changes everything.",
    url: "https://example.com",
    github_url: "https://github.com",
    tags: ["React", "Three.js", "Next.js"],
    image_url: `https://picsum.photos/seed/${i}/400/300`,
}));

const GAP = 0.2;
const CARD_WIDTH = 3;
const CARD_HEIGHT = 2;

function ProjectCard({
    project,
    index,
    expandedId,
    onClick,
    totalCols = 3,
}: {
    project: Project;
    index: number;
    expandedId: string | null;
    onClick: (id: string) => void;
    totalCols?: number;
}) {
    const isExpanded = expandedId === project.id;
    const isAnyExpanded = expandedId !== null;

    // Calculate base grid position
    const col = index % totalCols;
    const row = Math.floor(index / totalCols);

    // Center the grid
    const startX = -((totalCols * (CARD_WIDTH + GAP)) / 2) + CARD_WIDTH / 2;
    const startY = 6;

    let targetX = startX + col * (CARD_WIDTH + GAP);
    let targetY = startY - row * (CARD_HEIGHT + GAP);
    let targetZ = 0;
    let targetScale = 1;

    // Dynamic layout logic
    if (isExpanded) {
        targetX = 0;
        targetY = 6;
        targetZ = 2;
        targetScale = 2.5;
    } else if (isAnyExpanded) {
        const expandedIndex = MOCK_PROJECTS.findIndex(p => p.id === expandedId);
        const expCol = expandedIndex % totalCols;
        const expRow = Math.floor(expandedIndex / totalCols);

        if (col < expCol) targetX -= 4;
        if (col > expCol) targetX += 4;
        if (row < expRow) targetY += 3;
        if (row > expRow) targetY -= 3;

        targetZ = -1;
        targetScale = 0.8;
    }

    const { position, scale } = useSpring({
        position: [targetX, targetY, targetZ],
        scale: targetScale,
        config: { mass: 1, tension: 170, friction: 26 },
    });

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <a.group position={position as any} scale={scale as any} onClick={(e) => { e.stopPropagation(); onClick(project.id); }}>
            {/* Frame */}
            <mesh>
                <boxGeometry args={[CARD_WIDTH, CARD_HEIGHT, 0.1]} />
                <meshStandardMaterial color={isExpanded ? "#1a1a1a" : "#222"} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Image */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
                url={project.image_url || "https://picsum.photos/400/300"}
                position={[0, 0.2, 0.06]}
                scale={[CARD_WIDTH - 0.2, CARD_HEIGHT - 0.8]}
                transparent
                opacity={isExpanded ? 1 : 0.8}
            />

            {/* Title */}
            <Text
                position={[0, -0.8, 0.06]}
                fontSize={0.15}
                color="#00ffff"
                maxWidth={CARD_WIDTH - 0.2}
                anchorX="center"
                anchorY="middle"
            >
                {project.title}
            </Text>

            {/* Expanded Details */}
            {isExpanded && (
                <group position={[0, -1.2, 0.1]}>
                    <Html transform distanceFactor={2} position={[0, 0, 0]}>
                        <div className="bg-black/90 p-4 rounded border border-cyan-500 w-64 text-center">
                            <p className="text-gray-300 text-xs mb-2">{project.short_desc}</p>
                            <div className="flex flex-wrap justify-center gap-1 mb-3">
                                {project.tags?.map(tag => (
                                    <span key={tag} className="text-[10px] bg-cyan-900 text-cyan-200 px-1 rounded">{tag}</span>
                                ))}
                            </div>
                            <div className="flex justify-center gap-2">
                                {project.url && (
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-3 py-1 rounded transition-colors">
                                        Visit
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition-colors">
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </Html>
                </group>
            )}
        </a.group>
    );
}

export default function ProjectWall() {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        getProjects().then((data) => {
            if (data && data.length > 0) setProjects(data);
        }).catch(() => {
            // Keep mock data
        });
    }, []);

    const handleCardClick = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <group position={[0, 0, -10]}>
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    expandedId={expandedId}
                    onClick={handleCardClick}
                />
            ))}
        </group>
    );
}
