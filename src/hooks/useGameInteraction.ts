"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const center = new THREE.Vector2(0, 0);

export function useGameInteraction() {
    const { camera, scene } = useThree();
    const hoveredObjectRef = useRef<THREE.Object3D | null>(null);
    const hoveredDOMElementRef = useRef<HTMLElement | null>(null);
    const lastHoveredIdRef = useRef<string | null>(null);

    // Add tap-to-interact for mobile
    useEffect(() => {
        const handleCanvasTap = (e: TouchEvent) => {
            // Ignore if touching UI elements (joystick, buttons)
            const target = e.target as HTMLElement;
            if (target.closest('.pointer-events-auto')) return;

            // Check if we're tapping on an interactive object
            if (hoveredObjectRef.current) {
                const userData = hoveredObjectRef.current.userData;
                if (userData.onClick) {
                    userData.onClick();
                }
            }
        };

        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.addEventListener('touchend', handleCanvasTap, { passive: true });
            return () => canvas.removeEventListener('touchend', handleCanvasTap);
        }
    }, []);

    useFrame(() => {
        // 1. DOM Raycasting (Virtual Cursor)
        // Check what's at the center of the screen in the HTML layer
        const domElement = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2) as HTMLElement;
        let interactiveDOMElement: HTMLElement | null = null;

        if (domElement) {
            // Traverse up to find clickable elements
            let current: HTMLElement | null = domElement;
            while (current && current !== document.body) {
                const tag = current.tagName;
                if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'TEXTAREA' || current.getAttribute('role') === 'button') {
                    interactiveDOMElement = current;
                    break;
                }
                current = current.parentElement;
            }
        }
        hoveredDOMElementRef.current = interactiveDOMElement;

        // 2. Three.js Raycasting
        raycaster.setFromCamera(center, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        let newHoveredObject: THREE.Object3D | null = null;

        if (intersects.length > 0) {
            const first = intersects[0].object;
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

        // 3. Emit State Change
        // We have a target if EITHER a mesh OR a DOM element is hovered
        const hasTarget = !!newHoveredObject || !!interactiveDOMElement;

        // Simple check to avoid spamming events (using a combined ID or just boolean change)
        const currentId = (newHoveredObject?.uuid || '') + (interactiveDOMElement?.id || interactiveDOMElement?.tagName || '');

        if (currentId !== lastHoveredIdRef.current) {
            lastHoveredIdRef.current = currentId;
            window.dispatchEvent(new CustomEvent('interactionStateChange', {
                detail: { hasTarget }
            }));
        }
    });

    const interact = () => {
        // Priority: DOM Elements first (they are usually "on top")
        if (hoveredDOMElementRef.current) {
            hoveredDOMElementRef.current.click();
            if (hoveredDOMElementRef.current.tagName === 'INPUT' || hoveredDOMElementRef.current.tagName === 'TEXTAREA') {
                hoveredDOMElementRef.current.focus();
            }
            return; // Stop here, don't click the 3D object behind it
        }

        // Fallback: 3D Objects
        if (hoveredObjectRef.current) {
            const userData = hoveredObjectRef.current.userData;
            if (userData.onClick) {
                userData.onClick();
            }
        }
    };

    return { interact, hoveredObject: hoveredObjectRef.current };
}
