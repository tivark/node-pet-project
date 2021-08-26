import { Response, Request, NextFunction } from "express";
import { ApiErrors } from "../errors/api-errors";

export const errorHandler = (handler: any) =>
  async (req: Request, res: Response, next: NextFunction, ...args) => {
    try {
      await handler(req, res, next, ...args);
    } catch (error) {
      next(error);
    }
  }

export const errorHandlerMiddleware = (error: ApiErrors | Error, req: Request, res: Response) => {
  if (error instanceof ApiErrors) {
    res.status(error.status).json({ message: error.message })
  } else {
    res.status(500).json({ message: "Server error"})
  }
}
