/**
 * Main entry point for the domain package.
 * Exposes the domain model with clear, intention-revealing exports.
 */
export * from "./types/Common";
export * from "./errors/DomainError";
export * from "./errors/ValidationError";
export * from "./value-objects/SkillId";
export * from "./value-objects/NodeId";
export * from "./value-objects/Timestamp";
export * from "./entities/Skill";
export * from "./entities/Node";
export * from "./entities/UserProgress";
export * from "./events/ProgressEvent";
export * from "./services/UnlockService";
export * from "./repositories/ProgressRepository";
