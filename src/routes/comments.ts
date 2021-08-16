import { Router } from "express";
import { Comments } from "../controllers/comment";
const errorHandler = require("../services/global-error-handler");


export const router = Router();
const comments = new Comments();

router.get("/", comments.getMany);
router.get("/item/:id", errorHandler(comments.getOne));

router.post("/", comments.create);

router.put("/:id", comments.update);

router.delete("/:id", comments.delete);