/**
 * This file exists to compose the browser runtime.
 * It wires browser-safe infrastructure adapters to application ports and use-cases.
 * Replace any dependency here to swap storage or sync behavior for web without changing the UI contract.
 */
import {
  CompleteNodeUseCase,
  GetProgressUseCase,
  GetUnlockableSkillsUseCase,
  ProgressService,
} from "@praxis/application";
import { HttpSyncTransport, IndexedDbAdapter } from "@praxis/infrastructure";
import { createProviders } from "../providers/createProviders";
import type { RuntimeAPI, StorageAdapter, SyncEngine } from "../types/RuntimeAPI";

type WebRuntimeOptions = {
  readonly storage?: StorageAdapter;
  readonly sync?: SyncEngine;
  readonly syncEndpoint?: string;
  readonly idPrefix?: string;
};

export function createWebRuntime(options: WebRuntimeOptions = {}): RuntimeAPI {
  const storage = options.storage ?? new IndexedDbAdapter();
  const sync = options.sync ?? new HttpSyncTransport({ endpoint: options.syncEndpoint ?? "/api/sync" });
  const { timeProvider, idGenerator } = createProviders({ idPrefix: options.idPrefix ?? "web" });
  const progressService = new ProgressService(storage, timeProvider);

  // The runtime builds providers up front even if some are not consumed by the current use-case set.
  void idGenerator;

  return {
    storage,
    sync,
    useCases: {
      completeNode: new CompleteNodeUseCase(progressService),
      getProgress: new GetProgressUseCase(storage),
      getUnlockableSkills: new GetUnlockableSkillsUseCase(),
    },
  };
}
