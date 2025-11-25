"use client";

import React, { useEffect, useState } from 'react';
import { getProjects } from '@/services/api';
import { Project } from '@/types';

export default function ProjectsGrid({ tag }: { tag?: string }) {
  const [items, setItems] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getProjects(tag)
      .then((p) => {
        if (mounted) setItems(p);
      })
      .catch((e) => {
        console.error('Failed to load projects', e);
        if (mounted) setError(String(e));
      });
    return () => {
      mounted = false;
    };
  }, [tag]);

  if (error) return <div style={{color:'red'}}>Error cargando proyectos: {error}</div>;
  if (!items) return <div>Cargando proyectos…</div>;

  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
      {items.map((p) => (
        <article key={p.id} style={{padding:12, borderRadius:8, background:'#fff', boxShadow:'0 6px 18px rgba(2,6,23,0.06)'}}>
          <h3 style={{margin:0, fontSize:16}}>{p.title}</h3>
          <p style={{margin:'6px 0 0 0', fontSize:13, color:'#374151'}}>{p.short_desc}</p>
          <div style={{marginTop:8, display:'flex', gap:8}}>
            {p.repo_url ? <a href={p.repo_url} target="_blank" rel="noreferrer">Repo</a> : null}
            {p.live_url ? <a href={p.live_url} target="_blank" rel="noreferrer">Live</a> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
