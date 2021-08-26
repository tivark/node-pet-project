import jwt from "jsonwebtoken";
import { ApiErrors } from "../errors/api-errors";

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if (!token) {
      next(ApiErrors.unauthorizedUser());
    }

    req.user = jwt.verify(token, process.env.SECRET);
    next();
}
















