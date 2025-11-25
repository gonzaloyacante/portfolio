"use client";
"use client";
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointerLockControls, Html } from '@react-three/drei';
import type { Mesh } from 'three';
import { Color } from 'three';
import ProjectModal from '@/components/world/ProjectModal';

/*
  Room scene: simple box-shaped room with floor, walls, a hanging lamp and a table.
  Keeps PointerLockControls and clickable screen mesh that opens ProjectModal.
*/

function RoomFloor() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial color="#222" metalness={0.1} roughness={0.8} />
    </mesh>
  );
}

function RoomWalls() {
  // simple four walls built from boxes
  return (
    <group>
      {/* back wall */}
      <mesh position={[0, 2.2, -6]}>
        <boxGeometry args={[12, 4.4, 0.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      {/* front wall */}
      <mesh position={[0, 2.2, 6]}>
        <boxGeometry args={[12, 4.4, 0.2]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      {/* left */}
      <mesh position={[-6, 2.2, 0]}> 
        <boxGeometry args={[0.2, 4.4, 12]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      {/* right */}
      <mesh position={[6, 2.2, 0]}> 
        <boxGeometry args={[0.2, 4.4, 12]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>
      {/* ceiling */}
      <mesh position={[0, 4.4, 0]}> 
        <boxGeometry args={[12, 0.2, 12]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>
    </group>
  );
}

function Lamp() {
  const ref = useRef<Mesh | null>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = Math.sin(t * 0.6) * 0.05;
  });
  return (
    <group>
      <mesh position={[0, 3.6, 0]} ref={ref}>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <pointLight position={[0, 3.0, 0]} intensity={1.2} distance={8} color={new Color('#ffdca3')} castShadow />
      <mesh position={[0, 2.6, 0]}> 
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial emissive={'#ffdca3' as unknown as Color} emissiveIntensity={1} color="#222" />
      </mesh>
    </group>
  );
}

function Table() {
  return (
    <group position={[ -0.8, 0.55, 0 ]}>
      <mesh position={[0, 0.4, 0]}> 
        <boxGeometry args={[2.4, 0.1, 1.2]} />
        <meshStandardMaterial color="#6b3e26" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* legs */}
      <mesh position={[1.05, -0.05, 0.45]}> <boxGeometry args={[0.1, 0.8, 0.1]} /><meshStandardMaterial color="#3b2b20" /></mesh>
      <mesh position={[1.05, -0.05, -0.45]}> <boxGeometry args={[0.1, 0.8, 0.1]} /><meshStandardMaterial color="#3b2b20" /></mesh>
      <mesh position={[-1.05, -0.05, 0.45]}> <boxGeometry args={[0.1, 0.8, 0.1]} /><meshStandardMaterial color="#3b2b20" /></mesh>
      <mesh position={[-1.05, -0.05, -0.45]}> <boxGeometry args={[0.1, 0.8, 0.1]} /><meshStandardMaterial color="#3b2b20" /></mesh>
    </group>
  );
}

function Screen({ onClick }: { onClick: () => void }) {
  const ref = useRef<Mesh | null>(null);
  useFrame(() => {
    if (ref.current) (ref.current as Mesh).rotation.y += 0.002;
  });
  return (
    <mesh ref={ref} position={[ -0.8, 1.2, 0.53 ]} onClick={(e) => { e.stopPropagation(); onClick(); }} castShadow>
      <boxGeometry args={[1.2, 0.7, 0.05]} />
      <meshStandardMaterial color="#0f172a" metalness={0.1} roughness={0.2} />
      <Html distanceFactor={6} position={[0, 0, 0.06]}>
        <div style={{ width: 220, height: 120, display:'flex', alignItems:'center', justifyContent:'center', color:'white', background:'linear-gradient(90deg,#0ea5a4,#0284c7)', borderRadius:6 }}>Proyectos</div>
      </Html>
    </mesh>
  );
}

export default function WorldCanvas() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleScreenClick = () => {
    // placeholder id until we map to real projects
    setSelectedProject('frontend');
    setShowModal(true);
  };


  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 60 }}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 5, 2]} intensity={0.6} />
        <Suspense fallback={null}>
          <RoomFloor />
          <RoomWalls />
          <Lamp />
          <Table />
          <Screen onClick={handleScreenClick} />
        </Suspense>
  <PointerLockControls />
      </Canvas>

      {/* Small overlay with brief instructions */}
      <div style={{ position: 'absolute', left: 12, bottom: 18, zIndex: 60, color: 'white', fontSize: 13, background: 'rgba(0,0,0,0.4)', padding: '8px 10px', borderRadius: 6 }}>
        Click dentro del mundo y mueve el ratón para mirar. Presiona ESC para soltar.
      </div>

      {showModal && selectedProject && (
        <ProjectModal id={selectedProject} onClose={() => { setShowModal(false); setSelectedProject(null); }} />
      )}
    </div>
  );
}
