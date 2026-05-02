/**
 * Use-case for retrieving unlockable skills.
 * This class delegates to domain services and keeps the application layer thin.
 */
import { Result } from "../../types/Result";
import { ApplicationError } from "../../errors/ApplicationError";
import { Skill, SkillId, UnlockService } from "@praxis/domain";

export interface GetUnlockableSkillsInput {
  readonly skills: readonly Skill[];
  readonly completedSkills: readonly SkillId[];
}

export class GetUnlockableSkillsUseCase {
  public async execute(input: GetUnlockableSkillsInput): Promise<Result<Skill[], ApplicationError>> {
    if (!input || !Array.isArray(input.skills) || !Array.isArray(input.completedSkills)) {
      return {
        ok: false,
        error: new ApplicationError(
          "GetUnlockableSkillsUseCase input must include skills and completedSkills arrays.",
        ),
      };
    }

    try {
      const unlockable = UnlockService.getUnlockableSkills(input.skills, input.completedSkills);
      return { ok: true, value: unlockable };
    } catch (error) {
      return {
        ok: false,
        error: new ApplicationError(error instanceof Error ? error.message : "Unknown error."),
      };
    }
  }
}
