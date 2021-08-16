import jwt from "jsonwebtoken";

export class TokenService {

  generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    return {
      token,
      refreshToken
    }
  }

}