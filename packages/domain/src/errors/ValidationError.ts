/**
 * Error thrown when a domain invariant is violated during construction
 * or when invalid input is provided to a domain operation.
 */
import { DomainError } from "../errors/DomainError";

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
