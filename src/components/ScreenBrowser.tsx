"use client"
import React, { useEffect, useState } from 'react'
import type { Project } from '@/types'
import { getProjects } from '@/services/api'

export default function ScreenBrowser() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    getProjects()
      .then((p) => {
        if (mounted) setProjects(p)
      })
      .catch((err: unknown) => {
        if (mounted) setError(String(err))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div>Loading projects…</div>
  if (error) return <div>Error loading projects: {error}</div>
  if (!projects || projects.length === 0) return <div>No projects found</div>

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#111' }}>
      <h3 style={{ margin: '0 0 8px 0' }}>Proyectos</h3>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
        {projects.map((p) => {
          // prefer explicit live_url or url; fall back to repo_url/github_url
          const href = p.live_url || p.url || p.repo_url || p.github_url || '#'
          return (
            <li key={p.id} style={{ marginBottom: 6 }}>
              <a href={href} target="_blank" rel="noreferrer" style={{ color: '#0f62fe' }}>
                {p.title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
