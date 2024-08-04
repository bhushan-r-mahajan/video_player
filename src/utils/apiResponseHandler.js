class ApiResponseHandler {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.success = true;
    this.data = data;
    this.message = message;
  }
}

export default ApiResponseHandler;
