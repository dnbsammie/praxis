/**
 * Event model for progress actions in the domain.
 * The payload is generic to keep the event shape explicit while remaining type-safe.
 */
import { Timestamp } from "../value-objects/Timestamp";
import { SkillId } from "../value-objects/SkillId";
import { NodeId } from "../value-objects/NodeId";

export type ProgressEventType = "NODE_COMPLETED" | "SKILL_UNLOCKED";

export interface NodeCompletedPayload {
  readonly nodeId: string;
}

export interface SkillUnlockedPayload {
  readonly skillId: string;
}

export class ProgressEvent<Payload extends object = object> {
  public readonly type: ProgressEventType;
  public readonly timestamp: Timestamp;
  public readonly payload: Payload;

  private constructor(type: ProgressEventType, timestamp: Timestamp, payload: Payload) {
    this.type = type;
    this.timestamp = timestamp;
    this.payload = payload;
  }

  /**
   * Factory for a node completion event.
   */
  public static nodeCompleted(nodeId: NodeId, timestamp: Timestamp): ProgressEvent<NodeCompletedPayload> {
    return new ProgressEvent("NODE_COMPLETED", timestamp, { nodeId: nodeId.toString() });
  }

  /**
   * Factory for a skill unlocked event.
   */
  public static skillUnlocked(skillId: SkillId, timestamp: Timestamp): ProgressEvent<SkillUnlockedPayload> {
    return new ProgressEvent("SKILL_UNLOCKED", timestamp, { skillId: skillId.toString() });
  }
}
