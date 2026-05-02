/**
 * Value object representing a skill identifier.
 * The value is immutable and validated at creation time to avoid
 * primitive string usage throughout the domain.
 */
import { ValidationError } from "../errors/ValidationError";

export class SkillId {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Creates a new SkillId instance after validating the input.
   */
  public static create(value: string): SkillId {
    const normalized = value?.trim();

    if (!normalized) {
      throw new ValidationError("SkillId must be a non-empty string.");
    }

    return new SkillId(normalized);
  }

  /**
   * Comparison helper to avoid primitive string comparisons in domain logic.
   */
  public equals(other: SkillId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
