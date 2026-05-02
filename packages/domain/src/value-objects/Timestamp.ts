/**
 * Simple value object for timestamps.
 * This wrapper makes time values explicit in the domain model and isolates
 * validation logic from business behavior.
 */
import { ValidationError } from "../errors/ValidationError";

export class Timestamp {
  public readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number): Timestamp {
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
      throw new ValidationError("Timestamp must be a finite positive number.");
    }

    return new Timestamp(value);
  }

  public equals(other: Timestamp): boolean {
    return this.value === other.value;
  }

  public toNumber(): number {
    return this.value;
  }
}
