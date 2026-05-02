/**
 * This adapter exists to provide a replaceable SQLite-backed repository boundary for the domain.
 * It currently implements the ProgressRepository interface from @praxis/domain and exposes
 * generic get/set/query methods shaped for a future dedicated storage adapter port.
 * Real SQL execution is intentionally mocked with an in-memory Map until a SQLite driver is added.
 * The target relational shape is documented in ./schema.sql.
 */
import { ProgressMapper, type UserProgressDTO } from "@praxis/application";
import { UserProgress, type ProgressRepository } from "@praxis/domain";

type SQLiteAdapterOptions = {
  readonly seed?: ReadonlyMap<string, unknown> | ReadonlyArray<readonly [string, unknown]>;
  readonly progressKey?: string;
};

export class SQLiteAdapter implements ProgressRepository {
  private readonly store: Map<string, unknown>;
  private readonly progressKey: string;

  constructor(options: SQLiteAdapterOptions = {}) {
    this.store = new Map(options.seed ?? []);
    this.progressKey = options.progressKey ?? "progress:current";
  }

  /**
   * Placeholder key-value read operation.
   * A real implementation would translate this into a SELECT statement against SQLite.
   */
  public async get<T>(key: string): Promise<T | null> {
    return (this.store.get(key) as T | undefined) ?? null;
  }

  /**
   * Placeholder key-value write operation.
   * A real implementation would wrap INSERT/UPDATE logic and transaction handling here.
   */
  public async set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  /**
   * Placeholder query operation.
   * A real implementation would execute SQL against the schema in schema.sql.
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
   * The persisted representation is intentionally simple so the adapter can be replaced later.
   */
  public async getProgress(): Promise<UserProgress> {
    const snapshot = await this.get<UserProgressDTO>(this.progressKey);

    if (!snapshot) {
      return UserProgress.create();
    }

    return ProgressMapper.fromDTO(snapshot);
  }

  /**
   * Repository write required by the current domain/application ports.
   * A real SQLite adapter would persist these records into normalized tables and migrations.
   */
  public async saveProgress(progress: UserProgress): Promise<void> {
    const snapshot = ProgressMapper.toDTO(progress);

    await this.set(this.progressKey, snapshot);
  }
}
