/**
 * Public entry point for the content package.
 * Tests and consumers import content helpers from here instead of reaching into internal folders.
 */
export { ContentLoader } from "./loader/ContentLoader";
export type { Course, CourseNode } from "./types/Course";
