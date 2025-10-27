"use client";

import React, { useRef } from 'react';
import { Mesh } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function RotatingBox() {
  const ref = useRef<Mesh | null>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.6;
      ref.current.rotation.x += delta * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0ea5a4" metalness={0.2} roughness={0.4} />
    </mesh>
  );
}

export default function WorldCanvas() {
  return (
    <div style={{ width: '100%', height: '70vh', borderRadius: 8, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} dpr={Math.min(2, window.devicePixelRatio || 1)}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 7]} intensity={0.8} />
        <RotatingBox />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#071026" />
        </mesh>
        <OrbitControls enablePan={true} enableZoom={true} />
      </Canvas>
    </div>
  );
}
