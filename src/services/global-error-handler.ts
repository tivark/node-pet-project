import { Response, Request, NextFunction } from "express";

const errorHandler = async (func: Function) =>
  async (req: Request, res: Response, next?: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      const { message, status } = error;
      res.status(status).json({ message });
    }
  }

  module.exports = errorHandler;