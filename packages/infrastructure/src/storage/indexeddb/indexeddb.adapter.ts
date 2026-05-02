/**
 * This adapter exists to provide a browser-oriented storage implementation without binding
 * the application to IndexedDB yet. It currently implements the ProgressRepository interface
 * from @praxis/domain while exposing generic get/set/query methods expected from a storage adapter.
 * All persistence is mocked with an in-memory Map so the adapter remains safe to replace later.
 */
import { NodeId, ProgressEvent, SkillId, Timestamp, UserProgress, type ProgressRepository } from "@praxis/domain";

type StoredProgressEvent = {
  readonly id: string;
  readonly type: "NODE_COMPLETED" | "SKILL_UNLOCKED";
  readonly payload: Record<string, unknown>;
  readonly timestamp: number;
};

type StoredProgressSnapshot = {
  readonly completedNodeIds: readonly string[];
  readonly events: readonly StoredProgressEvent[];
};

type IndexedDbAdapterOptions = {
  readonly seed?: ReadonlyMap<string, unknown> | ReadonlyArray<readonly [string, unknown]>;
  readonly progressKey?: string;
};

export class IndexedDbAdapter implements ProgressRepository {
  private readonly store: Map<string, unknown>;
  private readonly progressKey: string;

  constructor(options: IndexedDbAdapterOptions = {}) {
    this.store = new Map(options.seed ?? []);
    this.progressKey = options.progressKey ?? "progress:current";
  }

  /**
   * Placeholder browser storage read.
   * A real implementation would read from an IndexedDB object store instead of memory.
   */
  public async get<T>(key: string): Promise<T | null> {
    return (this.store.get(key) as T | undefined) ?? null;
  }

  /**
   * Placeholder browser storage write.
   * A real implementation would use IndexedDB transactions and versioned stores here.
   */
  public async set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  /**
   * Placeholder browser query.
   * A real implementation would query by index or cursor rather than scanning an in-memory Map.
   */
  public async query<T>(prefix: string): Promise<readonly T[]> {
    const matches: T[] = [];

    for (const [key, value] of this.store.entries()) {
      if (key.startsWith(prefix)) {
        matches.push(value as T);
      }
    }

    return matches;
  }

  /**
   * Repository read required by the current domain/application ports.
   * The browser storage shape mirrors the SQLite placeholder to keep replacement simple.
   */
  public async getProgress(): Promise<UserProgress> {
    const snapshot = await this.get<StoredProgressSnapshot>(this.progressKey);

    if (!snapshot) {
      return UserProgress.create();
    }

    const completedNodeIds = snapshot.completedNodeIds.map((nodeId) => NodeId.create(nodeId));
    const eventLog = snapshot.events.map((event) => this.rehydrateEvent(event));

    return UserProgress.create(completedNodeIds, eventLog);
  }

  /**
   * Repository write required by the current domain/application ports.
   * A real IndexedDB adapter would normalize this across stores and upgrade steps.
   */
  public async saveProgress(progress: UserProgress): Promise<void> {
    const snapshot: StoredProgressSnapshot = {
      completedNodeIds: progress.completedNodeIds.map((nodeId) => nodeId.toString()),
      events: progress.eventLog.map((event, index) => ({
        id: `${event.type}:${event.timestamp.toNumber()}:${index}`,
        type: event.type,
        payload: event.payload,
        timestamp: event.timestamp.toNumber(),
      })),
    };

    await this.set(this.progressKey, snapshot);
  }

  private rehydrateEvent(event: StoredProgressEvent): ProgressEvent {
    const timestamp = Timestamp.create(event.timestamp);

    switch (event.type) {
      case "NODE_COMPLETED":
        return ProgressEvent.nodeCompleted(NodeId.create(String(event.payload.nodeId)), timestamp);
      case "SKILL_UNLOCKED":
        return ProgressEvent.skillUnlocked(SkillId.create(String(event.payload.skillId)), timestamp);
    }

    throw new Error(`Unsupported progress event type: ${String(event.type)}`);
  }
}
