/**
 * Content package course types.
 * These types keep parsed course data explicit so loaders and tests share the same contract.
 */
export interface CourseNode {
  readonly id: string;
  readonly title: string;
}

export interface Course {
  readonly id: string;
  readonly version: string;
  readonly nodes: readonly CourseNode[];
}
