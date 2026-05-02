/**
 * Abstraction for generating identifiers in the application layer.
 * This port is intentionally simple and implementation-agnostic.
 */
export interface IdGenerator {
  generate(): string;
}
