/**
 * Higher-level orchestration for progress-related application flows.
 * This service coordinates the progress repository and domain behavior.
 */
import { ProgressEvent, NodeId, UserProgress } from "@praxis/domain";
import type { ProgressRepository } from "../ports/ProgressRepository";
import type { TimeProvider } from "../ports/TimeProvider";

export class ProgressService {
  constructor(
    private readonly repository: ProgressRepository,
    private readonly timeProvider: TimeProvider,
  ) {}

  /**
   * Fetches the current user progress from the repository.
   */
  public async getProgress(): Promise<UserProgress> {
    return this.repository.getProgress();
  }

  /**
   * Completes a node by creating a domain event and storing updated progress.
   * This method keeps all side effects inside defined ports.
   */
  public async completeNode(nodeId: NodeId): Promise<UserProgress> {
    const progress = await this.repository.getProgress();
    const event = ProgressEvent.nodeCompleted(nodeId, this.timeProvider.now());
    const updatedProgress = progress.markNodeCompleted(nodeId, event);
    await this.repository.saveProgress(updatedProgress);
    return updatedProgress;
  }
}
