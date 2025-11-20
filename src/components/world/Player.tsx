"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";
import { PointerLockControls } from "@react-three/drei";
import { inputState } from "@/utils/input";

const SPEED = 5;
const SPRINT_MULTIPLIER = 2.0;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export default function Player({ active = true }: { active?: boolean }) {
    const rigidBody = useRef<RapierRigidBody>(null);
    const { camera } = useThree();
    const [move, setMove] = useState({ forward: false, backward: false, left: false, right: false, sprint: false });

    // Handle keyboard input
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!active) return;
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
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
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
    }, [active]);

    useFrame(() => {
        if (!rigidBody.current) return;

        const velocity = rigidBody.current.linvel();

        // Combine Keyboard + Joystick Input
        const forward = (Number(move.backward) - Number(move.forward)) + inputState.move.y;
        const side = (Number(move.left) - Number(move.right)) - inputState.move.x;

        const isSprinting = move.sprint || inputState.sprint;
        const currentSpeed = SPEED * (isSprinting ? SPRINT_MULTIPLIER : 1);

        // Calculate movement direction relative to camera
        frontVector.set(0, 0, forward);
        sideVector.set(side, 0, 0);
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

    return (
        <>
            <RigidBody ref={rigidBody} colliders={false} mass={1} type="dynamic" position={[0, 5, 10]} enabledRotations={[false, false, false]}>
                <CapsuleCollider args={[0.75, 0.5]} />
            </RigidBody>
            {active && <PointerLockControls />}
        </>
    );
}
