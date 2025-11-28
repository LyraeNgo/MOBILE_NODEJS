import {
  getAllMedia,
  getMediaById,
  getMediaByEventId,
  createMedia,
  updateMedia,
  deleteMedia,
} from "../Services/media_service.js";

// ===== GET ALL MEDIA =====
export const getAllMediaController = async (req, res) => {
  try {
    const media = await getAllMedia();
    res.status(200).json({
      success: true,
      message: "Media retrieved successfully",
      data: media,
    });
  } catch (err) {
    console.error("Error in getAllMediaController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== GET MEDIA BY ID =====
export const getMediaByIdController = async (req, res) => {
  const { mediaId } = req.params;

  try {
    const media = await getMediaById(mediaId);
    if (!media)
      return res.status(404).json({
        success: false,
        message: "Media not found",
        data: null,
      });

    res.status(200).json({
      success: true,
      message: "Media retrieved successfully",
      data: media,
    });
  } catch (err) {
    console.error("Error in getMediaByIdController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== GET MEDIA BY EVENT ID =====
export const getMediaByEventController = async (req, res) => {
  const { eventId } = req.params;

  try {
    const media = await getMediaByEventId(eventId);
    res.status(200).json({
      success: true,
      message: `${media.length} media file(s) found for event`,
      data: media,
    });
  } catch (err) {
    console.error("Error in getMediaByEventController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== CREATE MEDIA =====
export const createMediaController = async (req, res) => {
  try {
    const media = await createMedia(req.body);
    res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      data: media,
    });
  } catch (err) {
    console.error("Error in createMediaController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== UPDATE MEDIA =====
export const updateMediaController = async (req, res) => {
  const { mediaId, filePath, type } = req.body;

  if (!mediaId)
    return res.status(400).json({
      success: false,
      message: "mediaId is required",
      data: null,
    });

  try {
    const updated = await updateMedia(mediaId, { filePath, type });

    if (!updated)
      return res.status(404).json({
        success: false,
        message: "Media not found",
        data: null,
      });

    res.status(200).json({
      success: true,
      message: "Media updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error in updateMediaController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== DELETE MEDIA =====
export const deleteMediaController = async (req, res) => {
  const { mediaId } = req.body;

  if (!mediaId)
    return res.status(400).json({
      success: false,
      message: "mediaId is required",
      data: null,
    });

  try {
    const removed = await deleteMedia(mediaId);

    if (!removed)
      return res.status(404).json({
        success: false,
        message: "Media not found",
        data: null,
      });

    res.status(200).json({
      success: true,
      message: "Media deleted successfully",
      data: removed,
    });
  } catch (err) {
    console.error("Error in deleteMediaController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};
