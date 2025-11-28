import {
  serviceCreateReview,
  serviceGetEventReviews,
  serviceUpdateReview,
  serviceDeleteReview,
} from "../Services/review_service.js";

export const createReviewController = async (req, res) => {
  try {
    const userId = req.user.user_id; // JWT decode
    const { eventId } = req.params;
    const { rating, comment } = req.body;

    const review = await serviceCreateReview(userId, eventId, rating, comment);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEventReviewsController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const reviews = await serviceGetEventReviews(eventId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateReviewController = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await serviceUpdateReview(reviewId, userId, rating, comment);
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteReviewController = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { reviewId } = req.params;

    const deleted = await serviceDeleteReview(reviewId, userId);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
