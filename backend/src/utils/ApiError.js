class ApiError extends Error {
  constructor(statusCoce, message, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCoce;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;