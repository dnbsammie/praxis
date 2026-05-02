/**
 * This file exists to keep environment detection in one place.
 * The runtime package is the only layer allowed to care about platform differences such as Tauri.
 * Replace these checks if the host integration changes without touching runtime factories or UI code.
 */
type TauriGlobal = typeof globalThis & {
  readonly window?: {
    readonly __TAURI__?: unknown;
  };
  readonly __TAURI__?: unknown;
};

export function isTauri(): boolean {
  const runtimeGlobal = globalThis as TauriGlobal;
  return typeof runtimeGlobal.window?.__TAURI__ !== "undefined"
    || typeof runtimeGlobal.__TAURI__ !== "undefined";
}

export function isBrowser(): boolean {
  return typeof window !== "undefined" && !isTauri();
}
