class NotFoundError extends Error {
  public status: number;

  constructor(message?: string) {
    super();
    this.message = message || "Resource not found";
    this.status = 404;
  }
}

module.exports = NotFoundError;