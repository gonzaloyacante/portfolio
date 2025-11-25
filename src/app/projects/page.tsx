import React from 'react';
import ProjectsGrid from '@/components/ui/ProjectsGrid';

export const metadata = {
  title: 'Projects — Portfolio',
  description: 'Listado de proyectos - Portfolio',
};

export default function ProjectsPage() {
  return (
    <main style={{padding:24}}>
      <h1>Proyectos</h1>
      <p>Listado de proyectos (fallback 2D) — usa `Personal API` si está disponible.</p>
      <section style={{marginTop:12}}>
        <ProjectsGrid />
      </section>
    </main>
  );
}
