/**
 * Minimal runtime validation helpers for course content.
 * The content package owns shape validation so frontends do not parse unknown JSON directly.
 */
import type { Course, CourseNode } from "../types/Course";

const isCourseNode = (value: unknown): value is CourseNode => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return typeof candidate.id === "string" && candidate.id.trim().length > 0
    && typeof candidate.title === "string"
    && candidate.title.trim().length > 0;
};

export const isCourse = (value: unknown): value is Course => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return typeof candidate.id === "string"
    && candidate.id.trim().length > 0
    && typeof candidate.version === "string"
    && candidate.version.trim().length > 0
    && Array.isArray(candidate.nodes)
    && candidate.nodes.every((node) => isCourseNode(node));
};
