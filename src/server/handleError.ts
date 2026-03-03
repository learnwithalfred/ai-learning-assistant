import { AppError } from "./errors";
import { logger } from "./logger";

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    logger.warn("Operational error occurred", {
      message: error.message,
      statusCode: error.statusCode,
    });

    return {
      statusCode: error.statusCode,
      body: { message: error.message },
    };
  }

  // Programmer error
  logger.error("Unexpected system error", { error });

  return {
    statusCode: 500,
    body: { message: "Something went wrong" },
  };
}
