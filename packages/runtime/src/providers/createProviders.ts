/**
 * This factory exists to centralize runtime-owned provider construction.
 * Runtime variants call it so web and Tauri use the same application port implementations by default.
 * Replace providers here when the composition root needs different clocks or id strategies.
 */
import { RuntimeIdProvider } from "./id.provider";
import { SystemTimeProvider } from "./time.provider";

type CreateProvidersOptions = {
  readonly idPrefix?: string;
};

export function createProviders(options: CreateProvidersOptions = {}) {
  return {
    timeProvider: new SystemTimeProvider(),
    idGenerator: new RuntimeIdProvider({ prefix: options.idPrefix }),
  };
}
