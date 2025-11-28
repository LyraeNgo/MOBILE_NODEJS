import MediaRepository from "../Repositories/media_repository.js";

// ===== GET ALL MEDIA =====
export const getAllMedia = async () => {
  try {
    const media = await MediaRepository.findAll();
    return media;
  } catch (err) {
    console.error("Error in getAllMedia:", err.message);
    throw err;
  }
};

// ===== GET MEDIA BY ID =====
export const getMediaById = async (mediaId) => {
  try {
    return await MediaRepository.findById(mediaId);
  } catch (err) {
    throw err;
  }
};

// ===== GET MEDIA BY EVENT ID =====
export const getMediaByEventId = async (eventId) => {
  try {
    return await MediaRepository.findByEventId(eventId);
  } catch (err) {
    throw err;
  }
};

// ===== CREATE MEDIA =====
export const createMedia = async (data) => {
  try {
    const media = await MediaRepository.create(data);
    return media;
  } catch (err) {
    throw err;
  }
};

// ===== UPDATE MEDIA =====
export const updateMedia = async (mediaId, data) => {
  try {
    return await MediaRepository.update(mediaId, data);
  } catch (err) {
    throw err;
  }
};

// ===== DELETE MEDIA =====
export const deleteMedia = async (mediaId) => {
  try {
    return await MediaRepository.delete(mediaId);
  } catch (err) {
    throw err;
  }
};
