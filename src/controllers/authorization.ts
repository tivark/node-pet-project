import bcrypt from "bcryptjs";
import {Request, Response} from "express";
import { User } from "../models/user";
import { TokenService } from "../services/jwt-service";
import { validationResult } from "express-validator";

export class Authorization {

  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors });
      }

      const { username, password, role } = req.body;

      const usernameRegexp = new RegExp(username, 'i');
      const existUser = await User.findOne({ username: usernameRegexp });

      if (existUser) {
        return res.status(400).json({ error: 'user already exist' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, password: hashPassword, role });

      await user.save();
      return res.sendStatus(200);

    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при авторизации", errors });
      }
      console.log(req);
      const { username, password } = req.body;

      const usernameRegexp = new RegExp(username, 'i');
      const user = await User.findOne({ username: usernameRegexp });

      if (!user) {
        return res.status(404).json({ error: 'Пользователь с таким именем не найден' });
      }

      // @ts-ignore
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Введён неверный пароль' });
      }

      // @ts-ignore
      const { _id: id, role } = user;

      const tokenService = new TokenService();
      const jwtToken = tokenService.generateToken({id, role});

      res.status(200).json({ 'jwt': jwtToken.token });

    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "Ошибка при авторизации" })
    }
  };

  async logout(req: Request, res: Response, next) {
    try {

    } catch (e) {

    }
  }

  async users(req: Request, res: Response) {
    try {
      const userList = await User.find();
      res.status(200).json(userList);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка при получении списка пользователей" });
    }
  };
}
