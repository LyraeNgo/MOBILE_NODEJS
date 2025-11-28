// routes/tags_routes.js
import express from "express";
import {
  getAllTags,
  getTagByIdController,
  createTagController,
  updateTagController,
  deleteTagController,
} from "../Controllers/tag_controller.js";

const router = express.Router();

router.get("/", getAllTags);
router.get("/:tagId", getTagByIdController);
router.post("/", createTagController);
router.put("/:tagId", updateTagController);
router.delete("/:tagId", deleteTagController);

export default router;
