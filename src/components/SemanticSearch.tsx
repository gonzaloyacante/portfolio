"use client";

import React, { useEffect, useRef, useState } from 'react';
import { semanticSearch, SemanticResult } from '@/lib/search';

export default function SemanticSearch({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SemanticResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const data = await semanticSearch(query, 6);
        setResults(data.results || []);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg || 'Error en búsqueda');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <div style={{maxWidth:760}}>
      <label style={{display:'block', marginBottom:8}}>Buscar en el portfolio</label>
      <input
        aria-label="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca por significado, p. ej. 'app realtime audio'"
        style={{width:'100%', padding:10, borderRadius:8, border:'1px solid #e5e7eb'}}
      />
      <div style={{marginTop:10}}>
        {loading && <div>Buscando…</div>}
        {error && <div style={{color:'red'}}>Error: {error}</div>}
        {!loading && !error && results.length === 0 && query.length >= 2 && <div>No se encontraron resultados</div>}
        <ul style={{listStyle:'none', padding:0, marginTop:8}}>
          {results.map((r) => (
            <li key={r.id} style={{padding:10, borderRadius:8, background:'#fff', boxShadow:'0 6px 18px rgba(2,6,23,0.04)', marginBottom:8}}>
              <strong>{r.title}</strong>
              <p style={{margin:6}}>{r.snippet}</p>
              <small style={{color:'#6b7280'}}>dist: {typeof r.distance === 'number' ? r.distance.toFixed(4) : '—'}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
