/**
 * This bridge exists to isolate Tauri command invocation from the rest of the infrastructure layer.
 * It wraps the runtime-specific global API and provides a single async function for command dispatch.
 * Outside Tauri it fails fast so web and test environments do not silently depend on desktop behavior.
 */
type TauriInvoke = <T>(command: string, payload?: unknown) => Promise<T>;

type TauriGlobal = typeof globalThis & {
  readonly __TAURI__?: {
    readonly invoke?: TauriInvoke;
  };
};

export async function invoke<T>(command: string, payload?: unknown): Promise<T> {
  const tauriGlobal = globalThis as TauriGlobal;
  const tauriInvoke = tauriGlobal.__TAURI__?.invoke;

  if (!tauriInvoke) {
    throw new Error("Tauri bridge is not available in this runtime.");
  }

  return tauriInvoke<T>(command, payload);
}
