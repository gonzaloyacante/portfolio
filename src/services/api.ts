import { Profile, Project } from '@/types';

const BASE = process.env.NEXT_PUBLIC_API_BASE || '';

async function handleResp<T>(res: Response) {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }
  return (await res.json()) as T;
}

export async function getProfile(): Promise<Profile> {
  const res = await fetch(`${BASE}/api/v1/profile`);
  return handleResp<Profile>(res);
}

export async function getProjects(tag?: string): Promise<Project[]> {
  const q = tag ? `?tag=${encodeURIComponent(tag)}` : '';
  const res = await fetch(`${BASE}/api/v1/projects${q}`);
  return handleResp<Project[]>(res);
}

export async function getProjectById(id: string): Promise<Project> {
  const res = await fetch(`${BASE}/api/v1/projects/${encodeURIComponent(id)}`);
  return handleResp<Project>(res);
}

export async function postContact(payload: { name: string; email: string; message: string }) {
  const res = await fetch(`${BASE}/api/v1/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResp<{ ok: boolean }>(res);
}
