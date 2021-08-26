import { Router } from "express";
import { Articles } from "../controllers/articles";
import { authMiddleware } from "../middlewares/authorization";
import { permissionMiddleware } from "../middlewares/permission";
import {errorHandler} from "../services/global-error-handler";

export const router = Router();
const articles = new Articles();

router.get(
  "/",
  errorHandler(articles.getActive)
);

router.get(
  "/active",
  [authMiddleware, permissionMiddleware(["ADMIN"])],
  errorHandler(articles.getInactive)
);

router.get(
  "/inactive",
  [authMiddleware, permissionMiddleware(["ADMIN"])],
  errorHandler(articles.getInactive)
);

router.get(
  "/:id",
  errorHandler(articles.getOne)
);

router.post(
  "/",
  errorHandler(articles.create)
);

router.delete(
  "/:id",
  permissionMiddleware(["ADMIN", "MODERATOR"]),
  errorHandler(articles.delete)
);
