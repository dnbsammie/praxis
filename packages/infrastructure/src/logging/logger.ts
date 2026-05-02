/**
 * This logger exists to keep logging behind a tiny replaceable abstraction.
 * It does not encode domain meaning; it only emits structured records through console-like sinks.
 * A future implementation can swap console output for a remote collector without changing callers.
 */
type ConsoleSink = Pick<Console, "info" | "warn" | "error">;
type LogContext = Readonly<Record<string, unknown>>;

type LoggerOptions = {
  readonly sink?: ConsoleSink;
};

export class Logger {
  private readonly sink: ConsoleSink;

  constructor(options: LoggerOptions = {}) {
    this.sink = options.sink ?? console;
  }

  public info(message: string, context: LogContext = {}): void {
    this.sink.info(this.createRecord("info", message, context));
  }

  public warn(message: string, context: LogContext = {}): void {
    this.sink.warn(this.createRecord("warn", message, context));
  }

  public error(message: string, context: LogContext = {}): void {
    this.sink.error(this.createRecord("error", message, context));
  }

  private createRecord(level: "info" | "warn" | "error", message: string, context: LogContext) {
    return {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };
  }
}
