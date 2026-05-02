/**
 * Abstraction for providing the current time in the application layer.
 * This keeps domain logic testable and avoids direct Date.now() usage.
 */
import { Timestamp } from "@praxis/domain";

export interface TimeProvider {
  now(): Timestamp;
}
