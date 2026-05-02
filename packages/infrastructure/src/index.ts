/**
 * Public entry point for the infrastructure package.
 * This file exists to expose concrete adapters without leaking internal folder structure.
 * Callers depend on these exports while the underlying implementations remain replaceable.
 */
export { SQLiteAdapter } from "./storage/sqlite/sqlite.adapter";
export { IndexedDbAdapter } from "./storage/indexeddb/indexeddb.adapter";
export { HttpSyncTransport } from "./sync/http/http.transport";
export { FileSyncTransport } from "./sync/local/file.transport";
export { invoke } from "./tauri/bridge";
export { Logger } from "./logging/logger";
export { generateHash } from "./security/integrity";
