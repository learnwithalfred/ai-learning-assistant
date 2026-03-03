import { AppError } from "@/server/errors";

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid input") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = "ExternalServiceError") {
    (super(message), 502);
  }
}

export class InternalServiceError extends AppError {
  constructor(message = "InternalServiceError") {
    super(message, 500);
  }
}
