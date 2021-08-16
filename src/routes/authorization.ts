import { Router } from "express";
import { check } from "express-validator";
import { Authorization } from "../controllers/authorization";

export const router = Router();

const auth = new Authorization();

router.post("/registration",
  [
    check("username", "Има пользователя не должно быть пустым").notEmpty(),
    check("password","Парольдолжен быть длиннее 3 символов").isLength({min: 3})
  ],
  auth.registration);
router.post("/login", auth.login);
router.post("/logout");

router.get("/refresh");
router.get("/users", auth.users);
