// services/auth_service.js
import jwt from "jsonwebtoken";
import UsersRepository from "../Repositories/user_repository.js";
import bcrypt from "bcryptjs";
import jwtConfig from "../../config/jwt.js";

export default class AuthService {
  /** -------------------- REGISTER -------------------- */
  static async register({ fullname, email, password, role }) {
    // check email existed
    const existingUser = await UsersRepository.findByEmail(email);
    if (existingUser) throw new Error("Email already exists");

    // create new user
    const newUser = await UsersRepository.create({
      fullname,
      email,
      password,
      role: role || "user",
    });

    // create tokens after registration
    const accessToken = jwt.sign(
      { userId: newUser.userId, role: newUser.role },
      jwtConfig.accessSecret,
      { expiresIn: jwtConfig.accessExpire }
    );

    const refreshToken = jwt.sign(
      { userId: newUser.userId },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpire }
    );

    return {
      accessToken,
      refreshToken,
      user: {
        userId: newUser.userId,
        fullname: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  /** -------------------- LOGIN -------------------- */
  static async login({ email, password }) {
    const user = await UsersRepository.findByEmail(email);
    console.log("🚀 ~ AuthService ~ login ~ user:", user);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("Invalid credentials");
    console.log("im here");

    const accessToken = jwt.sign(
      { userId: user.userId, role: user.role },
      jwtConfig.accessSecret,
      { expiresIn: jwtConfig.accessExpire }
    );

    const refreshToken = jwt.sign(
      { userId: user.userId },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpire }
    );

    return {
      accessToken,
      refreshToken,
      user: {
        userId: user.userId,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    };
  }

  /** Verify Access Token */
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, jwtConfig.accessSecret);
    } catch {
      return null;
    }
  }
}
