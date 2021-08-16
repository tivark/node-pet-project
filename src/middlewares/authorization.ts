import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json('Пользователь не авторизован');
    }

    req.user = jwt.verify(token, process.env.SECRET);
    next();

  } catch (e) {
    console.log(e)
    return res.status(401).json('Пользователь не авторизован');
  }
}
















