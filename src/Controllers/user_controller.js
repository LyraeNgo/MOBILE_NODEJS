// controllers/users_controller.js
import {
  getUsers,
  getUsersById,
  createUser,
  searchUsers,
  updateUser,
  changePassword,
  changeUserStatus,
} from "../Services/user_service.js";

// ===== GET ALL USERS =====
export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    console.error("Error in getAllUsers:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
};

// ===== GET USER BY ID =====
export const getUserByIdController = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getUsersById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    console.error("Error in getUserByIdController:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
};

// ===== CREATE USER =====
export const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists", data: null });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error("Error in createUserController:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
};

// ===== SEARCH USERS =====
export const searchUsersController = async (req, res) => {
  const { query } = req.body;
  if (!query)
    return res
      .status(400)
      .json({ success: false, message: "Query is required", data: null });

  try {
    const users = await searchUsers(query);
    res.status(200).json({
      success: true,
      message: `${users.length} user(s) found`,
      data: users,
    });
  } catch (err) {
    console.error("Error in searchUsersController:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
};

// ===== UPDATE USER =====
export const updateUserController = async (req, res) => {
  const { userId, fullname, email, role } = req.body;
  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "userId is required", data: null });

  try {
    const updatedUser = await updateUser(userId, { fullname, email, role });
    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error in updateUserController:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", data: null });
  }
};

// ===== CHANGE PASSWORD =====
export const changePasswordController = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  if (!email || !currentPassword || !newPassword)
    return res.status(400).json({
      success: false,
      message: "Email, currentPassword and newPassword are required",
      data: null,
    });

  try {
    await changePassword(email, currentPassword, newPassword);
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: null,
    });
  } catch (err) {
    console.error("Error in changePasswordController:", err.message);
    res.status(400).json({ success: false, message: err.message, data: null });
  }
};

// ===== CHANGE USER STATUS =====
export const changeStatusController = async (req, res) => {
  const { userId, status } = req.body;
  if (!userId || !status)
    return res.status(400).json({
      success: false,
      message: "userId and status are required",
      data: null,
    });

  try {
    const updated = await changeUserStatus(userId, status);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error in changeStatusController:", err.message);
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};
