"use client";

import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";
import { PointerLockControls } from "@react-three/drei";
import { inputState } from "@/utils/input";

const SPEED = 5;
const SPRINT_MULTIPLIER = 2.0;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function Player({ interactionMode, isBrowserOpen, canMove = true }: { interactionMode: 'NONE' | 'CHAT' | 'PROJECT', isBrowserOpen?: boolean, canMove?: boolean }) {
    const rigidBody = useRef<RapierRigidBody>(null);
    const { camera } = useThree();
    const [move, setMove] = useState({ forward: false, backward: false, left: false, right: false, sprint: false });
    const controlsRef = useRef<any>(null);
    const [isTyping, setIsTyping] = useState(false);

    // Detect typing to block WASD
    useEffect(() => {
        const handleFocus = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                setIsTyping(true);
            }
        };
        const handleBlur = () => setIsTyping(false);

        window.addEventListener('focus', handleFocus, true);
        window.addEventListener('blur', handleBlur, true);
        return () => {
            window.removeEventListener('focus', handleFocus, true);
            window.removeEventListener('blur', handleBlur, true);
        };
    }, []);

    // Handle pointer lock - Enforce lock on click (but not if game hasn't started)
    useEffect(() => {
        const lockControls = () => {
            if (controlsRef.current && !isTyping && !isBrowserOpen && canMove) {
                controlsRef.current.lock();
            }
        };

        document.addEventListener('click', lockControls);
        return () => document.removeEventListener('click', lockControls);
    }, [isTyping, isBrowserOpen, canMove]);

    // Unlock when typing, browser is open, or movement is blocked
    useEffect(() => {
        if (isTyping || isBrowserOpen || !canMove) {
            document.exitPointerLock();
        }
    }, [isTyping, isBrowserOpen, canMove]);

    // Handle keyboard input (ALWAYS ACTIVE unless typing or movement blocked)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTyping || !canMove) return; // Block WASD when typing or movement disabled

            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                    setMove((m) => ({ ...m, forward: true }));
                    break;
                case "KeyS":
                case "ArrowDown":
                    setMove((m) => ({ ...m, backward: true }));
                    break;
                case "KeyA":
                case "ArrowLeft":
                    setMove((m) => ({ ...m, left: true }));
                    break;
                case "KeyD":
                case "ArrowRight":
                    setMove((m) => ({ ...m, right: true }));
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    setMove((m) => ({ ...m, sprint: true }));
                    break;
                case "KeyE":
                    // Interaction trigger
                    window.dispatchEvent(new CustomEvent('gameInteract'));
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (isTyping || !canMove) return;

            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                    setMove((m) => ({ ...m, forward: false }));
                    break;
                case "KeyS":
                case "ArrowDown":
                    setMove((m) => ({ ...m, backward: false }));
                    break;
                case "KeyA":
                case "ArrowLeft":
                    setMove((m) => ({ ...m, left: false }));
                    break;
                case "KeyD":
                case "ArrowRight":
                    setMove((m) => ({ ...m, right: false }));
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    setMove((m) => ({ ...m, sprint: false }));
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [isTyping, canMove]);

    useFrame(() => {
        if (!rigidBody.current) return;

        const velocity = rigidBody.current.linvel();

        // Combine Keyboard + Joystick Input
        const forwardInput = (Number(move.backward) - Number(move.forward)) + inputState.move.y;
        const sideInput = (Number(move.left) - Number(move.right)) - inputState.move.x;

        const isSprinting = move.sprint || inputState.sprint;
        const currentSpeed = SPEED * (isSprinting ? SPRINT_MULTIPLIER : 1);

        // Calculate movement direction relative to camera
        frontVector.set(0, 0, forwardInput);
        sideVector.set(sideInput, 0, 0);
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(currentSpeed)
            .applyEuler(camera.rotation);

        // Apply velocity (keep Y velocity for gravity)
        rigidBody.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

        // Sync camera to player position
        const translation = rigidBody.current.translation();
        camera.position.set(translation.x, translation.y + 1.6, translation.z);
    });

    // Mobile Look Controls (Always active if not touching UI)
    useEffect(() => {
        let isDragging = false;
        let previousTouch: { x: number; y: number } | null = null;
        const sensitivity = 0.005;

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            // Ignore if touching joystick or UI elements (simplified check)
            if (touch.clientX < window.innerWidth / 2 && touch.clientY > window.innerHeight / 2) return;

            isDragging = true;
            previousTouch = { x: touch.clientX, y: touch.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging || !previousTouch) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - previousTouch.x;
            const deltaY = touch.clientY - previousTouch.y;

            // Rotate camera
            const euler = new THREE.Euler(0, 0, 0, 'YXZ');
            euler.setFromQuaternion(camera.quaternion);

            euler.y -= deltaX * sensitivity;
            euler.x -= deltaY * sensitivity;

            euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));

            camera.quaternion.setFromEuler(euler);

            previousTouch = { x: touch.clientX, y: touch.clientY };
        };

        const handleTouchEnd = () => {
            isDragging = false;
            previousTouch = null;
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [camera]);

    return (
        <>
            <RigidBody ref={rigidBody} colliders={false} mass={1} type="dynamic" position={[0, 5, 15]} enabledRotations={[false, false, false]}>
                <CapsuleCollider args={[0.75, 0.5]} />
            </RigidBody>
            {/* Pointer Lock is active only when NOT interacting with UI, but we allow manual unlock */}
            <PointerLockControls ref={controlsRef} />
        </>
    );
}
