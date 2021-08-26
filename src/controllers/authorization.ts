import { Request, Response } from "express";
import { validationResult } from "express-validator";
import AuthorizationService from "../services/autorization-service";
import { ApiErrors } from "../errors/api-errors";

export class Authorization {

  async registration(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error("registration error");
    }

    const registrationResult = await AuthorizationService.registration(req.body);

    return res.status(200).json(registrationResult);
  }

  async login(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw ApiErrors.invalidCredential();
    }

    const { username, password } = req.body;
    const loginResult = await AuthorizationService.login(username, password);

    res.status(200).json(loginResult);
  };

  async users(req: Request, res: Response) {
    const userList = await AuthorizationService.users();
    res.status(200).json(userList);
  };
}
