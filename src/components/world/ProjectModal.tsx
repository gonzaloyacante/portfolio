"use client";
import React, { useEffect, useState } from 'react';
import { getProjectById } from '@/services/api';
import type { Project } from '@/types';

export default function ProjectModal({ id, onClose }: { id: string; onClose: () => void }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = await getProjectById(id);
        if (!mounted) return;
        setProject(p);
      } catch (e) {
        if (!mounted) return;
        setError(String(e));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
      <div style={{ background: 'white', padding: 20, borderRadius: 8, minWidth: 320, maxWidth: '80%', zIndex: 60 }}>
        <button onClick={onClose} style={{ float: 'right' }}>Cerrar</button>
        {loading && <div>Cargando...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {project && (
          <div>
            <h3>{project.title}</h3>
            <p>{project.short_desc}</p>
            <div style={{ marginTop: 8 }}>{project.long_desc}</div>
            {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer">Ver en vivo</a>}
          </div>
        )}
      </div>
    </div>
  );
}
