import express from "express";
import VoucherController from "../Controllers/voucher_controller.js";

const router = express.Router();

router.get("/", VoucherController.getAll);
router.post("/create", VoucherController.create);
router.post("/validate", VoucherController.validate);

export default router;
