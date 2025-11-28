import express from "express";
import {
  createOrderController,
  getOrderByIdController,
  payOrderController,
} from "../Controllers/order_controller.js";

const router = express.Router();

// Tạo order
router.post("/", createOrderController);

// Lấy order theo ID
router.get("/:orderId", getOrderByIdController);

// Thanh toán order
router.post("/pay", payOrderController);

export default router;
