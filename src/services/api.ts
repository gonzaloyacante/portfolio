import { Profile, Project } from '@/types';

const BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || 'https://api.minipcgy.site';

async function fetchWithRetry(url: string, options?: RequestInit, retries = 3, backoff = 300): Promise<Response> {
  try {
    const res = await fetch(url, options);
    if (!res.ok && retries > 0 && res.status >= 500) {
      throw new Error(`Server error: ${res.status}`);
    }
    return res;
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((r) => setTimeout(r, backoff));
    return fetchWithRetry(url, options, retries - 1, backoff * 2);
  }
}

async function handleResp<T>(res: Response) {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }
  return (await res.json()) as T;
}

export async function getProfile(): Promise<Profile> {
  const res = await fetchWithRetry(`${BASE}/api/v1/profile`);
  return handleResp<Profile>(res);
}

export async function getProjects(tag?: string): Promise<Project[]> {
  const q = tag ? `?tag=${encodeURIComponent(tag)}` : '';
  const res = await fetchWithRetry(`${BASE}/api/v1/projects${q}`);
  return handleResp<Project[]>(res);
}

export async function getProjectById(id: string): Promise<Project> {
  const res = await fetchWithRetry(`${BASE}/api/v1/projects/${encodeURIComponent(id)}`);
  return handleResp<Project>(res);
}

export async function postContact(payload: { name: string; email: string; message: string }) {
  const res = await fetchWithRetry(`${BASE}/api/v1/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResp<{ ok: boolean }>(res);
}

export type SemanticResult = { id: string; title: string; snippet?: string; distance?: number };

export async function semanticSearch(query: string, k = 5): Promise<{ query: string; k: number; results: SemanticResult[] }> {
  if (!query || query.trim().length === 0) return { query, k, results: [] };

  const res = await fetchWithRetry(`${BASE}/semantic_search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, k }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`semanticSearch failed: ${res.status} ${txt}`);
  }
  return (await res.json()) as { query: string; k: number; results: SemanticResult[] };
}

export async function chatWithAI(message: string): Promise<string> {
  const res = await fetchWithRetry(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Chat failed");
  const data = await res.json();
  return data.response || "No response from AI.";
}

const searchClient = { semanticSearch, getProjects, chatWithAI };
export default searchClient;
