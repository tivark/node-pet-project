import { Router } from "express";
import { Articles } from "../controllers/articles";
import { authMiddleware } from "../middlewares/authorization";
import { permissionMiddleware } from "../middlewares/permission";

export const router = Router();
const articles = new Articles();

router.get("/", articles.getAll);
// router.get("/", articles.getActive);
router.get("/inactive", [authMiddleware, permissionMiddleware(["ADMIN"])], articles.getInactive);

router.get("/:id", articles.getOne);

router.post("/", articles.create);

router.delete("/:id", permissionMiddleware(["ADMIN", "MODERATOR"]), articles.delete);
