import express from "express";
import {
  createReviewController,
  getEventReviewsController,
  updateReviewController,
  deleteReviewController,
} from "../Controllers/review_controller.js";

// import auth from "../../Middleware/auth.js";

const router = express.Router();

router.post("/:eventId", createReviewController);
router.get("/:eventId", getEventReviewsController);
router.put("/:reviewId", updateReviewController);
router.delete("/:reviewId", deleteReviewController);

export default router;
