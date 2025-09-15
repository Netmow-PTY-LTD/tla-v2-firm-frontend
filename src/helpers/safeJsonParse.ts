export function safeJsonParse<T = unknown>(
  value: string | undefined | null
): T | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
