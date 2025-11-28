// services/users_service.js
import UsersRepository from "../Repositories/user_repository.js";
import bcrypt from "bcrypt";

// ===== GET ALL USERS =====
export const getUsers = async () => {
  try {
    const users = await UsersRepository.findAll();
    return users;
  } catch (err) {
    console.error("Error in getUsers:", err.message);
    throw err;
  }
};

// ===== GET USER BY ID =====
export const getUsersById = async (userId) => {
  try {
    const user = await UsersRepository.findById(userId);
    return user;
  } catch (err) {
    throw err;
  }
};

// ===== GET USER BY EMAIL =====
export const getUserByEmail = async (email) => {
  try {
    return await UsersRepository.findByEmail(email);
  } catch (err) {
    throw err;
  }
};

// ===== CREATE USER =====
export const createUser = async (userData) => {
  const { email } = userData;
  if (await getUserByEmail(email)) return null;

  try {
    const user = await UsersRepository.create(userData);
    return user;
  } catch (err) {
    throw err;
  }
};

// ===== SEARCH USERS =====
export const searchUsers = async (query) => {
  try {
    return await UsersRepository.search(query);
  } catch (err) {
    throw err;
  }
};

// ===== UPDATE USER =====
export const updateUser = async (userId, data) => {
  try {
    return await UsersRepository.update(userId, data);
  } catch (err) {
    throw err;
  }
};

// ===== CHANGE PASSWORD =====
export const changePassword = async (email, currentPassword, newPassword) => {
  const user = await UsersRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!match) throw new Error("Current password is incorrect");

  await UsersRepository.updatePassword(user.userId, newPassword);
  return true;
};

// ===== CHANGE USER STATUS =====
export const changeUserStatus = async (userId, status) => {
  const validStatus = ["active", "inactive"];
  if (!validStatus.includes(status)) {
    throw new Error(`Invalid status. Allowed: ${validStatus.join(", ")}`);
  }

  return await UsersRepository.updateStatus(userId, status);
};
