// middlewares/auth_middleware.js
import jwt from "jsonwebtoken";
import jwtConfig from "../../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ success: false, message: "Unauthorized" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.accessSecret);
    req.user = decoded; // push vào request để controller dùng
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
