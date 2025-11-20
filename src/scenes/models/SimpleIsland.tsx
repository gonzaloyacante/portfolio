"use client";

import React from 'react';
import { useGLTF } from '@react-three/drei';

type Props = { url?: string };

function ModelLoader({ url }: { url: string }) {
  const gltf = useGLTF(url) as unknown as { scene?: unknown };
  if (gltf && gltf.scene) return <primitive object={gltf.scene} />;
  return null;
}

export default function SimpleIsland({ url }: Props) {
  if (!url) {
    return (
      <group>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#064e3b" />
        </mesh>
      </group>
    );
  }

  return (
    <React.Suspense fallback={(
      <group>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[2, 0.5, 2]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </group>
    )}>
      <ModelLoader url={url} />
    </React.Suspense>
  );
}
