/**
 * Maps progress data between domain models and plain data transfer objects.
 * This mapper belongs to the application layer because it isolates external
 * representation from domain objects.
 */
import { UserProgress, ProgressEventType } from "@praxis/domain";

export interface ProgressEventDTO {
  readonly type: ProgressEventType;
  readonly timestamp: number;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface UserProgressDTO {
  readonly completedNodeIds: readonly string[];
  readonly eventLog: readonly ProgressEventDTO[];
}

export class ProgressMapper {
  public static toDTO(progress: UserProgress): UserProgressDTO {
    return {
      completedNodeIds: progress.completedNodeIds.map((nodeId) => nodeId.toString()),
      eventLog: progress.eventLog.map((event) => ({
        type: event.type,
        timestamp: event.timestamp.toNumber(),
        payload: event.payload,
      })),
    };
  }

  /**
   * Converts a plain progress representation into a DTO-like object.
   * The application layer can use this when data comes from external adapters.
   */
  public static toPlain(progress: UserProgress): UserProgressDTO {
    return ProgressMapper.toDTO(progress);
  }
}
