import React from 'react';
import dynamic from 'next/dynamic';

const SimpleIsland = dynamic(() => import('@/scenes/models/SimpleIsland'), { ssr: false });

export default function Lobby() {
  // ejemplo: intentamos cargar un modelo en public/fallback-assets/island.glb
  const modelUrl = '/fallback-assets/island.glb';
  return (
    <section style={{padding: 24}}>
      <h1>Lobby</h1>
      <p>Escena Lobby: carga lazy de un modelo GLTF (fallback simple si no existe).</p>
      <div style={{width: '100%', height: 400}}>
        {/* El componente SimpleIsland maneja internamente Suspense y fallback */}
        <div style={{width:'100%', height:'100%'}}>
          <SimpleIsland url={modelUrl} />
        </div>
      </div>
    </section>
  );
}
