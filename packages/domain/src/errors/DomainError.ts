/**
 * Base class for all domain-specific errors.
 * Extending this class allows consumers to distinguish domain failures
 * from framework, runtime, or infrastructure errors.
 */
export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
