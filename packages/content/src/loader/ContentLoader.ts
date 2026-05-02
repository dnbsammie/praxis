/**
 * Course loader for static content inputs.
 * It validates unknown input and returns a cloned course object so callers do not depend on raw JSON.
 */
import { isCourse } from "../schemas/course.schema";
import type { Course } from "../types/Course";

export class ContentLoader {
  public loadCourse(json: unknown): Course {
    if (!isCourse(json)) {
      throw new Error("Invalid course content.");
    }

    return {
      id: json.id,
      version: json.version,
      nodes: json.nodes.map((node) => ({
        id: node.id,
        title: node.title,
      })),
    };
  }
}
