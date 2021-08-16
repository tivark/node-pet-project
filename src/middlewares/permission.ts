import jwt from "jsonwebtoken";
import { RoleType } from "../models/user";

export const permissionMiddleware = (roles: RoleType[]) =>
  (req, res, next) => {
    if(req.method === "OPTIONS"){
      next();
    }

    try{
      const { authorization } = req.headers;
      const token = authorization && authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json('Пользователь не авторизован');
      }

      const user = jwt.verify(token, process.env.SECRET);
      if(roles.indexOf(user.role) < 0){
        return res.status(403).json({message: "У пользователя недостаточно прав"});
      }

      req.user = user;
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({message: "У пользователя недостаточно прав"});
    }
  }