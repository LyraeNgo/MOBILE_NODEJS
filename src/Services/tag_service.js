// services/tags_service.js
import TagsRepository from "../Repositories/tag_repository.js";

// ===== GET ALL TAGS =====
export const getTags = async () => {
  return await TagsRepository.findAll();
};

// ===== GET TAG BY ID =====
export const getTagById = async (tagId) => {
  return await TagsRepository.findById(tagId);
};

// ===== CREATE TAG =====
export const createTag = async (tagData) => {
  const { name } = tagData;
  if (await TagsRepository.findByName(name)) return null;
  return await TagsRepository.create(tagData);
};

// ===== UPDATE TAG =====
export const updateTag = async (tagId, data) => {
  return await TagsRepository.update(tagId, data);
};

// ===== DELETE TAG =====
export const deleteTag = async (tagId) => {
  return await TagsRepository.delete(tagId);
};
