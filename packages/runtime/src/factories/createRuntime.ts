/**
 * This factory exists to hide runtime selection from frontends.
 * It is the composition root entry point that chooses the correct environment-specific wiring.
 * Replace the selection strategy here when new host environments are added.
 */
import { isTauri } from "../env/detectEnvironment";
import { createTauriRuntime } from "../runtimes/tauri.runtime";
import { createWebRuntime } from "../runtimes/web.runtime";
import type { RuntimeAPI, StorageAdapter, SyncEngine } from "../types/RuntimeAPI";

type SharedRuntimeOptions = {
  readonly storage?: StorageAdapter;
  readonly sync?: SyncEngine;
  readonly syncEndpoint?: string;
  readonly idPrefix?: string;
};

type CreateRuntimeOptions = {
  readonly web?: SharedRuntimeOptions;
  readonly tauri?: SharedRuntimeOptions & {
    readonly useHttpSync?: boolean;
  };
};

export function createRuntime(options: CreateRuntimeOptions = {}): RuntimeAPI {
  if (isTauri()) {
    return createTauriRuntime(options.tauri);
  }

  return createWebRuntime(options.web);
}
