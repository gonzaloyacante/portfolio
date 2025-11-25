"use client";
import React from 'react';
import UniverseCanvas from '@/scenes/UniverseCanvas';

export default function UniverseRoutePage() {
  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <header style={{ position: 'absolute', zIndex: 10, left: 16, top: 16 }}>
        <h2>Portfolio‑Universo</h2>
      </header>
  <UniverseCanvas />
      <div style={{ position: 'absolute', right: 16, top: 16, zIndex: 10 }}>
        <button onClick={() => alert('Tour guiado - placeholder')}>Tour guiado</button>
        <button onClick={() => alert('Explorar libre - placeholder')} style={{ marginLeft: 8 }}>Explorar</button>
      </div>
    </main>
  );
}
