// controllers/auth_controller.js
import AuthService from "../Services/auth_service.js";

export const registerController = async (req, res) => {
  try {
    const data = await AuthService.register(req.body);
    res.status(201).json({
      success: true,
      message: "Registration successful",
      data,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const data = await AuthService.login(req.body);
    res.status(200).json({ success: true, message: "Login successful", data });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "login failed:" + err.message });
  }
};

