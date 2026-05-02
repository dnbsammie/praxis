/**
 * This transport exists to isolate remote synchronization behind a replaceable HTTP boundary.
 * The current codebase does not yet expose a shared SyncTransport port, so this class keeps the
 * expected push/pull surface minimal while remaining free of business rules.
 * Network behavior is mocked and returns empty results until a real API contract is introduced.
 */
import { type ProgressEvent, type Timestamp } from "@praxis/domain";

type FetchLike = (input: string, init?: { readonly method?: string; readonly body?: string }) => Promise<unknown>;

type HttpSyncTransportOptions = {
  readonly endpoint: string;
  readonly fetcher?: FetchLike;
};

export class HttpSyncTransport {
  private readonly endpoint: string;
  private readonly fetcher: FetchLike;

  constructor(options: HttpSyncTransportOptions) {
    this.endpoint = options.endpoint;
    this.fetcher = options.fetcher ?? defaultFetch;
  }

  /**
   * Pushes serialized events to a remote endpoint.
   * The current implementation only exercises the dependency boundary and returns no acknowledgements.
   */
  public async push(events: readonly ProgressEvent[]): Promise<readonly ProgressEvent[]> {
    await this.fetcher(this.endpoint, {
      method: "POST",
      body: JSON.stringify({
        events: events.map((event) => ({
          type: event.type,
          payload: event.payload,
          timestamp: event.timestamp.toNumber(),
        })),
      }),
    });

    return [];
  }

  /**
   * Pulls remote events newer than the provided timestamp.
   * A real implementation would deserialize an HTTP response into domain event records.
   */
  public async pull(since: Timestamp): Promise<readonly ProgressEvent[]> {
    void since;
    await this.fetcher(this.endpoint, { method: "GET" });
    return [];
  }
}

const defaultFetch: FetchLike = async (input, init) => {
  void input;
  void init;
  return {};
};
