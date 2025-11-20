import React from 'react';
import SemanticSearch from '@/components/SemanticSearch';

export const metadata = {
  title: 'Buscar — Portfolio',
  description: 'Buscar semánticamente en el portfolio',
};

export default function SearchPage() {
  return (
    <main style={{padding:24}}>
      <h1>Buscar en el Portfolio</h1>
      <p>Prueba la búsqueda semántica contra <code>NEXT_PUBLIC_API_URL</code>.</p>
      <div style={{marginTop:12}}>
        <SemanticSearch />
      </div>
    </main>
  );
}
