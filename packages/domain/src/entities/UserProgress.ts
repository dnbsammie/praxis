/**
 * Tracks completed nodes and progress events for a user.
 * This entity is immutable: operations produce new instances.
 */
import { NodeId } from "../value-objects/NodeId";
import { ProgressEvent } from "../events/ProgressEvent";
import { ValidationError } from "../errors/ValidationError";

export class UserProgress {
  public readonly completedNodeIds: readonly NodeId[];
  public readonly eventLog: readonly ProgressEvent[];

  private constructor(completedNodeIds: readonly NodeId[], eventLog: readonly ProgressEvent[]) {
    this.completedNodeIds = completedNodeIds;
    this.eventLog = eventLog;
  }

  public static create(
    completedNodeIds: readonly NodeId[] = [],
    eventLog: readonly ProgressEvent[] = [],
  ): UserProgress {
    if (!Array.isArray(completedNodeIds) || completedNodeIds.some((id) => !(id instanceof NodeId))) {
      throw new ValidationError("completedNodeIds must be an array of NodeId instances.");
    }

    if (!Array.isArray(eventLog) || eventLog.some((event) => !(event instanceof ProgressEvent))) {
      throw new ValidationError("eventLog must be an array of ProgressEvent instances.");
    }

    const uniqueNodeIds = completedNodeIds.reduce<NodeId[]>((acc, id) => {
      if (!acc.some((existing) => existing.equals(id))) {
        acc.push(id);
      }
      return acc;
    }, []);

    return new UserProgress(Object.freeze(uniqueNodeIds), Object.freeze(eventLog.slice()));
  }

  /**
   * Returns a new UserProgress containing the newly completed node and event.
   * Existing progress is preserved and no mutation occurs.
   */
  public markNodeCompleted(nodeId: NodeId, event: ProgressEvent): UserProgress {
    if (!(nodeId instanceof NodeId)) {
      throw new ValidationError("nodeId must be a NodeId instance.");
    }

    if (!(event instanceof ProgressEvent)) {
      throw new ValidationError("event must be a ProgressEvent instance.");
    }

    const alreadyCompleted = this.completedNodeIds.some((existing) => existing.equals(nodeId));
    const completedNodeIds = alreadyCompleted
      ? this.completedNodeIds
      : Object.freeze(this.completedNodeIds.concat(nodeId));

    const eventLog = Object.freeze(this.eventLog.concat(event));

    return new UserProgress(completedNodeIds, eventLog);
  }
}
