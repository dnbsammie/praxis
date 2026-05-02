/**
 * Value object representing a node identifier.
 * Immutable by design and validated once during construction.
 */
import { ValidationError } from "../errors/ValidationError";

export class NodeId {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): NodeId {
    const normalized = value?.trim();

    if (!normalized) {
      throw new ValidationError("NodeId must be a non-empty string.");
    }

    return new NodeId(normalized);
  }

  public equals(other: NodeId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
