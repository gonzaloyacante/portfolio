import { Project } from '@/types';

// Prefer NEXT_PUBLIC_API_URL, fall back to NEXT_PUBLIC_API_BASE and finally the public API.
const API = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || 'https://api.minipcgy.site';

type Paginated<T> = { meta?: { total?: number; page?: number; per_page?: number }; items?: T[] };

async function handleResp<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }
  return (await res.json()) as T;
}

export async function fetchProjects({ page = 1, per_page = 50, q, tag }: { page?: number; per_page?: number; q?: string; tag?: string } = {}): Promise<Project[] | Paginated<Project>> {
  const u = new URL(`${API}/api/v1/projects`);
  if (page) u.searchParams.set('page', String(page));
  if (per_page) u.searchParams.set('per_page', String(per_page));
  if (q) u.searchParams.set('q', q);
  if (tag) u.searchParams.set('tag', tag);

  const res = await fetch(u.toString(), { method: 'GET' });
  return handleResp<Project[] | Paginated<Project>>(res);
}

export async function fetchProjectById(id: string): Promise<Project> {
  const res = await fetch(`${API}/api/v1/projects/${encodeURIComponent(id)}`);
  return handleResp<Project>(res);
}

const api = { fetchProjects, fetchProjectById };
export default api;
