import {
  serviceCreateOrder,
  serviceGetOrderById,
  servicePayOrder,
} from "../Services/order_service.js";

export const createOrderController = async (req, res) => {
  try {
    const { userId, eventId, items } = req.body;

    if (!userId || !eventId || !Array.isArray(items) || !items.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request body" });
    }

    const result = await serviceCreateOrder(userId, eventId, items);
    return res
      .status(201)
      .json({ success: true, message: "Order created", data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrderByIdController = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId)
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId" });

    const order = await serviceGetOrderById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    return res.json({ success: true, message: "Order retrieved", data: order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const payOrderController = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId)
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId" });

    const result = await servicePayOrder(orderId);

    if (!result.success) return res.status(400).json(result);

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
