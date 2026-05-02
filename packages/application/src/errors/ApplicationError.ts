/**
 * Base error class for application-layer failures.
 * Application use-cases should return this type in Result objects
 * instead of throwing whenever possible.
 */
export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
