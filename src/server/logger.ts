type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString();

  const base = `[${level}] ${timestamp} - ${message}`;

  if (meta) {
    console.log(base, JSON.stringify(meta));
  } else {
    console.log(base);
  }
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) =>
    log("INFO", message, meta),

  warn: (message: string, meta?: Record<string, unknown>) =>
    log("WARN", message, meta),

  error: (message: string, meta?: Record<string, unknown>) =>
    log("ERROR", message, meta),

  debug: (message: string, meta?: Record<string, unknown>) =>
    log("DEBUG", message, meta),
};
