"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const center = new THREE.Vector2(0, 0);

export function useGameInteraction() {
    const { camera, scene } = useThree();
    const hoveredObjectRef = useRef<THREE.Object3D | null>(null);
    const lastHoveredIdRef = useRef<string | null>(null);

    useFrame(() => {
        // Cast ray from center of screen
        raycaster.setFromCamera(center, camera);

        // Get all intersections
        const intersects = raycaster.intersectObjects(scene.children, true);

        let newHoveredObject: THREE.Object3D | null = null;

        if (intersects.length > 0) {
            const first = intersects[0].object;

            // Find the parent group with userData
            let current: THREE.Object3D | null = first;
            while (current) {
                if (current.userData && current.userData.interactive) {
                    newHoveredObject = current;
                    break;
                }
                current = current.parent;
            }
        }

        hoveredObjectRef.current = newHoveredObject;

        // Emit event if hover state changes
        const newId = newHoveredObject ? newHoveredObject.uuid : null;
        if (newId !== lastHoveredIdRef.current) {
            lastHoveredIdRef.current = newId;
            window.dispatchEvent(new CustomEvent('interactionStateChange', {
                detail: { hasTarget: !!newHoveredObject }
            }));
        }
    });

    const interact = () => {
        if (hoveredObjectRef.current) {
            const userData = hoveredObjectRef.current.userData;
            if (userData.onClick) {
                userData.onClick();
            }
        }
    };

    return { interact, hoveredObject: hoveredObjectRef.current };
}
