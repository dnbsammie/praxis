/**
 * Repository contract for persisting user progress.
 * The implementation details are intentionally left out of the domain layer.
 */
import { UserProgress } from "../entities/UserProgress";

export interface ProgressRepository {
  getProgress(): Promise<UserProgress>;
  saveProgress(progress: UserProgress): Promise<void>;
}
