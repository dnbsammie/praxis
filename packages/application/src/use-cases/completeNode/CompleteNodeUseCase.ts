/**
 * Use-case for completing a node.
 * This class is part of the application layer and executes a single business flow.
 */
import { CompleteNodeDTO } from "./CompleteNodeDTO";
import { Result } from "../../types/Result";
import { ApplicationError } from "../../errors/ApplicationError";
import { ProgressService } from "../../services/ProgressService";
import { NodeId, UserProgress } from "@praxis/domain";

export class CompleteNodeUseCase {
  constructor(private readonly progressService: ProgressService) {}

  public async execute(input: CompleteNodeDTO): Promise<Result<UserProgress, ApplicationError>> {
    if (!input?.nodeId || typeof input.nodeId !== "string") {
      return {
        ok: false,
        error: new ApplicationError("CompleteNodeDTO.nodeId must be a non-empty string."),
      };
    }

    try {
      const nodeId = NodeId.create(input.nodeId);
      const updatedProgress = await this.progressService.completeNode(nodeId);
      return { ok: true, value: updatedProgress };
    } catch (error) {
      return {
        ok: false,
        error: new ApplicationError(error instanceof Error ? error.message : "Unknown error."),
      };
    }
  }
}
