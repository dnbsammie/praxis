/**
 * Public entry point for the runtime package.
 * It exposes the composition root and the RuntimeAPI contract while hiding internal folder layout.
 * Frontends should import from this file instead of reaching into runtime implementation details.
 */
export { createRuntime } from "./factories/createRuntime";
export type { RuntimeAPI, StorageAdapter, SyncEngine } from "./types/RuntimeAPI";
