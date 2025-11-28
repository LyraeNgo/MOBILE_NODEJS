import express from "express";
import {
  getAllMediaController,
  getMediaByIdController,
  getMediaByEventController,
  createMediaController,
  updateMediaController,
  deleteMediaController,
} from "../Controllers/media_controller.js";

const router = express.Router();

// ===== GET ALL MEDIA =====
router.get("/", getAllMediaController);

// ===== GET MEDIA BY ID =====
router.get("/:mediaId", getMediaByIdController);

// ===== GET MEDIA BY EVENT ID =====
router.get("/event/:eventId", getMediaByEventController);


// ===== CREATE MEDIA =====
router.post("/", createMediaController);

// ===== UPDATE MEDIA =====
router.put("/", updateMediaController);

// ===== DELETE MEDIA =====
router.delete("/", deleteMediaController);

export default router;
