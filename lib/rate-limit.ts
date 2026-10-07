/**
 * Rate limit em memória (janela deslizante). Suficiente para um salão:
 * na Vercel cada instância tem sua própria memória, então o limite é aproximado.
 * Para tráfego alto, troque por Upstash Redis (@upstash/ratelimit).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}
