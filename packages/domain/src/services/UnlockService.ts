/**
 * Pure domain service that determines which skills are unlockable.
 * This service has no side effects and does not mutate input arrays.
 */
import { Skill } from "../entities/Skill";
import { SkillId } from "../value-objects/SkillId";
import { ValidationError } from "../errors/ValidationError";

export class UnlockService {
  /**
   * Returns skills whose prerequisites have all been satisfied by the completed skill ids.
   */
  public static getUnlockableSkills(
    skills: readonly Skill[],
    completed: readonly SkillId[],
  ): Skill[] {
    if (!Array.isArray(skills) || skills.some((skill) => !(skill instanceof Skill))) {
      throw new ValidationError("skills must be an array of Skill instances.");
    }

    if (!Array.isArray(completed) || completed.some((id) => !(id instanceof SkillId))) {
      throw new ValidationError("completed must be an array of SkillId instances.");
    }

    return skills.filter((skill) => skill.canUnlock(completed));
  }
}
