import {
  serviceGetAllSeatTypes,
  serviceGetSeatTypeById,
  serviceCreateSeatType,
  serviceUpdateSeatType,
  serviceDeleteSeatType,
} from "../Services/seat_service.js";

// ===== GET ALL SEAT TYPES =====
export const getAllSeatTypes = async (req, res) => {
  try {
    const seatTypes = await serviceGetAllSeatTypes();
    res.status(200).json({
      success: true,
      message: "Seat types retrieved successfully",
      data: seatTypes,
    });
  } catch (err) {
    console.error("Error in getAllSeatTypes:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== GET SEAT TYPE BY ID =====
export const getSeatTypeByIdController = async (req, res) => {
  const { seatId } = req.params;
  console.log("🚀 ~ getSeatTypeByIdController ~ seatTypeId:", seatId);

  try {
    const seatType = await serviceGetSeatTypeById(seatId);
    if (!seatType) {
      return res.status(404).json({
        success: false,
        message: "Seat type not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Seat type retrieved successfully",
      data: seatType,
    });
  } catch (err) {
    console.error("Error in getSeatTypeByIdController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== CREATE SEAT TYPE =====
export const createSeatTypeController = async (req, res) => {
  try {
    const { seatName } = req.body;
    if (!seatName) {
      return res.status(400).json({
        success: false,
        message: "does not filled",
        data: null,
      });
    }
    const seatType = await serviceCreateSeatType(seatName);

    if (!seatType) {
      return res.status(400).json({
        success: false,
        message: "Seat type already exists",
        data: null,
      });
    }

    res.status(201).json({
      success: true,
      message: "Seat type created successfully",
      data: seatType,
    });
  } catch (err) {
    console.error("Error in createSeatTypeController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== UPDATE SEAT TYPE =====
export const updateSeatTypeController = async (req, res) => {
  const { seatId } = req.params;
  const { seatName } = req.body;

  if (!seatId || !seatName) {
    return res.status(400).json({
      success: false,
      message: "seatTypeId and seatName are required",
      data: null,
    });
  }

  try {
    const updated = await serviceUpdateSeatType(seatId, { seatName });
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Seat type not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Seat type updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error in updateSeatTypeController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

// ===== DELETE SEAT TYPE =====
export const deleteSeatTypeController = async (req, res) => {
  const { seatId } = req.params;

  if (!seatId) {
    return res.status(400).json({
      success: false,
      message: "seatTypeId is required",
      data: null,
    });
  }

  try {
    const deleted = await serviceDeleteSeatType(seatId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Seat type not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Seat type deleted successfully",
      data: null,
    });
  } catch (err) {
    console.error("Error in deleteSeatTypeController:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};
