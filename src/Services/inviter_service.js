import InvitersRepository from "../Repositories/inviter_repository.js";

export const getAllInviters = async () => {
  return await InvitersRepository.findAll();
};

export const getInviterById = async (id) => {
  return await InvitersRepository.findById(id);
};

export const createInviter = async (data) => {
  return await InvitersRepository.create(data);
};

export const updateInviter = async (id, data) => {
  return await InvitersRepository.update(id, data);
};

export const deleteInviter = async (id) => {
  return await InvitersRepository.delete(id);
};
