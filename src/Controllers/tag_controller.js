// controllers/tags_controller.js
import {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../Services/tag_service.js";

// ===== GET ALL TAGS =====
export const getAllTags = async (req, res) => {
  try {
    const tags = await getTags();
    res.status(200).json({
      success: true,
      message: "Tags retrieved successfully",
      data: tags,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// ===== GET TAG BY ID =====
export const getTagByIdController = async (req, res) => {
  const { tagId } = req.params;
  try {
    const tag = await getTagById(tagId);
    if (!tag)
      return res
        .status(404)
        .json({ success: false, message: "Tag not found", data: null });
    res.status(200).json({
      success: true,
      message: "Tag retrieved successfully",
      data: tag,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// ===== CREATE TAG =====
export const createTagController = async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Name is required", data: null });

  try {
    const tag = await createTag({ name });
    if (!tag)
      return res.status(400).json({
        success: false,
        message: "Tag name already exists",
        data: null,
      });
    res
      .status(201)
      .json({ success: true, message: "Tag created successfully", data: tag });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// ===== UPDATE TAG =====
export const updateTagController = async (req, res) => {
  const { tagId } = req.params;
  const { name } = req.body;
  if (!tagId)
    return res
      .status(400)
      .json({ success: false, message: "tagId is required", data: null });

  try {
    const updatedTag = await updateTag(tagId, { name });
    if (!updatedTag)
      return res
        .status(404)
        .json({ success: false, message: "Tag not found", data: null });
    res.status(200).json({
      success: true,
      message: "Tag updated successfully",
      data: updatedTag,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// ===== DELETE TAG =====
export const deleteTagController = async (req, res) => {
  const { tagId } = req.params;
  if (!tagId)
    return res
      .status(400)
      .json({ success: false, message: "tagId is required", data: null });

  try {
    const deleted = await deleteTag(tagId);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Tag not found", data: null });
    res.status(200).json({
      success: true,
      message: "Tag deleted successfully",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, data: null });
  }
};
