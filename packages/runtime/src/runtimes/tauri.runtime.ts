/**
 * This file exists to compose the desktop runtime for Tauri hosts.
 * It wires desktop-oriented infrastructure adapters and keeps the Tauri choice out of application code.
 * Replace storage, sync, or bridge integration here without affecting the RuntimeAPI consumed by UI layers.
 */
import {
  CompleteNodeUseCase,
  GetProgressUseCase,
  GetUnlockableSkillsUseCase,
  ProgressService,
} from "@praxis/application";
import { FileSyncTransport, HttpSyncTransport, SQLiteAdapter } from "@praxis/infrastructure";
import { createProviders } from "../providers/createProviders";
import type { RuntimeAPI, StorageAdapter, SyncEngine } from "../types/RuntimeAPI";

type TauriBridge = <T>(command: string, payload?: unknown) => Promise<T>;

type TauriRuntimeOptions = {
  readonly storage?: StorageAdapter;
  readonly sync?: SyncEngine;
  readonly syncEndpoint?: string;
  readonly useHttpSync?: boolean;
  readonly idPrefix?: string;
  readonly bridge?: TauriBridge;
};

export function createTauriRuntime(options: TauriRuntimeOptions = {}): RuntimeAPI {
  const storage = options.storage ?? new SQLiteAdapter();
  const sync =
    options.sync ??
    (options.useHttpSync
      ? new HttpSyncTransport({ endpoint: options.syncEndpoint ?? "/api/sync" })
      : new FileSyncTransport({ channelName: "tauri-sync" }));
  const { timeProvider, idGenerator } = createProviders({ idPrefix: options.idPrefix ?? "tauri" });
  const progressService = new ProgressService(storage, timeProvider);

  // The bridge is accepted here so Tauri-specific services can be swapped in later without
  // changing the runtime factory signature or leaking Tauri globals outside the composition root.
  void options.bridge;
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
