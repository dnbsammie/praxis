/**
 * Minimal Result type used by application use-cases.
 * It provides safe error handling without relying on thrown exceptions.
 */
export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };
