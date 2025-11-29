import express from "express";
import VoucherController from "../Controllers/voucher_controller.js";

const router = express.Router();

router.get("/", VoucherController.getAll);
router.post("/create", VoucherController.create);
router.post("/validate", VoucherController.validate);
router.post("/claim/:userId", VoucherController.claimVoucher);
router.get("/:userId", VoucherController.getVouchersByUserIdController);
export default router;
