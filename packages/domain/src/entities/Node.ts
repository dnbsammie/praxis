/**
 * A learning unit within a skill graph.
 * Nodes are the smallest tracked progress unit in the domain.
 */
import { NodeId } from "../value-objects/NodeId";
import { SkillId } from "../value-objects/SkillId";
import { ValidationError } from "../errors/ValidationError";

export class Node {
  public readonly id: NodeId;
  public readonly skillId: SkillId;
  public readonly required: boolean;

  private constructor(id: NodeId, skillId: SkillId, required: boolean) {
    this.id = id;
    this.skillId = skillId;
    this.required = required;
  }

  /**
   * Constructs a Node and validates that all domain invariants hold.
   */
  public static create(id: NodeId, skillId: SkillId, required: boolean): Node {
    if (!(id instanceof NodeId)) {
      throw new ValidationError("Node id must be a NodeId instance.");
    }

    if (!(skillId instanceof SkillId)) {
      throw new ValidationError("Node skillId must be a SkillId instance.");
    }

    if (typeof required !== "boolean") {
      throw new ValidationError("Node required flag must be a boolean.");
    }

    return new Node(id, skillId, required);
  }
}
