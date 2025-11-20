const API = process.env.NEXT_PUBLIC_API_URL || '';

export type SemanticResult = { id: string; title: string; snippet?: string; distance?: number };

export async function semanticSearch(query: string, k = 5): Promise<{ query: string; k: number; results: SemanticResult[] }> {
  if (!query || query.trim().length === 0) return { query, k, results: [] };

  const res = await fetch(`${API}/semantic_search`, {
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

const searchClient = { semanticSearch };
export default searchClient;
