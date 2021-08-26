import { Router } from "express";
import { check } from "express-validator";
import { Authorization } from "../controllers/authorization";
import { errorHandler } from "../services/global-error-handler";

export const router = Router();
const auth = new Authorization();

router.post(
  "/registration",
  [
    check("username", "Има пользователя не должно быть пустым").notEmpty(),
    check("password", "Пароль должен быть длиннее 3 символов").isLength({ min: 3 })
  ],
  errorHandler(auth.registration)
);

router.post(
  "/login",
  errorHandler(auth.login)
);

router.post(
  "/logout"
);

router.get(
  "/refresh"
);

router.get(
  "/users",
  errorHandler(auth.users)
);
