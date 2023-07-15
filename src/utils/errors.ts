export class ApiError extends Error {
  status;
  error;

  constructor(status: number, message: string, error: any = {}) {
    super(message);

    this.status = status;
    this.error = error;
  }

  static BadRequest(message: string, error?: any) {
    return new ApiError(400, message, error);
  }
}
