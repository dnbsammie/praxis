/**
 * This provider exists to bridge the application TimeProvider port to the host clock.
 * The runtime owns this wiring so application services never call Date APIs directly.
 * Replace this class when a platform-specific clock or deterministic test clock is needed.
 */
import type { TimeProvider } from "@praxis/application";
import { Timestamp } from "@praxis/domain";

export class SystemTimeProvider implements TimeProvider {
  public now(): Timestamp {
    return Timestamp.create(Date.now());
  }
}
