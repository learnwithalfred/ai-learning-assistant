export class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(message = "Invalid input") {
    super(message);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ExternalServiceError extends Error {
  constructor(message = "ExternalServiceError") {
    super(message);
    this.name = "ExternalServiceError";
  }
}

export class InternalServiceError extends Error {
  constructor(message = "InternalServiceError") {
    super(message);
    this.name = "InternalServiceError";
  }
}
