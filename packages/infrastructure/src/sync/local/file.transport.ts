/**
 * This transport exists to model local synchronization for desktop runtimes such as Tauri.
 * The current codebase does not yet expose a shared SyncTransport port, so this class stays
 * intentionally small and avoids any direct filesystem dependency.
 * Real file access can be added later through injected runtime APIs without changing callers.
 */
import { type ProgressEvent, type Timestamp } from "@praxis/domain";

type FileSyncTransportOptions = {
  readonly channelName?: string;
};

export class FileSyncTransport {
  private readonly channelName: string;

  constructor(options: FileSyncTransportOptions = {}) {
    this.channelName = options.channelName ?? "local-sync";
  }

  /**
   * Simulates persisting outbound events to a local channel.
   * A future Tauri implementation can translate this into plugin or command-based file access.
   */
  public async push(events: readonly ProgressEvent[]): Promise<readonly ProgressEvent[]> {
    void events;
    void this.channelName;
    return [];
  }

  /**
   * Simulates reading locally stored events after a timestamp marker.
   * A future implementation can source data from the filesystem without changing this surface.
   */
  public async pull(since: Timestamp): Promise<readonly ProgressEvent[]> {
    void since;
    void this.channelName;
    return [];
  }
}
