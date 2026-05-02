/**
 * This provider exists to bridge the application IdGenerator port to a simple runtime implementation.
 * The runtime owns identifier generation because it is an environment concern, not a domain concern.
 * Replace this provider later with UUID, native, or backend-issued identifiers without changing callers.
 */
import type { IdGenerator } from "@praxis/application";

type RuntimeIdProviderOptions = {
  readonly prefix?: string;
};

export class RuntimeIdProvider implements IdGenerator {
  private readonly prefix: string;
  private sequence: number;

  constructor(options: RuntimeIdProviderOptions = {}) {
    this.prefix = options.prefix ?? "runtime";
    this.sequence = 0;
  }

  public generate(): string {
    this.sequence += 1;
    return `${this.prefix}-${Date.now()}-${this.sequence}`;
  }
}
