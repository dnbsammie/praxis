/**
 * Use-case for fetching current user progress.
 * This class belongs to the application layer and isolates repository interaction.
 */
import { Result } from "../../types/Result";
import { ApplicationError } from "../../errors/ApplicationError";
import { ProgressRepository } from "../../ports/ProgressRepository";
import { UserProgress } from "@praxis/domain";

export class GetProgressUseCase {
  constructor(private readonly repository: ProgressRepository) {}

  public async execute(): Promise<Result<UserProgress, ApplicationError>> {
    try {
      const progress = await this.repository.getProgress();
      return { ok: true, value: progress };
    } catch (error) {
      return {
        ok: false,
        error: new ApplicationError(error instanceof Error ? error.message : "Unknown error."),
      };
    }
  }
}
