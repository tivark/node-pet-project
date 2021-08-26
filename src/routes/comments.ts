import { Router } from "express";
import { Comments } from "../controllers/comment";
import { errorHandler } from "../services/global-error-handler";
import { authMiddleware } from "../middlewares/authorization";

export const router = Router();
const comments = new Comments();

router.get(
  "/:articleId",
  errorHandler(comments.getCommentsForArticle)
);

router.get(
  "/item/:id",
  errorHandler(comments.getOne)
);

router.post(
  "/",
  errorHandler(comments.create)
);

router.put(
  "/:id",
  errorHandler(comments.update)
);

router.delete(
  "/:id",
  [authMiddleware],
  errorHandler(comments.delete)
);
