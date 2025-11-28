import {
  getAllInviters,
  getInviterById,
  createInviter,
  updateInviter,
  deleteInviter,
} from "../Services/inviter_service.js";

export const getInvitersController = async (req, res) => {
  const inviters = await getAllInviters();
  res.json({ success: true, message: "successfully", data: inviters });
};

export const getInviterByIdController = async (req, res) => {
  const inviter = await getInviterById(req.params.id);
  if (!inviter)
    return res
      .status(404)
      .json({ success: false, message: "Inviter not found", data: null });
  res.json({ success: true, message: "successfully", data: inviter });
};

export const createInviterController = async (req, res) => {
  const inviter = await createInviter(req.body);
  res.json({ success: true, message: "successfully", data: inviter });
};

export const updateInviterController = async (req, res) => {
  const inviter = await updateInviter(req.params.id, req.body);
  if (!inviter)
    return res
      .status(404)
      .json({ success: false, message: "Inviter not found", data: null });
  res.json({ success: true, message: "successfully", data: inviter });
};

export const deleteInviterController = async (req, res) => {
  const inviter = await deleteInviter(req.params.id);
  if (!inviter)
    return res
      .status(404)
      .json({ success: false, message: "Inviter not found", data: null });
  res.json({ success: true, message: "successfully", data: inviter });
};
