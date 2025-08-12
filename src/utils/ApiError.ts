class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture the stack trace, excluding the constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
