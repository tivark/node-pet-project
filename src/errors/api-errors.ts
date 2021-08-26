export class ApiErrors extends Error {

  public readonly status: number;

  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }

  static notFound() {
    return new ApiErrors(
      404,
      "Resource not found"
    );
  }

  static invalidCredential() {
    return new ApiErrors(
      400,
      "Username or password incorrect"
    );
  }

  static permissionRequired(){
    return new ApiErrors(
      403,
      "User don't have permission for this operation"
    );
  }

  static unauthorizedUser(){
    return new ApiErrors(
      401,
      "Authorization required"
    )
  }
}
