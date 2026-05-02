/**
 * This utility exists to provide a minimal integrity placeholder for infrastructure concerns.
 * The implementation is intentionally simple and deterministic so callers can depend on the API now.
 * Replace this with the platform crypto API later when real security requirements are introduced.
 */
export function generateHash(input: string): string {
  let hash = 5381;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 33) ^ input.charCodeAt(index);
  }

  return `stub-${(hash >>> 0).toString(16)}`;
}
