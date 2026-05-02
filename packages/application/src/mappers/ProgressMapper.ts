/**
 * Maps progress data between domain models and plain data transfer objects.
 * This mapper belongs to the application layer because it isolates external
 * representation from domain objects.
 */
import {
  NodeId,
  ProgressEvent,
  SkillId,
  Timestamp,
  UserProgress,
} from "@praxis/domain";

export interface NodeCompletedEventDTO {
  readonly type: "NODE_COMPLETED";
  readonly timestamp: number;
  readonly payload: {
    readonly nodeId: string;
  };
}

export interface SkillUnlockedEventDTO {
  readonly type: "SKILL_UNLOCKED";
  readonly timestamp: number;
  readonly payload: {
    readonly skillId: string;
  };
}

export type ProgressEventDTO = NodeCompletedEventDTO | SkillUnlockedEventDTO;

export interface UserProgressDTO {
  readonly completedNodeIds: readonly string[];
  readonly eventLog: readonly ProgressEventDTO[];
}

export class ProgressMapper {
  public static toDTO(progress: UserProgress): UserProgressDTO {
    return {
      completedNodeIds: progress.completedNodeIds.map((nodeId) => nodeId.toString()),
      eventLog: progress.eventLog.map((event) => ProgressMapper.toEventDTO(event)),
    };
  }

  /**
   * Rehydrates domain progress from plain data received through infrastructure adapters.
   * This keeps reconstruction logic out of repositories and transport implementations.
   */
  public static fromDTO(progress: UserProgressDTO): UserProgress {
    const completedNodeIds = progress.completedNodeIds.map((nodeId) => NodeId.create(nodeId));
    const eventLog = progress.eventLog.map((event) => ProgressMapper.toDomainEvent(event));

    return UserProgress.create(completedNodeIds, eventLog);
  }

  /**
   * Converts a domain progress representation into a plain object for infrastructure boundaries.
   */
  public static toPlain(progress: UserProgress): UserProgressDTO {
    return ProgressMapper.toDTO(progress);
  }

  private static toEventDTO(event: ProgressEvent): ProgressEventDTO {
    switch (event.type) {
      case "NODE_COMPLETED":
        return {
          type: event.type,
          timestamp: event.timestamp.toNumber(),
          payload: {
            nodeId: String((event.payload as NodeCompletedEventDTO["payload"]).nodeId),
          },
        };
      case "SKILL_UNLOCKED":
        return {
          type: event.type,
          timestamp: event.timestamp.toNumber(),
          payload: {
            skillId: String((event.payload as SkillUnlockedEventDTO["payload"]).skillId),
          },
        };
    }

    throw new Error(`Unsupported progress event type: ${String(event.type)}`);
  }

  private static toDomainEvent(event: ProgressEventDTO): ProgressEvent {
    const timestamp = Timestamp.create(event.timestamp);

    switch (event.type) {
      case "NODE_COMPLETED":
        return ProgressEvent.nodeCompleted(NodeId.create(event.payload.nodeId), timestamp);
      case "SKILL_UNLOCKED":
        return ProgressEvent.skillUnlocked(SkillId.create(event.payload.skillId), timestamp);
    }

    throw new Error("Unsupported progress event type.");
  }
}
