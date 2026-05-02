/**
 * Represents a skill concept in the learning platform.
 * A skill may depend on other skills before it becomes unlockable.
 */
import { SkillId } from "../value-objects/SkillId";
import { ValidationError } from "../errors/ValidationError";

export class Skill {
  public readonly id: SkillId;
  public readonly prerequisites: readonly SkillId[];

  private constructor(id: SkillId, prerequisites: readonly SkillId[]) {
    this.id = id;
    this.prerequisites = prerequisites;
  }

  /**
   * Creates a Skill with validated prerequisites.
   */
  public static create(id: SkillId, prerequisites: readonly SkillId[] = []): Skill {
    if (!Array.isArray(prerequisites)) {
      throw new ValidationError("Skill prerequisites must be an array of SkillId instances.");
    }

    if (prerequisites.some((item) => !(item instanceof SkillId))) {
      throw new ValidationError("Skill prerequisites must contain only SkillId instances.");
    }

    return new Skill(id, prerequisites.slice());
  }

  /**
   * Determines whether the skill is unlockable based on already completed skills.
   */
  public canUnlock(completedSkills: readonly SkillId[]): boolean {
    if (!Array.isArray(completedSkills)) {
      throw new ValidationError("completedSkills must be an array of SkillId instances.");
    }

    return this.prerequisites.every((prerequisite) =>
      completedSkills.some((completed) => completed.equals(prerequisite)),
    );
  }
}
