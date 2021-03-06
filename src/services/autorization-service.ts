import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { TokenService } from "./jwt-service";
import { ApiErrors } from "../errors/api-errors";
import { UserDataType } from "src/types/user-data";

class AuthorizationService {
  async registration(userData: UserDataType) {
    const { username, password, role } = userData;

    const usernameRegexp = new RegExp(username, 'i');
    const existUser = await User.findOne({ username: usernameRegexp });
    if (existUser) {
      throw ApiErrors.userExist();
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({ username, password: hashPassword, role });

    const saveResult = await user.save();

    return saveResult;
  }

  async login(username: string, password: string) {

    const usernameRegexp = new RegExp(username, 'i');
    const user = await User.findOne({ username: usernameRegexp });

    if (!user) {
      throw ApiErrors.notFound();
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw ApiErrors.invalidCredential();
    }

    const { _id: id, role } = user;

    const tokenService = new TokenService();
    const jwtToken = tokenService.generateToken({ id, role });
    const tokenObject = { 'jwt': jwtToken.token };

    return tokenObject;
  };

  async users() {
    const userList = await User.find();
    return userList;
  };
}

export default new AuthorizationService();
