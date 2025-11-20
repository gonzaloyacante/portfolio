/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, useGLTF, Html } from '@react-three/drei'
import ScreenBrowser from '@/components/ScreenBrowser'
import { useSpring, a } from '@react-spring/three'
import type { Mesh } from 'three'

// NOTE: expects public/level-react-draco.glb to exist

export function Level() {
  // useGLTF typing can be complex; keep any to avoid TS noise
  const { nodes }: any = useGLTF('/level-react-draco.glb')
  // Dev helper: print node names so we can identify screen mesh when running locally
  useEffect(() => {
    if (typeof window !== 'undefined' && nodes) {
      // dev helper: list the node keys so we can identify the monitor mesh name while running locally
  console.log('level-react-draco.glb nodes:', Object.keys(nodes))
    }
  }, [nodes])

  // Try common node names for the monitor/screen inside the GLB. If found, mount the Html there.
  const candidates = ['Monitor', 'Screen', 'Display', 'Cube008_2', 'Cube008', 'Screen_1', 'Monitor_1']
  let found: any = null
  for (const name of candidates) {
    if (nodes && nodes[name]) {
      found = nodes[name]
      break
    }
  }
  // dev: what did we find?
  useEffect(() => {
    if (typeof window !== 'undefined') console.log('Level: chosen screen node ->', found && found.name)
  }, [found])

  return (
    <>
      <mesh geometry={nodes.Level.geometry} material={nodes.Level.material} position={[-0.38, 0.69, 0.62]} rotation={[Math.PI / 2, -Math.PI / 9, 0]} />
      {found ? (
        // Render the screen mesh and place the Html as its child so the content "sticks" to the surface
        <mesh geometry={found.geometry} material={found.material} position={found.position?.toArray?.() || undefined} rotation={found.rotation?.toArray?.() || undefined} scale={found.scale?.toArray?.() || undefined}>
          {/* emissive plane to simulate screen power/brightness (make brighter to verify) */}
          <mesh position={[0, 0, 0.02]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.55, 0.39]} />
            <meshStandardMaterial emissive={'#bfe9ff'} emissiveIntensity={6} toneMapped={false} transparent opacity={0.98} />
          </mesh>
          {/* Place the HTML directly in front of the screen without an extra -Math.PI/2 rotation.
              Adjust position slightly forward so it doesn't z-fight with the screen geometry. */}
          <Html className="content" position={[0, 0, 0.04]} transform occlude>
            <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
              {/* If URL contains ?screenTest=iframe render an iframe for quick debugging
                  Example: http://localhost:3000/?screenTest=iframe */}
              {typeof window !== 'undefined' && window.location.search.includes('screenTest=iframe') ? (
                <iframe
                  title="screen-test"
                  src="https://example.com"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              ) : (
                <ScreenBrowser />
              )}
            </div>
          </Html>
        </mesh>
      ) : (
        // fallback: approximate placement near the desk monitor
        <Html position={[0.4, 0.8, 0]} transform occlude>
          <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
            <ScreenBrowser />
          </div>
        </Html>
      )}
    </>
  )
}

export function Sudo() {
  const { nodes }: any = useGLTF('/level-react-draco.glb')
  const [spring, api] = useSpring(() => ({ rotation: [Math.PI / 2, 0, 0.29], config: { friction: 40 } }), [])
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const wander = () => {
      api.start({ rotation: [Math.PI / 2 + THREE.MathUtils.randFloatSpread(2) * 0.3, 0, 0.29 + THREE.MathUtils.randFloatSpread(2) * 0.2] })
      timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [api])
  return (
    <>
  <mesh geometry={nodes.Sudo.geometry} material={nodes.Sudo.material} position={[0.68, 0.33, -0.67]} rotation={[Math.PI / 2, 0, 0.29]} />
  {/* react-spring types are strict; cast to any to satisfy TS here */}
  <a.mesh geometry={nodes.SudoHead.geometry} material={nodes.SudoHead.material} position={[0.68, 0.33, -0.67]} {...(spring as any)} />
    </>
  )
}

export function Camera() {
  const { nodes, materials }: any = useGLTF('/level-react-draco.glb')
  const [spring, api] = useSpring(() => ({ 'rotation-z': 0, config: { friction: 40 } }), [])
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    const wander = () => {
      api.start({ 'rotation-z': Math.random() })
      timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [api])
  return (
    <a.group position={[-0.58, 0.83, -0.03]} rotation={[Math.PI / 2, 0, 0.47]} {...(spring as any)}>
      <mesh geometry={nodes.Camera.geometry} material={nodes.Camera.material} />
      <mesh geometry={nodes.Camera_1.geometry} material={materials.Lens} />
    </a.group>
  )
}

export function Cactus() {
  const { nodes, materials }: any = useGLTF('/level-react-draco.glb')
  return (
    <mesh geometry={nodes.Cactus.geometry} position={[-0.42, 0.51, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
      <MeshWobbleMaterial factor={0.4} map={materials.Cactus.map} />
    </mesh>
  )
}

export function Box({ scale = 1, ...props }: any) {
  const ref = useRef<Mesh | null>(null)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x = ref.current.rotation.y + delta
    ref.current.rotation.y += delta
  })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={(clicked ? 1.5 : 1) * scale}
      onClick={() => click(!clicked)}
      onPointerOver={(event: any) => (event.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}>
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

// ensure three's GLTF loader is preloaded when used; export nothing else
