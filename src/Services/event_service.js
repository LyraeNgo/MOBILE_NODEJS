// services/events_service.js
import EventRepository from "../Repositories/event_repository.js";

export const getAllEvents = async () => {
  try {
    const data = await EventRepository.findAll();
    console.log("🚀 ~ getAllEvents ~ data:", data);

    return data;
  } catch (err) {
    console.error("Error in getAllEvents:", err.message);
    throw err;
  }
};

export const getEventById = async (eventId) => {
  try {
    return await EventRepository.findById(eventId);
  } catch (err) {
    throw err;
  }
};

export const createEvent = async (eventData) => {
  try {
    return await EventRepository.create(eventData);
  } catch (err) {
    throw err;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    return await EventRepository.update(eventId, eventData);
  } catch (err) {
    throw err;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    return await EventRepository.delete(eventId);
  } catch (err) {
    throw err;
  }
};

export const serviceFindByDate = async (date) => {
  try {
    return EventRepository.findByDate(date);
  } catch (err) {
    throw err;
  }
};
