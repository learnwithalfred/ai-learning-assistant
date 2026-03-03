import { logger } from "./logger";

export async function withRequestLogging<T>(
  request: Request,
  handler: () => Promise<Response>,
): Promise<Response> {
  const start = Date.now();

  try {
    const response = await handler();
    const duration = Date.now() - start;

    logger.info("Request handled", {
      method: request.method,
      url: request.url,
      status: response.status,
      durationMs: duration,
    });

    return response;
  } catch (error) {
    const duration = Date.now() - start;

    logger.error("Request failed", {
      method: request.method,
      url: request.url,
      durationMs: duration,
      error,
    });

    throw error;
  }
}
