class ApiErrorHandler extends Error {
  constructor(
    statusCode,
    message = "Something went wrong.",
    errors = [],
    stack = ""
  ) {
    super();
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.message = message;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiErrorHandler;
