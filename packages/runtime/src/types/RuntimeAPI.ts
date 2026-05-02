/**
 * This file exists to define the runtime package's public composition contract.
 * Frontends depend on this shape instead of knowing which adapters or providers were selected.
 * The interfaces remain intentionally small so infrastructure implementations can be replaced
 * without changing UI code or application-layer ports.
 */
import type {
  CompleteNodeUseCase,
  GetProgressUseCase,
  GetUnlockableSkillsUseCase,
} from "@praxis/application";
import type { ProgressEvent, ProgressRepository, Timestamp } from "@praxis/domain";

/**
 * The repository used by the runtime also exposes generic storage primitives.
 * A dedicated shared storage contract does not exist yet, so the runtime publishes the
 * minimum shape already implemented by the infrastructure adapters.
 */
export interface StorageAdapter extends ProgressRepository {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  query<T>(prefix: string): Promise<readonly T[]>;
}

/**
 * The runtime only needs a push/pull synchronization surface.
 * This preserves an abstract boundary even though the repo does not yet expose a shared sync package.
 */
export interface SyncEngine {
  push(events: readonly ProgressEvent[]): Promise<readonly ProgressEvent[]>;
  pull(since: Timestamp): Promise<readonly ProgressEvent[]>;
}

export interface RuntimeAPI {
  storage: StorageAdapter;
  sync: SyncEngine;
  useCases: {
    completeNode: CompleteNodeUseCase;
    getProgress: GetProgressUseCase;
    getUnlockableSkills: GetUnlockableSkillsUseCase;
  };
}
